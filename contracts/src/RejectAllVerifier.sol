// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import {IGothamVerifier} from "./interfaces/IGothamVerifier.sol";

/// @notice A verifier that never accepts a proof. It cannot release pooled assets.
contract RejectAllVerifier is IGothamVerifier {
    function verify(bytes calldata, bytes32[] calldata) external pure returns (bool) {
        return false;
    }
}
