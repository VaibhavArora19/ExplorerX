// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";

contract Create2Deployer {
    function deploy(
        bytes32 salt,
        bytes memory bytecode
    ) external returns (address) {
        return Create2.deploy(0, salt, bytecode);
    }

    function computeAddress(
        bytes32 salt,
        bytes memory bytecode,
        address deployer
    ) public pure returns (address) {
        return Create2.computeAddress(salt, keccak256(bytecode), deployer);
    }
}
