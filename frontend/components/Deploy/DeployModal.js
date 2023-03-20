import Image from 'next/image';
import React, { useState } from 'react';
import { AiOutlineDeploymentUnit } from 'react-icons/ai';
import Loader from '../Loader/Loader';

const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className="top-0 left-0 fixed bg-black/20 backdrop-blur-md h-screen w-screen"
    ></div>
  );
};

const DeployModal = ({ onClose }) => {
  const [generatingAddress, setGeneratingAddress] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateAddressHandler = () => {
    setGeneratingAddress(true);
    setIsLoading(false); // make it false after address generated
  };

  const deployHandler = () => {
    console.log('Logic for deploy here!');

    // after deploying, add react-toast and display success message
  };

  return (
    <div>
      <Backdrop onClose={onClose} />
      <div className="w-[550px] bg-[#111111] p-10 rounded-2xl absolute top-[50%] left-[50%] shadow-md -translate-x-[50%] -translate-y-[50%] z-10 rounded-b-2xl  overflow-hidden border border-gray-800">
        <div className="flex flex-col justify-center items-center gap-4">
          <AiOutlineDeploymentUnit
            color="white"
            size={80}
          />
          <p className="text-green-300 text-sm">
            {generatingAddress
              ? 'Genetating Address...'
              : 'Successfully Compiled!'}
          </p>
        </div>

        {!generatingAddress ? (
          <>
            <button
              onClick={generateAddressHandler}
              className="py-3 px-7 rounded-md bg-[#191919] hover:bg-[#111111] text-gray-300 border border-gray-600 mt-10 w-full"
            >
              Generate Address
            </button>
            <p className="text-xs mt-1 text-gray-400 text-center">
              Generate an address for your compiled contract
            </p>
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader inComp={true} />
            ) : (
              <div>
                <p className="text-xs text-gray-400 mt-6 mb-1">
                  Generated Address
                </p>
                <p className="py-3 px-2 border text-gray-400 border-gray-700 rounded-md w-full">
                  0x090909090909000090
                </p>

                <button
                  onClick={deployHandler}
                  className="py-3 px-7 rounded-md bg-[#1F423A] hover:bg-[#1a3831] text-green-300 border border-gray-600 mt-10 w-full"
                >
                  Deploy
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DeployModal;
