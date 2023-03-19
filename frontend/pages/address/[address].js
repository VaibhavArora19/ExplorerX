import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { optimisticVerificationABI } from '../../constants/index';
import AddressComp from '@/components/Address/Address';
import Details from '@/components/Address/Details';
import Code from '@/components/Address/Code';
import ABIComp from '@/components/Address/ABIComp';
import ReadAll from '@/components/Read/ReadAll';
import WriteAll from '@/components/Write/WriteAll';

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

  const [showCode, setShowCode] = useState(true);
  const [showWrite, setShowWrite] = useState(false);
  const [showRead, setShowRead] = useState(false);
  const [showAbi, setShowAbi] = useState(false);

  const showReadHandler = () => {
    setShowCode(false);
    setShowWrite(false);
    setShowAbi(false);
    setShowRead(true);
  };

  const showWriteHandler = () => {
    setShowCode(false);
    setShowRead(false);
    setShowAbi(false);
    setShowWrite(true);
  };

  const showCodeHandler = () => {
    setShowRead(false);
    setShowAbi(false);
    setShowWrite(false);
    setShowCode(true);
  };

  const showAbiHandler = () => {
    setShowCode(false);
    setShowRead(false);
    setShowWrite(false);
    setShowAbi(true);
  };

  // console.log(optimisticVerificationABI); 
  const AbiToString = JSON.stringify(optimisticVerificationABI);

  return (
    <section className="bg-[#111111] min-h-screen py-4">
      <AddressComp address={address} />

      <div className="flex mx-8 gap-3 mt-4">
        <Details
          data={CONTRACT_DATA}
          heading="Contract details"
        />
        <Details
          data={OTHER_CHAINS}
          heading="Other chains"
          isAddress={true}
        />
      </div>

      <div className="bg-[#171717] py-4 px-3 mx-8 mt-4 rounded-md">
        {/* Buttons */}
        <div className="flex gap-4">
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

        {showCode && <Code />}

        {showRead && <ReadAll />}

        {showWrite && <WriteAll/>}

        {showAbi && <ABIComp AbiToString={AbiToString} />}
      </div>
    </section>
  );
};

export default Address;
