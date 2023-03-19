import React, { useEffect } from 'react';
import ReadItem from './ReadItem';
import { dummyAPI } from '@/dummyAPI';

const ReadAll = () => {
  const inputArr = [];
  const nonInputArr = [];

  dummyAPI.filter((method) => {
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
      {nonInputArr.map((item, i) => (
        <>
          <ReadItem
            functionName={item.name}
            value={item.outputs[0].name}
            datatype={item.outputs[0].type}
            inputs={item.inputs}
          />
        </>
      ))}

      {inputArr.map((item, i) => (
        <ReadItem
          functionName={item.name}
          inputs={item.inputs}
          inputName={item.name}
        />
      ))}
    </div>
  );
};

export default ReadAll;
