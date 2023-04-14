import { BoxProps, StackItem } from "@chakra-ui/react";

export interface IFWStackItem extends BoxProps {}

export const FWStackItem = ({ children, ...props }: IFWStackItem) => (
  <StackItem {...props} w="full">
    {children}
  </StackItem>
);
