import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Code from '@/components/Address/Code';
import ABIComp from '@/components/Address/ABIComp';
import ReadAll from '@/components/Read/ReadAll';
import WriteAll from '@/components/Write/WriteAll';
import AddressComp from '@/components/Address/Address';
import Details from '@/components/Address/Details';
import {
  readContractSimilar,
  readContractDifferent,
  readChainRecord,
} from '../../polybase/queries';
import Loader from '@/components/Loader/Loader';
import TransactionAll from '@/components/Transaction/TransactionAll';
import { useContract, useSigner } from 'wagmi';
import {
  optimisticVerificationContract,
  optimisticVerificationABI,
} from '@/constants';
import Multichains from '@/components/Address/Multichains';

const CONTRACT_DATA = [
  {
    title: 'Name',
    value: 'Pool Contract',
  },
  {
    title: 'Description',
    value:
      'A random description for pool for testing to check if every component is working fine or not! Hello hey hola comoestas ',
  },
  {
    title: 'Owner',
    value: '0x51EEBc7765b246a4D16d02b28CEAC61299AB7d9d',
  },
  {
    title: 'Current Chain',
    value: 'Gnosis',
  },
  {
    title: 'Balance',
    value: '$102.34',
  },
];

const OTHER_CHAINS = [
  {
    title: 'Polygon',
    value: '0xE78419ae90e7CE4D9884b5001A4DE0491A32ad09',
  },
  {
    title: 'Optimism',
    value: '0x12e56bCD9Fb726574BAdA826594bfdFeBD9f4304',
  },
  {
    title: 'Mantle',
    value: '0xf2E01c4761EfeD1BD61F5e2933220D6eD07a2682',
  },
];

