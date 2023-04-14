import { BigNumberish, ContractTransaction } from "ethers";
import { useMutation } from "react-query";
import { ERC20__factory } from "types/contracts";
import {
  // useEstimateGas,
  useLogger,
  useSignerOrProvider,
} from "lib/core";

type ApproveMutationResult = ContractTransaction | undefined;

interface IUseApproveMutate {
  spender?: string | undefined;
  value?: BigNumberish | undefined;
  token?: string | undefined;
}
export interface IUseApprove {
  token?: string | undefined;
  onError?:
    | ((
        error: unknown,
        variables: IUseApproveMutate,
        context: unknown,
      ) => void | Promise<unknown>)
    | undefined;
  onSuccess?:
    | ((
        data: ApproveMutationResult,
        variables: IUseApproveMutate,
        context: unknown,
      ) => void | Promise<unknown>)
    | undefined;
  onSettled?:
    | ((
        data: ApproveMutationResult,
        error: unknown,
        variables: IUseApproveMutate,
        context: unknown,
      ) => void | Promise<unknown>)
    | undefined;
  onMutate?: ((variables: IUseApproveMutate) => unknown) | undefined;
}

export const useApprove = (options?: IUseApprove) => {
  const log = useLogger(useApprove.name);
  const signerOrProvider = useSignerOrProvider();
  // const { mutateAsync: estimateGas } = useEstimateGas();

  return useMutation(
    ["approve-token"],
    async ({ spender, value, token }: IUseApproveMutate) => {
      const _token = token ?? options?.token;
      log.verbose({ spender, value, _token });
      if (!spender || !_token || !value) return;
      const erc20 = ERC20__factory.connect(_token, signerOrProvider);
      // const { gasLimit, maxFeePerGas, maxPriorityFeePerGas } = await estimateGas({
      //   contract: erc20,
      //   methodName: "approve",
      //   args: [spender, value],
      // });
      const tx = await erc20.approve(spender, value, {
        gasLimit: 200_000,
        // maxFeePerGas,
        // maxPriorityFeePerGas,
      });
      return tx;
    },
    {
      ...options,
    },
  );
};
