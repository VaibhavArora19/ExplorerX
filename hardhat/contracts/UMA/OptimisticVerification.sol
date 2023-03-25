// SPDX-License-Identifier: AGPL-3.0-only

pragma solidity ^0.8.16;

import "@uma/core/contracts/optimistic-oracle-v3/interfaces/OptimisticOracleV3Interface.sol";



contract OptimisticVerification {
    // Create an Optimistic Oracle V3 instance at the deployed address on Görli.
    OptimisticOracleV3Interface oov3 =
        OptimisticOracleV3Interface(0x9923D42eF695B5dd9911D05Ac944d4cAca3c4EAB);


    IERC20 bondCurrency = IERC20(0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6);

    bytes32 public constant defaultIdentifier = "ASSERT_TRUTH";

    mapping(string => bytes32) public assertionIdByContractId;
    
    function assertTruth(string memory _claim, string memory _contractId) public returns(bytes32){
       bytes memory assertedClaim = bytes(_claim);
       bytes32 assertionId = oov3.assertTruth(assertedClaim, address(this), address(0), address(0), 5 days, bondCurrency, 0, defaultIdentifier, bytes32(0));

        assertionIdByContractId[_contractId] = assertionId;
        return assertionId;
    }

    function getAssertionResultByContractId(string memory _contractId) public view returns (bool) {
        bytes32 _assertionId = assertionIdByContractId[_contractId];
        return oov3.getAssertionResult(_assertionId);
    }


    function settleAndGetAssertionResultByContractId(string memory _contractId) public returns(bool) {
        bytes32 _assertionId = assertionIdByContractId[_contractId];
        return oov3.settleAndGetAssertionResult(_assertionId);
    }


    function getAssertionByContractId(string memory _contractId) public view returns(OptimisticOracleV3Interface.Assertion memory) {
        bytes32 _assertionId = assertionIdByContractId[_contractId];
        return oov3.getAssertion(_assertionId);
    }

    function getAssertionId(string memory _contractId) public view returns(bytes32) {
        return assertionIdByContractId[_contractId];
    }
}
// 0x474891484CdA794b66AFcD6eD391336df4958DA7