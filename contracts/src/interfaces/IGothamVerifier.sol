// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Verifies a Gotham proof. A verifier that returns true is trusted with the entire pool.
interface IGothamVerifier {
    function verify(bytes calldata proof, bytes32[] calldata publicInputs) external view returns (bool);
}
