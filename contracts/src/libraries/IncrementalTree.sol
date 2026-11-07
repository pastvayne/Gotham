// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @notice Experimental incremental Merkle tree.
/// @dev The hash is keccak256, not a circuit hash. A production tree has to use the same hash as the prover.
library IncrementalTree {
    uint256 internal constant DEPTH = 20;

    error TreeFull();

    struct Data {
        bytes32[DEPTH] zeros;
        bytes32[DEPTH] filled;
        uint256 nextIndex;
        bytes32 root;
    }

    function hash(bytes32 left, bytes32 right) internal pure returns (bytes32) {
        return keccak256(abi.encode(left, right));
    }

    function init(Data storage tree) internal {
        bytes32 current = keccak256("GOTHAM_EMPTY_LEAF_V0");
        tree.zeros[0] = current;
        for (uint256 level = 1; level < DEPTH; level++) {
            current = hash(current, current);
            tree.zeros[level] = current;
        }
        tree.root = hash(tree.zeros[DEPTH - 1], tree.zeros[DEPTH - 1]);
    }

    function insert(Data storage tree, bytes32 leaf) internal returns (bytes32) {
        if (tree.nextIndex >= (uint256(1) << DEPTH)) revert TreeFull();
        uint256 index = tree.nextIndex;
        bytes32 current = leaf;
        for (uint256 level = 0; level < DEPTH; level++) {
            if (index % 2 == 0) {
                tree.filled[level] = current;
                current = hash(current, tree.zeros[level]);
            } else {
                current = hash(tree.filled[level], current);
            }
            index /= 2;
        }
        tree.nextIndex += 1;
        tree.root = current;
        return current;
    }
}
