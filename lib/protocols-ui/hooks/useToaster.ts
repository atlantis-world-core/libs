import { ReactNode } from "react";
import {
  useToast,
  ToastId,
  AlertStatus,
  UseToastOptions,
  ToastPosition,
} from "@chakra-ui/react";

export enum TOAST_IDS {
  DEPOSIT_SUCCESS,
  DEPOSIT_ERROR,
  REPAY_SUCCESS,
  REPAY_ERROR,
  WITHDRAW_SUCCESS,
  WITHDRAW_ERROR,
  APPROVE_SUCCESS,
  APPROVE_ERROR,
  SWAP_SUCCESS,
  SWAP_ERROR,
  SUPPLY_SUCCESS,
  SUPPLY_ERROR,
  CREATE_VAULT_SUCCESS,
  CREATE_VAULT_ERROR,
  TX_SUCCESS,
  TX_ERROR,
  LENS_PROFILE_ALREADY_EXISTS,
  LENS_PROFILE_NOT_EXISTS,
  LOADING,
  SUCCESS,
  ERROR,
  WARNING,
  INFO,
}

export interface IShowUniqueToast {
  id: ToastId;
  status: AlertStatus;
  title: ReactNode;
  description: ReactNode;
  duration?: number;
  isClosable?: boolean;
  position?: ToastPosition;
}

export interface IShowLoadingToast
  extends Pick<IShowUniqueToast, "duration" | "position"> {
  message?: string;
}

export interface IUseToaster extends UseToastOptions {}

