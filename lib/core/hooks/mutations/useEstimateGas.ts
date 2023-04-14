import { useLogger, useSignerOrProvider } from "lib/core";
import { BigNumberish, Contract, utils } from "ethers";
import { useMutation } from "react-query";

interface IUseEstimateGas {
  contract: Contract;
  methodName: string;
  args: any[];
  value?: BigNumberish;
}

interface GasEstimates {
  gasLimit: number;
  gasPrice?: number;
  maxFeePerGas?: number;
  maxPriorityFeePerGas?: number;
  gasFee?: number;
}

type EstimateGasMutationResult = Promise<GasEstimates>;

const GAS_LIMIT_MULTIPLICATOR = 1;

export const useEstimateGas = () => {
  const log = useLogger(useEstimateGas.name);
  const signerOrProvider = useSignerOrProvider();

  return useMutation(
    ["ESTIMATE_GAS"],
    async ({
      contract,
      methodName,
      args,
      value,
    }: IUseEstimateGas): EstimateGasMutationResult => {
      log.verbose("ESTIMATE_GAS_MUTATE", {
        contract,
        methodName,
        args,
        value,
      });
      const fullArgs = value ? [...args, { value }] : args;
      try {
        const [gasLimit, { gasPrice, maxFeePerGas, maxPriorityFeePerGas }] =
          await Promise.all([
            contract.estimateGas[methodName](...fullArgs),
            signerOrProvider.getFeeData(),
          ]);

        let gasFee: number | undefined;
        if (!!gasLimit && !!maxFeePerGas && !!maxPriorityFeePerGas) {
          const gasFeeBn = gasLimit.mul(maxFeePerGas);
          gasFee = Number(utils.formatEther(gasFeeBn));
        }

        const gasEstimates: GasEstimates = {
          gasLimit: gasLimit.toNumber() * GAS_LIMIT_MULTIPLICATOR,
          gasPrice: gasPrice?.toNumber() || undefined,
          maxFeePerGas: maxFeePerGas?.toNumber() || undefined,
          maxPriorityFeePerGas: maxPriorityFeePerGas?.toNumber() || undefined,
          gasFee,
        };
        return gasEstimates;
      } catch (gasError) {
        try {
          const result = await contract.callStatic[methodName](...fullArgs);
          throw new Error(
            `Unexpected successful call after failed estimate gas. ${gasError}. ${result}`,
          );
        } catch (callError: any) {
          const errorMessage = `The transaction cannot succeed due to error: ${callError.reason}. This is probably an issue with one of the tokens you are swapping.`;
          throw new Error(errorMessage);
        }
      }
    },
    {
      onSuccess: (data) => log.success("ESTIMATE_GAS_SUCC", data),
      onError: (error) => log.error("ESTIMATE_GAS_ERROR", error),
    },
  );
};