const Address = () => {
  const router = useRouter();
  const { address } = router.query;

  // const [showCode, setShowCode] = useState(true);
  // const [showWrite, setShowWrite] = useState(false);
  // const [showRead, setShowRead] = useState(false);
  // const [showAbi, setShowAbi] = useState(false);

  const [showCode, setShowCode] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [showAbi, setShowAbi] = useState(false);
  const [showTransaction, setShowTransaction] = useState(true);
  const [contractData, setContractData] = useState([]);
  const [alternateContracts, setAlternateContract] = useState([]);
  const [contractInformation, setContractInformation] = useState({});
  const [isDeployed, setIsDeployed] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const { data: signer } = useSigner();
  const contract = useContract({
    address: optimisticVerificationContract,
    abi: optimisticVerificationABI,
    signerOrProvider: signer,
  });

  const { chain } = router.query;

  const getData = async () => {
    try {
      //get the data of the current address first
      const contractRecord = await readContractSimilar(address);

      const check = new RegExp(router.query.chain, 'gi');
      const data = [
        {
          title: 'Name',
          value: contractRecord?.data?.name,
        },
        {
          title: 'Description',
          value: contractRecord?.data?.description,
        },
        {
          title: 'Owner',
          value: contractRecord?.data?.owner,
        },
        {
          title: 'Current Chain',
          value: chain,
        },
        {
          title: 'Balance',
          value: '$102.34',
        },
      ];
      const alternate = [];
      for (let chain of contractRecord.data.chains) {
        if (check.test(chain)) {
          setIsDeployed(true);
        }
        let obj = {
          title: chain,
          value: contractRecord.data.id,
        };

        alternate.push(obj);
      }

      setContractData(data);
      setAlternateContract(alternate);
      setContractInformation(contractRecord);
      setIsLoading(false);
    } catch (err) {
      if (err == 'Error: record/not-found error') {
        try {
          const contractData = await readChainRecord(address);

          const contractId = contractData.data.contractId;

          const contractRecord = await readContractDifferent(contractId);

          const data = [
            {
              title: 'Name',
              value: contractRecord?.data?.name,
            },
            {
              title: 'Description',
              value: contractRecord?.data?.description,
            },
            {
              title: 'Owner',
              value: contractRecord?.data?.owner,
            },
            {
              title: 'Current Chain',
              value: contractData?.data?.name,
            },
            {
              title: 'Balance',
              value: '$102.34',
            },
          ];

          let otherChains = [];
          if (contractRecord) {
            //then get data of each contract from their reference
            for (let otherChain of contractRecord?.data?.chains) {
              let singleChainData = await readChainRecord(otherChain?.id);
              otherChains.push({
                title: singleChainData?.data?.name,
                value: singleChainData?.data?.address,
              });

              if (check.test(chain)) {
                setIsDeployed(true);
              }
            }
          }
          setContractData(data);
          setAlternateContract(otherChains);
          setContractInformation(contractRecord);
          setIsLoading(false);
        } catch (err) {}
      }
    }
  };

  //useEffect will fetch the contract from polybase using the contract address
  useEffect(() => {
    if (address) {
      (async function () {
        setIsLoading(false);

        await getData();
      })();
    }
  }, [address, chain]);

  const showUmaAddresses = () => {};

  console.log(alternateContracts);

  const showReadHandler = () => {
    setShowCode(false);
    setShowWrite(false);
    setShowAbi(false);
    setShowTransaction(false);

    setShowRead(true);
  };

  const showWriteHandler = () => {
    setShowCode(false);
    setShowAbi(false);
    setShowRead(false);
    setShowTransaction(false);

    setShowWrite(true);
  };

  const showCodeHandler = () => {
    setShowRead(false);
    setShowAbi(false);
    setShowWrite(false);
    setShowTransaction(false);

    setShowCode(true);
  };

  const showAbiHandler = () => {
    setShowCode(false);
    setShowRead(false);
    setShowWrite(false);
    setShowTransaction(false);

    setShowAbi(true);
  };

  const showTransactionHandler = () => {
    setShowCode(false);
    setShowRead(false);
    setShowWrite(false);
    setShowAbi(false);
    setShowTransaction(true);
  };

  return (
    <section className="bg-[#111111] min-h-screen py-4">
      {!isDeployed || isLoading ? (
        <Loader />
      ) : (
        <>
          <AddressComp address={address} />

          <div className="flex mx-8 gap-3 mt-4">
            {contractData.length > 0 && (
              <Details
                data={contractData}
                heading="Contract details"
              />
            )}

            {/* {show if UMA boolean is true} */}
            {/* {alternateContracts.length > 0 && (
              <Details
                data={alternateContracts}
                address={address}
                heading="Deployed on other chains"
                isAddress={true}
              />
            )} */}

            {/* {show if uma Boolean is false} */}
            {alternateContracts.length > 0 && (
              <Multichains alternateContracts={alternateContracts} />
            )}
          </div>

          <div className="bg-[#171717] py-4 px-3 mx-8 mt-4 rounded-md">
            {/* Buttons */}
            <div className="flex gap-4">
              <p
                onClick={showTransactionHandler}
                className={`w-[120px] text-center py-2 rounded-md ${
                  showTransaction
                    ? 'bg-[#424242]'
                    : 'bg-[#242424] hover:bg-[#424242]'
                } text-white cursor-pointer`}
              >
                Transactions
              </p>
              <p
                onClick={showReadHandler}
                className={`w-[100px] text-center py-2 rounded-md ${
                  showRead ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'
                }   text-white cursor-pointer`}
              >
                Read
              </p>
              <p
                onClick={showWriteHandler}
                className={`w-[100px] text-center py-2 rounded-md ${
                  showWrite ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'
                } text-white cursor-pointer`}
              >
                Write
              </p>
              <p
                onClick={showCodeHandler}
                className={`w-[100px] text-center py-2 rounded-md ${
                  showCode ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'
                } text-white cursor-pointer`}
              >
                Code
              </p>
              <p
                onClick={showAbiHandler}
                className={`w-[100px] text-center py-2 rounded-md ${
                  showAbi ? 'bg-[#424242]' : 'bg-[#242424] hover:bg-[#424242]'
                } text-white cursor-pointer`}
              >
                ABI
              </p>
            </div>

            {/* pass transactions arr */}
            {showTransaction && contractInformation && <TransactionAll />}

            {showCode && contractInformation && (
              <Code code={contractInformation?.data?.contractCode} />
            )}

            {showRead && contractInformation && (
              <ReadAll abi={contractInformation?.data?.abi} />
            )}

            {showWrite && contractInformation && (
              <WriteAll abi={contractInformation?.data?.abi} />
            )}

            {showAbi && contractInformation && (
              <ABIComp AbiToString={contractInformation?.data?.abi} />
            )}
          </div>
        </>
      )}
    </section>
  );
};

export default Address;
