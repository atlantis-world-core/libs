import { Box, BoxProps } from "@chakra-ui/react";

export interface ProtocolRouterContainerProps extends BoxProps {}

const ProtocolRouterContainer = ({
  children,
  ...props
}: ProtocolRouterContainerProps) => (
  <Box {...props} h="100%" overflowY="auto" w="full">
    {children}
  </Box>
);

export default ProtocolRouterContainer;
