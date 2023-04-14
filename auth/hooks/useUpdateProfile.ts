/* eslint-disable no-alert */
import { useHttpClient, useLogger } from "lib/core";
import { useMutation, UseMutationOptions } from "react-query";
import { AuthUser } from "../types";

export interface IUseUpdateProfile
  extends Pick<
    UseMutationOptions<AuthUser, unknown, unknown, unknown>,
    "onError" | "onSuccess" | "onSettled" | "onMutate"
  > {}

const useUpdateProfile = (options?: IUseUpdateProfile) => {
  const log = useLogger(useUpdateProfile.name);
  const { onError, onMutate, onSettled, onSuccess } = options || {};
  const { api } = useHttpClient();
  // const { data, error, loading, setData, setError, setLoading } =
  //   useCommonState();

  return useMutation(
    ["update-profile"],
    async (payload: AuthUser) => {
      const response = await api.put("/auth/update", payload);
      return response.data;
    },
    {
      onError(error, variables, context) {
        log.error({ error, variables, context });

        const { status } = (error as any).response;
        if (status > 399 && status < 500) {
          if (status === 405) {
            alert("Username is already in use");
          } else {
            alert("Please enter a valid username");
          }
          // @ts-ignore
          document.getElementById("username-input").value = "";
        }

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

  // const updateProfile = async (payload: AuthUser) => {
  //   try {
  //     setLoading(true);
  //     const response = await api.put("/auth/update", payload);

  //     // console.log("response from username update: ", response)

  //     setData(response.data);
  //     setError(undefined);

  //     return { data: response.data, error: undefined } as const;
  //   } catch (error) {
  //     // @ts-ignore
  //     const { status } = error.response;

  //     if (status > 399 && status < 500) {
  //       if (status === 405) {
  //         alert("Username is already in use");
  //       } else {
  //         alert("Please enter a valid username");
  //       }
  //       // @ts-ignore
  //       document.getElementById("username-input").value = "";
  //     }
  //     setData(undefined);
  //     setError(error);

  //     return { data: undefined, error } as const;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // return {
  //   data,
  //   error,
  //   loading,
  //   updateProfile,
  // } as const;
};

export default useUpdateProfile;
