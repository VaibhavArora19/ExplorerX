import React from 'react';
import { dummyAPI } from '@/dummyAPI';
import WriteItem from './WriteItem';

const WriteAll = ({abi}) => {
  const writeArr = [];

  const parsedAbi = JSON.parse(abi);
  parsedAbi.filter((method) => {
    if (
      method.stateMutability === 'payable' ||
      (method.stateMutability === 'nonpayable' && method.type === 'function')
    ) {
      writeArr.push(method);
    }
  });

  return (
    <div>

      {!writeArr.length && <p className='text-white text-sm text-center py-20'>No Write methods available!</p>}

      {writeArr.map((item, i) => (
        <>
          <WriteItem functionName={item.name} i={i} inputs={item.inputs} />
        </>
      ))}
    </div>
  );
};

export default WriteAll;
