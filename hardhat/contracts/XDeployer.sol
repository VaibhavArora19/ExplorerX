// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
import "./Create2Deployer.sol";
import {IConnext} from "@connext/smart-contracts/contracts/core/connext/interfaces/IConnext.sol";
import {IXReceiver} from "@connext/smart-contracts/contracts/core/connext/interfaces/IXReceiver.sol";

contract XDeployer is IXReceiver {
    IConnext public immutable connext;
    Create2Deployer public immutable create2Deployer;

    constructor(address _connext, address _create2Deployer) {
        connext = IConnext(_connext);
        create2Deployer = Create2Deployer(_create2Deployer);
    }

    function xDeployer(
        address target,
        uint32[] calldata destinationDomain,
        bytes32 salt,
        bytes memory bytecode,
        uint256[] calldata relayerFee,
        bool ownership,
        uint256 totalFee
    ) external payable {
        // Encode calldata for the target contract call
        require(msg.value >= totalFee, "msg.value must equal totalFee");
        if (destinationDomain.length != relayerFee.length) {
            revert("destinationDomain and relayerFee must be the same length");
        }
        deployContract(salt, bytecode, ownership, msg.sender);
        bytes memory callData = abi.encode(salt, bytecode, ownership);
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

    function xReceive(
        bytes32 ,
        uint256 ,
        address,
        address _originSender,
        uint32,
        bytes memory _callData
    ) external returns (bytes memory) {
        // Unpack the _callData
        (bytes32 salt, bytes memory bytecode, bool ownership) = abi.decode(
            _callData,
            (bytes32, bytes, bool)
        );
        deployContract(salt, bytecode, ownership, _originSender);
    }

    function deployContract (
        bytes32 salt,
        bytes memory bytecode,
        bool ownership,
        address owner
    ) public returns (address) {
        address deployedAddress = create2Deployer.deploy(salt, bytecode);
        // transfer ownership to the _originSender
        if (ownership) {
            (bool success, ) = deployedAddress.call(
                abi.encodeWithSignature(
                    "transferOwnership(address)",
                    owner
                )
            );
            require(success, "transferOwnership failed");
        }
        return deployedAddress;
    }

    function computeAddress(
        bytes32 salt,
        bytes memory bytecode
    ) public view returns (address) {
        return
            create2Deployer.computeAddress(
                salt,
                bytecode,
                address(this)
            );
    }
}
