import { Box, Text } from "@chakra-ui/react";

export interface ProtocolNetworkFallbackProps {
  networkNameOrId: string;
  protocolName?: string;
}

const ProtocolNetworkFallback = ({
  networkNameOrId,
  protocolName,
}: ProtocolNetworkFallbackProps) => (
  <Box p={5}>
    <Text>
      ⚠️ The current network "{networkNameOrId}" is not supported{" "}
      {protocolName ? `for ${protocolName}` : ""}
    </Text>
  </Box>
);

export default ProtocolNetworkFallback;
