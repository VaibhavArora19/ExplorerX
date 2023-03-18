// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";
import {Create2} from "@openzeppelin/contracts/utils/Create2.sol";
import {Initializable} from "@openzeppelin/contracts/proxy/utils/Initializable.sol";

contract XDeployer is IXReceiver, Initializable {
    // Interface for the connext xcall function
    IConnext public connext;

    // This function is used to initialize the variables
    function initialize(address _connext) public initializer {
        connext = IConnext(_connext);
    }

    // This function is used to deploy the contract across multiple chains
    // @param target - the address of the target contract
    // @param destinationDomain - a array of the destination chain IDs
    // @param salt - the salt used to create the contract address
    // @param bytecode - the bytecode of the contract
    // @param relayerFee - a array of the fee the relayer will charge for the xcall function to call the target contract
    // @param initializable - a boolean to determine if the contract is initializable
    // @param initializeData - the data used to initialize the contract
    // @param totalFee - the total fee the user will pay for the xcall function to execute this accross multiple chains
    function xDeployer(
        address target,
        uint32[] calldata destinationDomain,
        bytes32 salt,
        bytes memory bytecode,
        uint256[] calldata relayerFee,
        bool initializable,
        bytes memory initializeData,
        uint256 totalFee
    ) external payable {
        // Encode calldata for the target contract call
        require(msg.value >= totalFee, "msg.value must equal totalFee");
        if (destinationDomain.length != relayerFee.length) {
            revert("destinationDomain and relayerFee must be the same length");
        }
        deployContract(salt, bytecode, initializable, initializeData);
        bytes memory callData = abi.encode(
            salt,
            bytecode,
            initializable,
            initializeData
        );
        for (uint i = 0; i < destinationDomain.length; i++) {
            connext.xcall{value: relayerFee[i]}(
                destinationDomain[i], // _destination: Domain ID of the destination chain
                target, // _to: address of the target contract
                address(0), // _asset: address of the token contract
                msg.sender, // _delegate: address that can revert or forceLocal on destination
                0, // _amount: amount of tokens to transfer
                0, // _slippage: max slippage the user will accept in BPS (e.g. 300 = 3%)
                callData // _callData: the encoded calldata to send
            );
        }
    }

    // This function is called by the connext xcall function
    // @param _callData - the encoded calldata to send
    // @return bytes - the encoded return data
    function xReceive(
        bytes32,
        uint256,
        address,
        address,
        uint32,
        bytes memory _callData
    ) external returns (bytes memory) {
        // Unpack the _callData
        (
            bytes32 salt,
            bytes memory bytecode,
            bool initializable,
            bytes memory initializeData
        ) = abi.decode(_callData, (bytes32, bytes, bool, bytes));
        deployContract(salt, bytecode, initializable, initializeData);
    }

    // This function is used to deploy and initialize a contract
    // @param salt - the salt used to generate the address
    // @param bytecode - the bytecode of the contract
    // @param initializable - whether the contract is initializable
    // @param initializeData - the data used to initialize the contract
    // @return address - the address of the deployed contract
    function deployContract(
        bytes32 salt,
        bytes memory bytecode,
        bool initializable,
        bytes memory initializeData
    ) public returns (address) {
        address deployedAddress = deploy(salt, bytecode);
        // transfer ownership to the _originSender
        if (initializable) {
            (bool success, ) = deployedAddress.call(initializeData);
            require(success, "transferOwnership failed");
        }
        return deployedAddress;
    }

    // This function is used to deploy a contract using CREATE2
    // @param salt - the salt used to generate the address
    // @param bytecode - the bytecode of the contract
    // @return address - the address of the deployed contract
    function deploy(
        bytes32 salt,
        bytes memory bytecode
    ) public returns (address) {
        return Create2.deploy(0, salt, bytecode);
    }

    // This function is used to compute the address of the contract that will be deployed
    // @param salt - the salt used to generate the address
    // @param bytecode - the bytecode of the contract
    // @return address - the computed address of the contract that will be deployed
    function computeAddress(
        bytes32 salt,
        bytes memory bytecode
    ) public view returns (address) {
        return Create2.computeAddress(salt, keccak256(bytecode));
    }

    receive() external payable {}
}
