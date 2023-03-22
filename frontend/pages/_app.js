import '@/styles/globals.css';

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import {
  polygonMumbai,
  scrollTestnet,
  filecoinHyperspace,
  gnosisChiado,
  optimismGoerli,
  zkSyncTestnet,
} from 'wagmi/chains';
import { Mantle } from '@/constants';
import Layout from '@/components/Layout/Layout';

const chains = [
  scrollTestnet,
  polygonMumbai,
  filecoinHyperspace,
  gnosisChiado,
  optimismGoerli,
  zkSyncTestnet,
  Mantle,
];
const projectId = 'e4c7b443da64b8536ebe63013642fd28';

const { provider } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider,
});
const ethereumClient = new EthereumClient(wagmiClient, chains);

export default function App({ Component, pageProps }) {
  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
      />
    </>
  );
}
