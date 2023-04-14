import { BigNumber, ethers } from "ethers";

export const numberWithCommas = (value: number) =>
  value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

export const formatAmount = (
  amount: number | string,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
): string => {
  let locale = "fr-FR";
  if (typeof navigator !== "undefined") locale = navigator.language || "fr-FR";
  if (maximumFractionDigits < minimumFractionDigits)
    maximumFractionDigits = minimumFractionDigits;
  return new Intl.NumberFormat([locale, "en-US"], {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Number(amount));
};

export const toNormalizedValue = (v: string | BigNumber, d?: number): number =>
  Number(formatUnits(v || 0, d || 18));

export const formatUnits = (
  value: ethers.BigNumberish,
  unitName?: ethers.BigNumberish | undefined,
): string => ethers.utils.formatUnits(value, unitName);

export const formatFromBigNumber = (
  amount: BigNumber | string,
  decimals = 6,
  minimumFractionDigits = 2,
  maximumFractionDigits = 2,
) =>
  formatAmount(
    toNormalizedValue(amount ?? "0", decimals),
    minimumFractionDigits,
    maximumFractionDigits,
  );
