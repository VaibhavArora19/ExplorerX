import React from 'react';
import Transaction from './Transaction';

const menuBar = ['Txn Hash', 'Block', 'Time', 'From', 'To', 'Value'];

const transactions = [
  {
    id: '1',
    txHash:
      '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
    from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    block: '40496987',
    timeStamp: 1679509314,
    value: '24,793',
  },
  {
    id: '2',
    txHash:
      '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
    from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    block: '40496987',
    timeStamp: 1679509314,
    value: '24,793.23328',
  },
  {
    id: '3',
    txHash:
      '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
    from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    block: '40496987',
    timeStamp: 1679509314,
    value: '24,793.2332861',
  },
  {
    id: '4',
    txHash:
      '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
    from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
    block: '40496987',
    timeStamp: 1679509314,
    value: '24,793.2332861',
  },
];

const TransactionAll = () => {
  return (
    <div>
      <div className="flex gap-3 text-white text-center py-3 px-2 mt-6 bg-[black]/30 font-semibold font-Poppins rounded-xl">
        {menuBar.map((menu) => (
          <p className="flex-[0.2]">{menu}</p>
        ))}
      </div>

      {/* replace this transactions arr with the array of real transaction & make sure the object passing is namely correct */}
      {transactions.map((transaction) => (
        <Transaction
          key={transaction.id}
          timestamp={transaction.timeStamp}
          block={transaction.block}
          from={transaction.from}
          to={transaction.to}
          txHash={transaction.txHash}
          value={transaction.value}
        />
      ))}
    </div>
  );
};

export default TransactionAll;
