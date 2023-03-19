import React, { useState } from 'react';
import ReadInput from './ReadInput';

const ReadItem = ({ i, value, datatype, functionName, inputs }) => {
  const [showReadData, setShowReadData] = useState(false);
  const [enteredInput, setEnteredInput] = useState([]);

  const queryHandler = (event) => {
    event.preventDefault();

    if (!enteredInput.trim().length) {
      // toast error
      alert('Please enter input field');
    } else {
      console.log('Query data');
    }
  };

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
          <div className="flex items-center gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
            <p className="font-medium text-white">{value}</p>
            <p className="text-gray-300 italic text-sm">{datatype}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 px-6 transition-all bg-[#222222] py-4 ease-in-out delay-150">
            <form
              onSubmit={queryHandler}
              className="flex flex-col"
            >
              {inputs.map((input, i) => (
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
