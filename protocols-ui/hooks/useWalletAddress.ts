import { ethers } from "ethers";
import { useAccount } from "wagmi";

export default function useWalletAddress() {
  const { address } = useAccount();
  return [address || ethers.constants.AddressZero, undefined] as const;
}
