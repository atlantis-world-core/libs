import mixpanel from "mixpanel-browser";
import type { RequestOptions, Callback } from "mixpanel-browser";
import { useMutation, UseMutationOptions } from "react-query";
import { useLogger } from "@aw/lib/core/hooks/instances";

export interface UseAnalyticsTrackArgs {
  eventName: string;
  properties?: Record<any, any>;
  optionsOrCallback?: RequestOptions | Callback | undefined;
  callback?: Callback | undefined;
}

export interface IUseAnalyticsTrack
  extends Pick<
    UseMutationOptions<void, unknown, UseAnalyticsTrackArgs, any>,
    "onSettled" | "onSuccess" | "onError" | "onMutate"
  > {}

export const useAnalyticsTrack = (options?: IUseAnalyticsTrack) => {
  const log = useLogger(useAnalyticsTrack.name);

  const {
    mutate: track,
    mutateAsync: trackAsync,
    ...useMutationResult
  } = useMutation(
    ["analytics-track"],
    async ({
      eventName,
      properties,
      optionsOrCallback,
      callback,
    }: UseAnalyticsTrackArgs) =>
      mixpanel.track(eventName, properties, optionsOrCallback, callback),
    {
      onSettled(data, error, variables, context) {
        log.verbose("SETTLED", { data, error, variables, context });
        options?.onSettled?.(data, error, variables, context);
      },
      onSuccess(data, variables, context) {
        log.success({ data, variables, context });
        options?.onSuccess?.(data, variables, context);
      },
      onError(error, variables, context) {
        log.error({ error, variables, context });
        options?.onError?.(error, variables, context);
      },
      onMutate(variables) {
        log.verbose("MUTATE", { variables });
        options?.onMutate?.(variables);
      },
    },
  );

  return {
    track,
    trackAsync,
    ...useMutationResult,
  };
};
