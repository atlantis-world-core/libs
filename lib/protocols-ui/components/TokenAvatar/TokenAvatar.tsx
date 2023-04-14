import { Avatar, AvatarProps } from "@chakra-ui/react";
import { useTokenLogo } from "lib/protocols-ui/hooks";

export interface ITokenAvatar extends AvatarProps {
  address?: string;
  logoURI?: string;
}

export const TokenAvatar = ({ address, logoURI, ...props }: ITokenAvatar) => {
  const tokenLogo = useTokenLogo({ address });
  return <Avatar {...props} src={logoURI || tokenLogo} loading="lazy" />;
};
