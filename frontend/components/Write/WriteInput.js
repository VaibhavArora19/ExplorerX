import { useState } from "react";

const WriteInput = ({i, input, inputHandler}) => {
    const [enteredInput, setEnteredInput] = useState(null);

    const handleInput = (e) => {
        setEnteredInput(e.target.value);
        inputHandler(i, e.target.value)
    }
    return (
        <div key={i}>
        <p className="text-sm text-gray-300 mb-1">{input.name}</p>
        <input
          onChange={handleInput}
          value={enteredInput && enteredInput}
          placeholder={input.type}
          className="w-[400px] py-2 rounded-md px-2 mb-6 bg-[#2b2b2b] outline-none text-gray-400"
        />
      </div>
    )
};

export default WriteInput;