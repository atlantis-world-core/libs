import { useMutation, UseMutationOptions } from "react-query";
import { useHttpClient, useLogger } from "../../core";
import { AuthResult, AuthSignaturePayload } from "../types";

export interface IUseAuthenticate
  extends Pick<
    UseMutationOptions<AuthResult | undefined, unknown, unknown, unknown>,
    "onError" | "onSuccess" | "onSettled" | "onMutate"
  > {}

const useAuthenticate = (options?: IUseAuthenticate) => {
  const log = useLogger(useAuthenticate.name);
  const { onError, onMutate, onSettled, onSuccess } = options || {};
  const { api } = useHttpClient();

  const {
    mutate: authenticate,
    mutateAsync: authenticateAsync,
    ...useMutationOptions
  } = useMutation(
    ["authenticate"],
    async ({
      address,
      username,
      signaturePayload,
    }: {
      address: string;
      username: string;
      signaturePayload: AuthSignaturePayload;
    }) => {
      const response = await api.post("/auth/authenticate", {
        address,
        username,
        signaturePayload,
      });
      return <AuthResult>response.data;
    },
    {
      onError(error, variables, context) {
        log.error({ error, variables, context });
        onError?.(error, variables, context);
      },
      onMutate(variables) {
        log.verbose("mutate", { variables });
        onMutate?.(variables);
      },
      onSettled(data, error, variables, context) {
        log.verbose("settled", { data, error, variables, context });
        onSettled?.(data, error, variables, context);
      },
      onSuccess(data, variables, context) {
        log.success({ data, variables, context });
        onSuccess?.(data, variables, context);
      },
    },
  );

  return {
    authenticate,
    authenticateAsync,
    ...useMutationOptions,
  };
};

export default useAuthenticate;
