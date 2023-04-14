import { describe, it, expect } from "vitest";
import { isAlphaPassHolder } from "./isAlphaPassHolder";

describe.skip("isAlphaPassHolder()", () => {
  const holderAccount = "0x0fc1c3004c16e24195279fbca20a49592e7018c2";
  const randomAccount = "0x0fc1c3004c16e24195279fbca20a49592e7018c3";

  it("Should return true on correct user address", async () => {
    const result = await isAlphaPassHolder({ account: holderAccount });
    expect(result).toBe(true);
  });

  it("Should return false on incorrect user address", async () => {
    const result = await isAlphaPassHolder({
      account: randomAccount,
    });
    expect(result).toBe(false);
  });
});
