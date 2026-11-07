// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IGothamVerifier} from "./interfaces/IGothamVerifier.sol";
import {IncrementalTree} from "./libraries/IncrementalTree.sol";
import {SafeERC20} from "./libraries/SafeERC20.sol";
import {ReentrancyGuard} from "./ReentrancyGuard.sol";

interface IERC20Balance {
    function balanceOf(address account) external view returns (uint256);
}

/// @title GothamPool
/// @notice EXPERIMENTAL shielded-pool accounting. DO NOT DEPLOY WITH REAL FUNDS.
/// @dev The verifier is trusted completely. A verifier that returns true can withdraw every deposited asset.
///      Deposits stay public: the token transfer and this event reveal the depositor, the asset, and the amount.
///      The note secret is not an argument and must never be sent to this contract.
///
/// PUBLIC_INPUTS: domain, root, nullifier, token, amount, recipient, changeCommitment
contract GothamPool is ReentrancyGuard {
    uint256 public constant ROOT_HISTORY = 32;
    bytes32 public constant VERSION = "GOTHAM_POOL_V0";

    IGothamVerifier public immutable verifier;
    bytes32 public immutable domain;

    mapping(address token => bool supported) public supported;
    mapping(address token => uint256 liability) public liabilities;
    mapping(bytes32 commitment => bool seen) public commitments;
    mapping(bytes32 nullifier => bool spent) public nullifiers;
    bytes32[32] public recentRoots;

    uint8 private rootIndex;
    IncrementalTree.Data private tree;

    error ZeroAddress();
    error UnsupportedAsset();
    error ZeroAmount();
    error BadCommitment();
    error DuplicateCommitment();
    error FeeOnTransfer();
    error BadProof();
    error NullifierUsed();
    error UnknownRoot();
    error InsufficientPool();
    error NativeNotAccepted();

    event Shielded(bytes32 indexed commitment, address indexed token, uint256 amount);
    event Unshielded(bytes32 indexed nullifier, address indexed token, address indexed recipient, uint256 amount);

    constructor(address verifier_, address[] memory tokens) {
        if (verifier_ == address(0)) revert ZeroAddress();
        verifier = IGothamVerifier(verifier_);
        domain = keccak256(abi.encode(block.chainid, address(this), VERSION));
        IncrementalTree.init(tree);
        _remember(tree.root);
        for (uint256 i = 0; i < tokens.length; i++) {
            if (tokens[i] == address(0)) revert ZeroAddress();
            supported[tokens[i]] = true;
        }
    }

    receive() external payable {
        revert NativeNotAccepted();
    }

    function currentRoot() external view returns (bytes32) {
        return tree.root;
    }

    function zeroAt(uint256 level) external view returns (bytes32) {
        return tree.zeros[level];
    }

    function hashPair(bytes32 left, bytes32 right) external pure returns (bytes32) {
        return IncrementalTree.hash(left, right);
    }

    function isKnownRoot(bytes32 root) external view returns (bool) {
        return _isKnown(root);
    }

    /// @notice Deposit `amount` of an approved token and append `commitment` to the tree.
    ///         The caller, asset, and amount remain public.
    function shield(address token, uint256 amount, bytes32 commitment) external nonReentrant {
        if (!supported[token]) revert UnsupportedAsset();
        if (amount == 0) revert ZeroAmount();
        _useCommitment(commitment);

        uint256 beforeBalance = IERC20Balance(token).balanceOf(address(this));
        SafeERC20.safeTransferFrom(token, msg.sender, address(this), amount);
        uint256 received = IERC20Balance(token).balanceOf(address(this)) - beforeBalance;
        if (received != amount) revert FeeOnTransfer();

        _remember(IncrementalTree.insert(tree, commitment));
        liabilities[token] += amount;
        emit Shielded(commitment, token, amount);
    }

    /// @notice Release `amount` of `token` to `recipient` if `verifier` accepts the public inputs.
    ///         The withdrawal is public. This function does not hide the recipient or the amount.
    function unshield(
        address token,
        uint256 amount,
        address recipient,
        bytes32 nullifier,
        bytes32 root,
        bytes32 changeCommitment,
        bytes calldata proof
    ) external nonReentrant {
        if (!supported[token]) revert UnsupportedAsset();
        if (amount == 0) revert ZeroAmount();
        if (recipient == address(0)) revert ZeroAddress();
        if (nullifier == bytes32(0) || nullifiers[nullifier]) revert NullifierUsed();
        if (!_isKnown(root)) revert UnknownRoot();
        if (liabilities[token] < amount) revert InsufficientPool();
        if (changeCommitment != bytes32(0)) _useCommitment(changeCommitment);

        bytes32[] memory inputs = new bytes32[](7);
        inputs[0] = domain;
        inputs[1] = root;
        inputs[2] = nullifier;
        inputs[3] = bytes32(uint256(uint160(token)));
        inputs[4] = bytes32(amount);
        inputs[5] = bytes32(uint256(uint160(recipient)));
        inputs[6] = changeCommitment;

        if (!verifier.verify(proof, inputs)) revert BadProof();

        nullifiers[nullifier] = true;
        if (changeCommitment != bytes32(0)) {
            _remember(IncrementalTree.insert(tree, changeCommitment));
        }
        liabilities[token] -= amount;
        SafeERC20.safeTransfer(token, recipient, amount);
        emit Unshielded(nullifier, token, recipient, amount);
    }

    function _useCommitment(bytes32 commitment) private {
        if (commitment == bytes32(0) || commitment == tree.zeros[0]) revert BadCommitment();
        if (commitments[commitment]) revert DuplicateCommitment();
        commitments[commitment] = true;
    }

    function _remember(bytes32 root) private {
        recentRoots[rootIndex] = root;
        rootIndex = uint8((uint256(rootIndex) + 1) % ROOT_HISTORY);
    }

    function _isKnown(bytes32 root) private view returns (bool) {
        if (root == bytes32(0)) return false;
        for (uint256 i = 0; i < ROOT_HISTORY; i++) {
            if (recentRoots[i] == root) return true;
        }
        return false;
    }
}
