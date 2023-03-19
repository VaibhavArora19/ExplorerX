import "@/styles/globals.css";

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/react";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import {
  polygonMumbai,
  scrollTestnet,
  filecoinHyperspace,
  gnosisChiado,
  optimismGoerli,
  zkSyncTestnet,
} from "wagmi/chains";

const chains = [
  polygonMumbai,
  scrollTestnet,
  filecoinHyperspace,
  gnosisChiado,
  optimismGoerli,
  zkSyncTestnet,
];
const projectId = "e4c7b443da64b8536ebe63013642fd28";

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
        <Component {...pageProps} />{" "}
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
