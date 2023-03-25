import React, { useState } from 'react';
import ReadInput from './ReadInput';
import { useContractRead } from 'wagmi';
import { useRouter } from 'next/router';

const DUMMY_INPUT = [
  {
    name: 'input1',
    type: 'uint256'
  },
  {
    name: 'input2',
    type: 'string'
  }
]

const ReadItem = ({ i, value, datatype, functionName, inputs, abi }) => {
  const [showReadData, setShowReadData] = useState(false);
  const [enteredInput, setEnteredInput] = useState([]);
  const [result, setResult] = useState(null);
  const router = useRouter();

  const { address } = router.query;

  const contractRead = useContractRead({
    address,
    abi,
    functionName,
  })

  const queryHandler = (event) => {
    event.preventDefault();

    if (!enteredInput.trim().length) {
      // toast error
      alert('Please enter input field');
    } else {
      console.log('Query data');
    }
  };

  const readDataHandler = async () => {

      if(datatype.includes('uint')) {
        setResult(contractRead.data.toString());
      }else {
        setResult(contractRead.data);
      }
  }

  return (
    <div className="bg-[#121212] rounded-md mt-4 select-none overflow-hidden">
      <p
        onClick={() => {
          setShowReadData(!showReadData);
        }}
        className="text-white py-3 px-4 flex items-center gap-2 cursor-pointer font-light"
      >
        {functionName}
      </p>

      {showReadData &&
        (inputs.length === 0 ? (
          <>
          <div className="items-center gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
            <p className="font-medium text-white">{value}</p>
            <p className="text-gray-300 italic text-sm block-inline">{datatype}</p>
            <div className='block mt-4'>
            <button
                type="submit"
                className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
              onClick={readDataHandler}>
                Query
              </button>
            <p className='text-white'>{result !== null && result}</p>
            </div>
          </div>
          </>
        ) : (
          <div className="flex flex-col gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
            <form
              onSubmit={queryHandler}
              className="flex flex-col"
            >
              {inputs?.map((input, i) => (
                <ReadInput
                  name={input.name}
                  type={input.type}
                  key={i}
                  setEnteredInput={setEnteredInput}
                />
              ))}

              <button
                type="submit"
                className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
              >
                Query
              </button>
            </form>
          </div>
        ))}
    </div>
  );
};

export default ReadItem;
