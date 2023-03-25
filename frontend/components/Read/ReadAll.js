import React, { useEffect } from 'react';
import ReadItem from './ReadItem';

const ReadAll = ({ abi }) => {
  const inputArr = [];
  const nonInputArr = [];

  const parsedAbi = JSON.parse(abi);

  parsedAbi.filter((method) => {
    if (
      method.stateMutability === 'view' ||
      method.stateMutability === 'pure'
    ) {
      if (method.inputs.length) {
        inputArr.push(method);
      } else nonInputArr.push(method);
    }
  });

  return (
    <div>
      {!nonInputArr.length && !inputArr.length && (
        <p className="text-white text-sm text-center py-20">
          No read methods available!
        </p>
      )}

      {nonInputArr.map((item, i) => (
        <>
          <ReadItem
            functionName={item.name}
            value={item.outputs[0].name}
            datatype={item.outputs[0].type}
            inputs={item.inputs}
            abi={parsedAbi}
          />
        </>
      ))}

      {inputArr.map((item, i) => (
        <ReadItem
          abi={parsedAbi}
          functionName={item.name}
          inputs={item.inputs}
          inputName={item.name}
          value={item.outputs[0].name}
        />
      ))}
    </div>
  );
};

export default ReadAll;
