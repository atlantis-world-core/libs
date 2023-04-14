/* eslint-disable no-template-curly-in-string */
import { Chain, chain } from "wagmi";

export enum CHAIN_IDS {
  ARBITRUM = chain.arbitrum.id,
  ARBITRUM_RINKEBY = chain.arbitrumRinkeby.id,
  GOERLI = chain.goerli.id,
  HARDHAT = chain.hardhat.id,
  KOVAN = chain.kovan.id,
  LOCALHOST = chain.localhost.id,
  MAINNET = chain.mainnet.id,
  OPTIMISM = chain.optimism.id,
  OPTIMISM_KOVAN = chain.optimismKovan.id,
  OPTIMISM_GOERLI = 420,
  POLYGON = chain.polygon.id,
  POLYGON_MUMBAI = chain.polygonMumbai.id,
  RINKEBY = chain.rinkeby.id,
  ROPSTEN = chain.ropsten.id,
  AVALANCHE = 43114,
  ARBITRUM_ONE = 42161,
  GNOSIS = 100,
  BINANCE = 56,
  FANTOM_OPERA = 250,
  CELO = 42220,
  AURORA = 1313161554,
  HARMONY = 1666600000,
}

// TODO: Replace all ${INFURA_API_KEY} as config
export const CHAINS: Record<number, Chain> = {
  [CHAIN_IDS.ARBITRUM]: chain.arbitrum,
  [CHAIN_IDS.ARBITRUM_RINKEBY]: chain.arbitrumRinkeby,
  [CHAIN_IDS.GOERLI]: chain.goerli,
  [CHAIN_IDS.HARDHAT]: chain.hardhat,
  [CHAIN_IDS.KOVAN]: chain.kovan,
  [CHAIN_IDS.LOCALHOST]: chain.localhost,
  [CHAIN_IDS.MAINNET]: chain.mainnet,
  [CHAIN_IDS.OPTIMISM]: chain.optimism,
  [CHAIN_IDS.OPTIMISM_GOERLI]: chain.optimismKovan,
  [CHAIN_IDS.POLYGON]: chain.polygon,
  [CHAIN_IDS.POLYGON_MUMBAI]: chain.polygonMumbai,
  [CHAIN_IDS.RINKEBY]: chain.rinkeby,
  [CHAIN_IDS.ROPSTEN]: chain.ropsten,
  [CHAIN_IDS.AVALANCHE]: {
    id: 43114,
    name: "Avalanche",
    network: "avalanche",
    nativeCurrency: {
      decimals: 18,
      name: "Avalanche",
      symbol: "AVAX",
    },
    rpcUrls: {
      default: "https://avalanche.public-rpc.com/",
    },
    blockExplorers: {
      default: { name: "SnowTrace", url: "https://snowtrace.io" },
      etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
    },
    testnet: false,
  },
  [CHAIN_IDS.ARBITRUM_ONE]: {
    id: 42161,
    name: "Arbitrum One",
    network: "arbitrum",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://arb1.arbitrum.io/rpc",
      infura: "https://arbitrum-mainnet.infura.io/v3",
      alchemy: "https://arb-mainnet.g.alchemy.com/v2",
    },
    blockExplorers: {
      default: { name: "Arbiscan", url: "https://arbiscan.io" },
      etherscan: { name: "Arbiscan", url: "https://arbiscan.io" },
    },
    testnet: false,
  },
  [CHAIN_IDS.GNOSIS]: {
    id: 100,
    name: "Gnosis Chain",
    network: "gno",
    nativeCurrency: {
      name: "xDAI",
      symbol: "xDAI",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://rpc.gnosischain.com",
    },
    blockExplorers: {
      default: {
        name: "Bblockscout",
        url: "https://blockscout.com/xdai/mainnet",
      },
      etherscan: {
        name: "Bblockscout",
        url: "https://blockscout.com/xdai/mainnet",
      },
    },
  },
  [CHAIN_IDS.BINANCE]: {
    id: 56,
    name: "Binance Smart Chain Mainnet",
    network: "bnb",
    nativeCurrency: {
      name: "Binance Chain Native Token",
      symbol: "BNB",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://bsc-dataseed1.binance.org",
    },
    blockExplorers: {
      default: {
        name: "BscScan",
        url: "https://bscscan.com",
      },
      etherscan: {
        name: "BscScan",
        url: "https://bscscan.com",
      },
    },
  },
  [CHAIN_IDS.FANTOM_OPERA]: {
    id: 250,
    name: "Fantom Opera",
    network: "ftm",
    nativeCurrency: {
      name: "Fantom",
      symbol: "FTM",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://rpc.ftm.tools",
    },
    blockExplorers: {
      default: {
        name: "FtmScan",
        url: "https://ftmscan.com",
      },
      etherscan: {
        name: "FtmScan",
        url: "https://ftmscan.com",
      },
    },
  },
  [CHAIN_IDS.CELO]: {
    id: 42220,
    name: "Celo",
    network: "CELO",
    nativeCurrency: {
      decimals: 18,
      name: "CELO Token",
      symbol: "CELO",
    },
    rpcUrls: {
      default: "https://forno.celo.org",
    },
    blockExplorers: {
      default: { name: "CELO Explorer", url: "https://explorer.celo.org" },
      etherscan: { name: "CELO Explorer", url: "https://explorer.celo.org" },
    },
    testnet: false,
  },
  [CHAIN_IDS.OPTIMISM_GOERLI]: {
    id: 420,
    name: "Optimism Goerli Testnet",
    network: "Optimism Goerli Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://goerli.optimism.io/",
    },
    blockExplorers: {
      default: {
        name: "Optimism Goerli Explorer",
        url: "https://goerli-optimism.etherscan.io",
      },
      etherscan: {
        name: "Optimism Goerli Explorer",
        url: "https://goerli-optimism.etherscan.io",
      },
    },
    testnet: true,
  },
  [CHAIN_IDS.AURORA]: {
    id: CHAIN_IDS.AURORA,
    name: "Aurora",
    network: "Aurora",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: {
      default: "https://mainnet.aurora.dev",
    },
    blockExplorers: {
      default: {
        name: "Aurorascan",
        url: "https://aurorascan.dev/",
      },
      etherscan: {
        name: "Aurorascan",
        url: "https://aurorascan.dev/",
      },
    },
    testnet: false,
  },
};

export const EXPLORERS: Record<number, string> = {
  [CHAIN_IDS.MAINNET]: "https://etherscan.io",
  [CHAIN_IDS.POLYGON]: "https://polygonscan.com",
  [CHAIN_IDS.ARBITRUM]: "https://arbiscan.io",
};
