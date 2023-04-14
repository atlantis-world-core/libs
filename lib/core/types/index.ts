import { BaseProvider } from "@ethersproject/providers";
import { ContractReceipt, ContractTransaction, Signer } from "ethers";

export * from "./nft";
export * from "./nft-storage";

export interface CoreContextState {
  accessToken: string;
  apiBaseUrl: string;
  moralisWeb3ApiKey: string;
  alchemyApiPolygonMainnetUrl: string;
}

export type SignerOrProvider = Signer | BaseProvider;

export interface ContractCallResult {
  tx: ContractTransaction | undefined;
  rc: ContractReceipt | undefined;
}