export const useToaster = (defaultOptions?: IUseToaster) => {
  const toast = useToast({
    isClosable: true,
    containerStyle: {
      fontFamily: "cyborgSister, VT323",
      fontSize: "24px",
      zIndex: 10001,
    },
    ...defaultOptions,
  });

  const showUniqueToast = ({
    id,
    status,
    title,
    description,
    duration,
    isClosable,
    position,
  }: IShowUniqueToast) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        status,
        title,
        description,
        duration,
        isClosable,
        position,
      });
    }
  };

  const showTransactionToast = ({
    id,
    status,
    title,
    description,
  }: IShowUniqueToast) => {
    if (!toast.isActive(id)) {
      toast({
        id,
        status,
        title,
        description,
        duration: null,
        isClosable: false,
      });
    }
  };

  const updateTransactionToast = ({
    id,
    status,
    title,
    description,
  }: IShowUniqueToast) => {
    if (toast.isActive(id)) {
      toast.update(id, {
        status,
        title,
        description,
        duration: null,
        isClosable: false,
      });
    }
  };

  const closeTransactionToast = ({ id }: { id: string }) => {
    if (toast.isActive(id)) toast.close(id);
  };

  const showDepositSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.DEPOSIT_SUCCESS,
      status: "success",
      title: "Deposit Successful",
      description: "Successfully deposited tokens",
    });
  };

  const showDepositErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.DEPOSIT_ERROR,
      status: "error",
      title: "Deposit Error",
      description: "Transaction failed",
    });
  };

  const showWithdrawSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.WITHDRAW_SUCCESS,
      status: "success",
      title: "Withdraw Successful",
      description: "Successfully withdrawed tokens",
    });
  };

  const showWithdrawErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.WITHDRAW_ERROR,
      status: "error",
      title: "Withdraw Error",
      description: "Transaction failed",
    });
  };

  const showRepaySuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.REPAY_SUCCESS,
      status: "success",
      title: "Repay Successful",
      description: "Successfully withdrawed tokens",
    });
  };

  const showRepayErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.REPAY_ERROR,
      status: "error",
      title: "Repay Error",
      description: "Transaction failed",
    });
  };

  const showApproveSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.APPROVE_SUCCESS,
      status: "success",
      title: "Approve Success",
      description: "Tokens approved for spending",
    });
  };

  const showApproveErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.APPROVE_ERROR,
      status: "error",
      title: "Approve Error",
      description: "Attempt to approve token failed",
    });
  };

  const showSwapSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SWAP_SUCCESS,
      status: "success",
      title: "Swap Success",
      description: "Successfully swap tokens",
    });
  };

  const showSwapErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SWAP_ERROR,
      status: "error",
      title: "Swap Error",
      description: "Transaction failed",
    });
  };

  const showSupplySuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SUPPLY_SUCCESS,
      status: "success",
      title: "Supply Success",
      description: "Successfully supplied tokens",
    });
  };

  const showSupplyErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SUPPLY_ERROR,
      status: "error",
      title: "Supply Error",
      description: "Transaction failed",
    });
  };

  const showBorrowSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SUPPLY_SUCCESS,
      status: "success",
      title: "Borrow Success",
      description: "Successfully borrowed tokens",
    });
  };

  const showBorrowErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.SUPPLY_ERROR,
      status: "error",
      title: "Borrow Error",
      description: "Transaction failed",
    });
  };

  const showCreateVaultSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.CREATE_VAULT_SUCCESS,
      status: "success",
      title: "Vault Creation Success",
      description: "Successfully created a new vault",
    });
  };

  const showCreateVaultErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.CREATE_VAULT_ERROR,
      status: "error",
      title: "Vault Creation Error",
      description: "Transaction Failed",
    });
  };

  const showTxSuccessToast = () => {
    showUniqueToast({
      id: TOAST_IDS.TX_SUCCESS,
      status: "success",
      title: "Success",
      description: "Transaction sent",
    });
  };

  const showTxErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.TX_ERROR,
      status: "error",
      title: "Error",
      description: "Transaction failed",
    });
  };

  const showLensProfileAlreadyExistsErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.LENS_PROFILE_ALREADY_EXISTS,
      status: "error",
      title: "Error",
      description: "Lens profile already exists",
    });
  };

  const showLensProfileNotExistsErrorToast = () => {
    showUniqueToast({
      id: TOAST_IDS.LENS_PROFILE_NOT_EXISTS,
      status: "error",
      title: "Error",
      description: "Lens profile not exists",
    });
  };

  const showSuccessToast = (message?: string) =>
    showUniqueToast({
      id: TOAST_IDS.SUCCESS,
      status: "success",
      title: "Success",
      description: message || "Action Success!",
    });

  const showErrorToast = (message?: string) =>
    showUniqueToast({
      id: TOAST_IDS.ERROR,
      status: "error",
      title: "Error",
      description: message || "Action Error!",
    });

  const showInfoToast = (message?: string) =>
    showUniqueToast({
      id: TOAST_IDS.SUCCESS,
      status: "info",
      title: "Info",
      description: message || "Action Info!",
    });

  const showWarningToast = (message?: string) =>
    showUniqueToast({
      id: TOAST_IDS.WARNING,
      status: "warning",
      title: "Warning",
      description: message || "Action Warning!",
    });

  const showLoadingToast = (args?: IShowLoadingToast) => {
    const { duration, message, position } = args || {};
    showUniqueToast({
      id: TOAST_IDS.LOADING,
      status: "loading",
      title: "Loading",
      description: message || "Loading...",
      isClosable: true,
      duration,
      position,
    });
  };

  const closeToast = (toastId: number) => toast.close(toastId);

  return {
    showUniqueToast,
    showTransactionToast,
    updateTransactionToast,
    closeTransactionToast,
    showDepositSuccessToast,
    showDepositErrorToast,
    showWithdrawSuccessToast,
    showWithdrawErrorToast,
    showRepaySuccessToast,
    showRepayErrorToast,
    showApproveSuccessToast,
    showApproveErrorToast,
    showSwapSuccessToast,
    showSwapErrorToast,
    showSupplySuccessToast,
    showSupplyErrorToast,
    showBorrowSuccessToast,
    showBorrowErrorToast,
    showCreateVaultSuccessToast,
    showCreateVaultErrorToast,
    showTxSuccessToast,
    showTxErrorToast,
    showLensProfileAlreadyExistsErrorToast,
    showLensProfileNotExistsErrorToast,
    showSuccessToast,
    showErrorToast,
    showInfoToast,
    showWarningToast,
    showLoadingToast,
    closeToast,
  } as const;
};

export const usePlaceholderToast = () => {
  const toast = useToast();

  const showNotAvailableYetToast = () => {
    toast({
      status: "info",
      title: "Not Available Yet",
      isClosable: true,
      description:
        "This functionality is not built yet, devs are busy buidl'ing it!",
    });
  };

  return { showNotAvailableYetToast } as const;
};
