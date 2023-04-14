import { SignatureLike } from "@ethersproject/bytes";
import { Signer } from "ethers";

export type AuthSigner = Signer | undefined;

export type AuthNonce = {
  message: string;
  /**
   * @description
   * The nonce digest
   */
  value: string;
};

export type AuthSignaturePayload = {
  nonce: AuthNonce;
  /**
   * @description
   * The returned signature after it is signed
   */
  signature: SignatureLike;
};

export type AuthOptions = {
  apiBaseUrl: string;
};

export type AuthUser = {
  _id: string;
  address: string;
  username?: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
};

export type AuthResult = {
  signature_payload: AuthSignaturePayload;
  access_token: string;
  token_type: string | "Bearer";
  user: AuthUser;
};
