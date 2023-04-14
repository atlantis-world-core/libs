import { ERC1155__factory } from "@aw/types/contracts";
import { Signer } from "ethers";
import { Provider } from "@wagmi/core";

interface IGetErc1155Contract {
  address: string;
  signerOrProvider: Signer | Provider;
}

export const getErc1155Contract = ({
  address,
  signerOrProvider,
}: IGetErc1155Contract) => ERC1155__factory.connect(address, signerOrProvider);
