import React from 'react';
import Detail from './DetailItem';

const Details = ({ data, heading, isAddress }) => {
  return (
    <div className="py-3 px-3 rounded-md bg-[#171717] min-h-[350px] flex-[0.5] flex flex-col gap-1 max-h-[350px] overflow-y-scroll">
      <p className="text-[#78787a] font-semibold text-sm py-3 pl-2">
        {heading}
      </p>
      {data.map((item, i) => (
        <Detail
          key={i}
          title={item.title}
          value={item.value}
          isAddress={isAddress}
        />
      ))}
    </div>
  );
};

export default Details;
