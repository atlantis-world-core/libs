import { useQuery, UseQueryOptions } from "react-query";
import { useHttpClient, useLogger } from "../../core";
import { AuthUser } from "../types";

export interface IUseCurrentUser
  extends Pick<
    UseQueryOptions<unknown, unknown, AuthUser | undefined>,
    "onError" | "onSettled" | "onSuccess"
  > {}

const useCurrentUser = (options?: IUseCurrentUser) => {
  const log = useLogger(useCurrentUser.name);
  const { onError, onSettled, onSuccess } = options || {};
  const { api } = useHttpClient();

  return useQuery(
    ["get-current-user"],
    async (): Promise<AuthUser | undefined> => {
      const response = await api.get("/auth/user");
      return <AuthUser | undefined>response.data;
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

export default useCurrentUser;
