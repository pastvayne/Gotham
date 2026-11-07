// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MockERC20 {
    mapping(address account => uint256 amount) public balanceOf;
    mapping(address owner => mapping(address spender => uint256 amount)) public allowance;
    bool public takeFee;

    function mint(address to, uint256 amount) external {
        balanceOf[to] += amount;
    }

    function setFee(bool enabled) external {
        takeFee = enabled;
    }

    function approve(address spender, uint256 amount) external returns (bool) {
        allowance[msg.sender][spender] = amount;
        return true;
    }

    function transfer(address to, uint256 amount) external returns (bool) {
        _move(msg.sender, to, amount);
        return true;
    }

    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        uint256 allowed = allowance[from][msg.sender];
        require(allowed >= amount, "allowance");
        if (allowed != type(uint256).max) allowance[from][msg.sender] = allowed - amount;
        _move(from, to, amount);
        return true;
    }

    function _move(address from, address to, uint256 amount) internal virtual {
        require(balanceOf[from] >= amount, "balance");
        uint256 delivered = takeFee ? amount - amount / 10 : amount;
        balanceOf[from] -= amount;
        balanceOf[to] += delivered;
    }
}

interface IPoolReenter {
    function unshield(
        address token,
        uint256 amount,
        address recipient,
        bytes32 nullifier,
        bytes32 root,
        bytes32 changeCommitment,
        bytes calldata proof
    ) external;
}

contract ReenteringERC20 is MockERC20 {
    IPoolReenter public pool;
    bool internal entered;

    function setPool(address pool_) external {
        pool = IPoolReenter(pool_);
    }

    function _move(address from, address to, uint256 amount) internal override {
        super._move(from, to, amount);
        if (address(pool) != address(0) && !entered) {
            entered = true;
            pool.unshield(address(this), 1, address(0xBEEF), bytes32(uint256(7)), bytes32(uint256(7)), bytes32(0), "");
        }
    }
}
