import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import { useRouter } from 'next/router';
import { getPolygonTransactions, getMantleTransactions, getOptimismTranasctions, getGnosisTransactions, getScrollTransactions, getzkSyncTransactions, getSepoliaTransactions } from "@/transactions/index"

const menuBar = ['Txn Hash', 'Block', 'Method Id', 'From', 'To', 'Value'];

// const transactions = [
//   {
//     id: '1',
//     txHash:
//       '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
//     from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     block: '40496987',
//     timeStamp: 1679509314,
//     value: '24,793',
//   },
//   {
//     id: '2',
//     txHash:
//       '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
//     from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     block: '40496987',
//     timeStamp: 1679509314,
//     value: '24,793.23328',
//   },
//   {
//     id: '3',
//     txHash:
//       '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
//     from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     block: '40496987',
//     timeStamp: 1679509314,
//     value: '24,793.2332861',
//   },
//   {
//     id: '4',
//     txHash:
//       '0x076c82f3951148344769a8ff768ca61d3c66f0f86480cba102cae236580d445d',
//     from: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     to: '0xf0245f6251bef9447a08766b9da2b07b28ad80b0',
//     block: '40496987',
//     timeStamp: 1679509314,
//     value: '24,793.2332861',
//   },
// ];

const TransactionAll = ({transactionsProp}) => {
  const router = useRouter();
  const [transactions, setTransactions] = useState([]);

  const { address, chain } = router.query;

  const getTransactions = async () => {
    const polygon = new RegExp('polygon', 'gi');
      const mumbai = new RegExp('mumbai', 'gi');
      const optimism = new RegExp('optim', 'gi');
      const gnosis = new RegExp('gnosis', 'gi');
      const chiado = new RegExp('chiado', 'gi');
      const sepolia = new RegExp('sepolia', 'gi');
      const mantle = new RegExp('mantle', 'gi');
      const scroll = new RegExp('scroll', 'gi');
      const zksync = new RegExp('sync', 'gi');

      if(mumbai.test(chain) || polygon.test(chain)) {
        const data = await getPolygonTransactions(address);
        setTransactions(data.result.slice(0, 15));

      }else if(optimism.test(chain)) {
        
        const data = await getOptimismTranasctions(address);
        setTransactions(data.result.slice(0,15));

      }else if(gnosis.test(chain) || chiado.test(chain)) {
        //not working will check tommorrow
        const data = await getGnosisTransactions(address);
        setTransactions(data.result.slice(0,15));

      }else if(sepolia.test(chain)) {
        const data = await getSepoliaTransactions(address);
        setTransactions(data.result.slice(0, 15));
        console.log(data);

      //last 3 arent't checked
      }else if(scroll.test(chain)) {
        const data = await getScrollTransactions(address);
        setTransactions(data.result.slice(0, 15));
        console.log(data);
      
      }else if(mantle.test(chain)) {
        const data = await getMantleTransactions(address);
        setTransactions(data.result.slice(0, 15));
        console.log(data);

      }else if(zksync.test(chain)) {
        const data = await getzkSyncTransactions(address);
        setTransactions(data.result.slice(0, 15));
        console.log(data);
      }

  }


  useEffect(() => {
      getTransactions();
  }, [address, chain]);

  return (
    <div>
      <div className="flex gap-3 text-white text-center py-3 px-2 mt-6 bg-[black]/30 font-semibold font-Poppins rounded-xl">
        {menuBar.map((menu) => (
          <p className="flex-[0.2]">{menu}</p>
        ))}
      </div>

      {/* replace this transactions arr with the array of real transaction 
      (prop) & make sure the object passing is namely correct */}
      {transactions.length > 0 && transactions.map((transaction) => (
        <Transaction
          key={transaction.blockHash}
          methodId={transaction.methodId}
          block={transaction.blockNumber}
          from={transaction.from}
          to={transaction.to}
          txHash={transaction.blockHash}
          value={transaction.value}
        />
      ))}
    </div>
  );
};

export default TransactionAll;
