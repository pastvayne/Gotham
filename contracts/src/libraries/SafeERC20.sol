// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @dev Handles tokens that return true, return nothing, or return false. Does not accept a shortfall.
library SafeERC20 {
    error TransferFailed();

    function safeTransfer(address token, address to, uint256 amount) internal {
        _call(token, abi.encodeWithSelector(0xa9059cbb, to, amount));
    }

    function safeTransferFrom(address token, address from, address to, uint256 amount) internal {
        _call(token, abi.encodeWithSelector(0x23b872dd, from, to, amount));
    }

    function _call(address token, bytes memory data) private {
        (bool ok, bytes memory result) = token.call(data);
        if (!ok) {
            assembly {
                revert(add(result, 0x20), mload(result))
            }
        }
        if (result.length > 0 && !abi.decode(result, (bool))) revert TransferFailed();
    }
}
