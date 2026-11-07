// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {GothamPool} from "../src/GothamPool.sol";
import {IGothamVerifier} from "../src/interfaces/IGothamVerifier.sol";
import {MockERC20, ReenteringERC20} from "./mocks/MockERC20.sol";

interface Vm {
    function prank(address) external;
    function expectRevert(bytes4) external;
    function getNonce(address) external view returns (uint256);
    function computeCreateAddress(address, uint256) external pure returns (address);
}

contract AcceptVerifier is IGothamVerifier {
    function verify(bytes calldata, bytes32[] calldata inputs) external pure returns (bool) {
        return inputs.length == 7;
    }
}

contract RejectVerifier is IGothamVerifier {
    function verify(bytes calldata, bytes32[] calldata) external pure returns (bool) {
        return false;
    }
}

contract DomainLock is IGothamVerifier {
    bytes32 public immutable expected;

    constructor(bytes32 expected_) {
        expected = expected_;
    }

    function verify(bytes calldata, bytes32[] calldata inputs) external view returns (bool) {
        return inputs.length == 7 && inputs[0] == expected;
    }
}

contract GothamPoolTest {
    Vm internal constant vm = Vm(0x7109709ECfa91a80626fF3989D68f67F5b1DD12D);

    function test_emptyRootMatchesTheFoldedZero() external {
        (GothamPool pool,) = _pool(new RejectVerifier());
        bytes32 expected = pool.zeroAt(19);
        expected = pool.hashPair(expected, expected);
        assertEq(pool.currentRoot(), expected);
        assertTrue(pool.isKnownRoot(pool.currentRoot()));
    }

    function test_firstLeafOpensAgainstZeroSiblings() external {
        (GothamPool pool, MockERC20 token) = _pool(new RejectVerifier());
        bytes32 leaf = keccak256("leaf-one");
        _shield(pool, token, address(this), 100 ether, leaf);

        bytes32 expected = leaf;
        for (uint256 level = 0; level < 20; level++) {
            expected = pool.hashPair(expected, pool.zeroAt(level));
        }
        assertEq(pool.currentRoot(), expected);
        assertEq(pool.liabilities(address(token)), 100 ether);
        assertEq(token.balanceOf(address(pool)), 100 ether);
    }

    function test_shieldRejectsUnsupportedFeeAndDuplicate() external {
        (GothamPool pool, MockERC20 token) = _pool(new RejectVerifier());
        MockERC20 other = new MockERC20();
        other.mint(address(this), 10 ether);
        other.approve(address(pool), 10 ether);

        vm.expectRevert(GothamPool.UnsupportedAsset.selector);
        pool.shield(address(other), 1 ether, keccak256("nope"));

        vm.expectRevert(GothamPool.ZeroAmount.selector);
        pool.shield(address(token), 0, keccak256("zero"));

        bytes32 leaf = keccak256("once");
        _shield(pool, token, address(this), 5 ether, leaf);
        token.approve(address(pool), 5 ether);
        vm.expectRevert(GothamPool.DuplicateCommitment.selector);
        pool.shield(address(token), 5 ether, leaf);

        MockERC20 feeToken = new MockERC20();
        feeToken.setFee(true);
        feeToken.mint(address(this), 10 ether);
        address[] memory tokens = new address[](1);
        tokens[0] = address(feeToken);
        GothamPool feePool = new GothamPool(address(new RejectVerifier()), tokens);
        feeToken.approve(address(feePool), 10 ether);
        vm.expectRevert(GothamPool.FeeOnTransfer.selector);
        feePool.shield(address(feeToken), 10 ether, keccak256("fee"));
    }

    function test_rejectingVerifierCannotReleaseFunds() external {
        (GothamPool pool, MockERC20 token) = _pool(new RejectVerifier());
        bytes32 leaf = keccak256("locked");
        _shield(pool, token, address(this), 25 ether, leaf);

        vm.expectRevert(GothamPool.BadProof.selector);
        pool.unshield(address(token), 25 ether, address(0xBEEF), keccak256("null"), pool.currentRoot(), bytes32(0), "");
        assertEq(token.balanceOf(address(0xBEEF)), 0);
        assertEq(pool.liabilities(address(token)), 25 ether);
    }

    function test_unshieldConservesAssetsAndSpendsNullifierOnce() external {
        (GothamPool pool, MockERC20 token) = _pool(new AcceptVerifier());
        _shield(pool, token, address(this), 100 ether, keccak256("note"));
        bytes32 root = pool.currentRoot();
        bytes32 nullifier = keccak256("spend");

        pool.unshield(address(token), 40 ether, address(0xBEEF), nullifier, root, keccak256("change"), "");
        assertEq(token.balanceOf(address(0xBEEF)), 40 ether);
        assertEq(pool.liabilities(address(token)), 60 ether);
        assertTrue(pool.nullifiers(nullifier));
        assertTrue(pool.commitments(keccak256("change")));

        vm.expectRevert(GothamPool.NullifierUsed.selector);
        pool.unshield(address(token), 10 ether, address(0xBEEF), nullifier, pool.currentRoot(), bytes32(0), "");

        vm.expectRevert(GothamPool.InsufficientPool.selector);
        pool.unshield(address(token), 61 ether, address(0xBEEF), keccak256("other"), pool.currentRoot(), bytes32(0), "");
    }

    function test_domainIsBoundIntoTheProofInputs() external {
        uint256 nonce = vm.getNonce(address(this));
        address predictedPool = vm.computeCreateAddress(address(this), nonce + 1);
        bytes32 domain = keccak256(abi.encode(block.chainid, predictedPool, bytes32("GOTHAM_POOL_V0")));
        DomainLock lock = new DomainLock(domain);

        MockERC20 token = new MockERC20();
        address[] memory tokens = new address[](1);
        tokens[0] = address(token);
        // The token deployment above consumed more nonces. Recompute from the live nonce.
        nonce = vm.getNonce(address(this));
        predictedPool = vm.computeCreateAddress(address(this), nonce + 1);
        domain = keccak256(abi.encode(block.chainid, predictedPool, bytes32("GOTHAM_POOL_V0")));
        lock = new DomainLock(domain);
        GothamPool pool = new GothamPool(address(lock), tokens);

        assertEq(address(pool), predictedPool);
        assertEq(pool.domain(), domain);

        token.mint(address(this), 8 ether);
        token.approve(address(pool), 8 ether);
        pool.shield(address(token), 8 ether, keccak256("domain-note"));
        pool.unshield(address(token), 8 ether, address(0xBEEF), keccak256("domain-null"), pool.currentRoot(), bytes32(0), "");
        assertEq(token.balanceOf(address(0xBEEF)), 8 ether);
    }

    function test_reentrancyOnDepositIsRejected() external {
        ReenteringERC20 token = new ReenteringERC20();
        address[] memory tokens = new address[](1);
        tokens[0] = address(token);
        GothamPool pool = new GothamPool(address(new AcceptVerifier()), tokens);
        token.setPool(address(pool));
        token.mint(address(this), 3 ether);
        token.approve(address(pool), 3 ether);

        vm.expectRevert(GothamPool.Reentrancy.selector);
        pool.shield(address(token), 3 ether, keccak256("reenter"));
    }

    function test_oldRootFallsOutOfTheWindow() external {
        (GothamPool pool, MockERC20 token) = _pool(new RejectVerifier());
        _shield(pool, token, address(this), 1 ether, bytes32(uint256(1)));
        bytes32 first = pool.currentRoot();
        for (uint256 i = 2; i <= 33; i++) {
            _shield(pool, token, address(this), 1 ether, bytes32(i));
        }
        assertFalse(pool.isKnownRoot(first));
        assertTrue(pool.isKnownRoot(pool.currentRoot()));
    }

    function test_nativeTransfersAreRefused() external {
        (GothamPool pool,) = _pool(new RejectVerifier());
        (bool ok,) = address(pool).call{value: 1}("");
        assertFalse(ok);
    }

    function _pool(IGothamVerifier verifier) internal returns (GothamPool pool, MockERC20 token) {
        token = new MockERC20();
        address[] memory tokens = new address[](1);
        tokens[0] = address(token);
        pool = new GothamPool(address(verifier), tokens);
    }

    function _shield(GothamPool pool, MockERC20 token, address from, uint256 amount, bytes32 commitment) internal {
        token.mint(from, amount);
        token.approve(address(pool), amount);
        pool.shield(address(token), amount, commitment);
    }

    function assertEq(uint256 a, uint256 b) internal pure {
        require(a == b, "uint mismatch");
    }

    function assertEq(bytes32 a, bytes32 b) internal pure {
        require(a == b, "bytes32 mismatch");
    }

    function assertEq(address a, address b) internal pure {
        require(a == b, "address mismatch");
    }

    function assertTrue(bool value) internal pure {
        require(value, "expected true");
    }

    function assertFalse(bool value) internal pure {
        require(!value, "expected false");
    }
}
