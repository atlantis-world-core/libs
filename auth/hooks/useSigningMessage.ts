import { useQuery, UseQueryOptions } from "react-query";
import { useHttpClient, useLogger } from "../../core";
import { AuthNonce } from "../types";

export interface IUseSigningMessage
  extends Pick<
    UseQueryOptions<unknown, unknown, AuthNonce | undefined>,
    "onError" | "onSettled" | "onSuccess"
  > {}

const useSigningMessage = (options?: IUseSigningMessage) => {
  const log = useLogger(useSigningMessage.name);
  const { onError, onSettled, onSuccess } = options || {};
  const { api } = useHttpClient();

  return useQuery(
    ["get-signing-message"],
    async (): Promise<AuthNonce | undefined> => {
      const response = await api.get("/auth/nonce");
      return <AuthNonce | undefined>response.data;
    },
    {
      enabled: false,
      cacheTime: 0,
      onError(error) {
        log.error({ error });
        onError?.(error);
      },
      onSettled(data, error) {
        log.verbose("settled", { data, error });
        onSettled?.(data, error);
      },
      onSuccess(data) {
        log.success({ data });
        onSuccess?.(data);
      },
    },
  );
};

export default useSigningMessage;
