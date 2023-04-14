import { Box, BoxProps } from "@chakra-ui/react";
import { useNetworkSupported } from "../hooks";
import ProtocolNetworkFallback from "../components/ProtocolNetworkFallback";

export interface ProtocolDefaultLayoutProps extends BoxProps {
  /**
   * @description
   * An array of chain ID that this protocol supports.
   */
  supportedChains?: string[] | number[];
  /**
   * @description
   * The name of the protocol integration e.g. "Snapshot"
   */
  protocolName?: string;
}

const ProtocolDefaultLayout = ({
  children,
  supportedChains,
  protocolName,
  ...props
}: ProtocolDefaultLayoutProps) => {
  const { isNetworkSupported, networkNameOrId } = useNetworkSupported(
    supportedChains?.map((chain) => String(chain)),
  );

  return (
    <Box
      h="full"
      overflowY="auto"
      w="full"
      fontFamily="cyborgSister"
      {...props}
    >
      {isNetworkSupported ? (
        children
      ) : (
        <ProtocolNetworkFallback
          networkNameOrId={networkNameOrId}
          protocolName={protocolName}
        />
      )}
    </Box>
  );
};

export default ProtocolDefaultLayout;
