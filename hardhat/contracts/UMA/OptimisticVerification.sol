//SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.14;

import "https://github.com/UMAprotocol/protocol/blob/master/packages/core/contracts/optimistic-oracle-v2/interfaces/OptimisticOracleV2Interface.sol";


contract OO_GettingStarted {
    
    // Create an Optimistic oracle instance at the deployed address on Görli.
    OptimisticOracleV2Interface oo = OptimisticOracleV2Interface(0xA5B9d8a0B0Fa04Ba71BDD68069661ED5C0848884);

    // Use the yes no idetifier to ask arbitary questions, such as the weather on a particular day.
    bytes32 identifier = bytes32("YES_OR_NO_QUERY");

    uint256 requestTime = 0; // Store the request time so we can re-use it later.

    bytes ancillaryData;
    // Submit a data request to the Optimistic oracle.
    function requestData(address[] memory contractAddresses) public {
    
    // Post the question in ancillary data. Note that this is a simplified form of ancillry data to work as an example. A real
    // world prodition market would use something slightly more complex and would need to conform to a more robust structure.
    ancillaryData =
        abi.encodePacked("Are all the contract addresses share the same source code?", contractAddresses);
        
        requestTime = block.timestamp; // Set the request time to the current block time.
        IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6); // Use Görli WETH as the bond currency.
        uint256 reward = 0;

        // Now, make the price request to the Optimistic oracle and set the liveness to 5 days so it will settle quickly.
        oo.requestPrice(identifier, requestTime, ancillaryData, bondCurrency, reward);
        oo.setCustomLiveness(identifier, requestTime, ancillaryData, 5 days);
    }

    // Settle the request once it's gone through the liveness period of 5 Days. This acts the finalize the voted on price.
    function settleRequest() public {
        oo.settle(address(this), identifier, requestTime, ancillaryData);
    }

    // Fetch the resolved value from the Optimistic Oracle that was settled.
    function getSettledData() public view returns (int256) {
        return oo.getRequest(address(this), identifier, requestTime, ancillaryData).resolvedPrice;
    }
}
