import { ethers } from "ethers";
import { describe, it, expect } from "vitest";
import { getErc1155Contract } from "./getErc1155Contract";

describe.skip("ERC1155", () => {
  it("Should return ERC1155 instance of ethers Contract", () => {
    const erc1155 = getErc1155Contract({
      address: ethers.constants.AddressZero,
      signerOrProvider: ethers.providers.getDefaultProvider(1),
    });
    expect(typeof erc1155.balanceOf).toBe("function");
  });
});
