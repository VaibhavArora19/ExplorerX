import React, { useEffect, useRef, useState } from 'react';
import { BsArrowDownShort, BsArrowRightShort } from 'react-icons/bs';

const WriteItem = ({ functionName, i, inputs }) => {
  const [showWriteData, setShowWriteDate] = useState(false);
  const [enteredInput, setEnteredInput] = useState({});

  const writeHandler = (e) => {
    e.preventDefault();

    console.log(enteredInput);
  };

  return (
    <div className="bg-[#121212] rounded-md mt-4 select-none overflow-hidden cursor-pointer">
      {/* function Name */}

      <div
        onClick={() => {
          setShowWriteDate(!showWriteData);
        }}
        className="flex justify-between w-full items-center"
      >
        <p className="text-white py-3 px-4 flex items-center gap-2  font-light">
          <span>{i + 1}.</span>
          {functionName}
        </p>

        {showWriteData ? (
          <BsArrowDownShort
            color="white"
            size={25}
            className="mr-5"
          />
        ) : (
          <BsArrowRightShort
            color="white"
            size={25}
            className="mr-5"
          />
        )}
      </div>

      {showWriteData && (
        <div className="flex flex-col gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
          <form
            onSubmit={writeHandler}
            className="flex flex-col"
          >
            {inputs.map((input, i) => (
              <div key={i}>
                <p className="text-sm text-gray-300 mb-1">{input.name}</p>
                <input
                  onChange={(e) => {
                    setEnteredInput(e.target.value);
                  }}
                  placeholder={input.type}
                  className="w-[400px] py-2 rounded-md px-2 mb-6 bg-[#2b2b2b] outline-none text-gray-400"
                />
              </div>
            ))}

            <button
              type="submit"
              className="w-[100px] bg-[#111111] hover:bg-black py-2 mt-4 rounded-md text-gray-400"
            >
              Write
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WriteItem;
