import { Box, BoxProps, Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";

const RENDERER_THEME = {
  p: (props: any) => {
    const { children } = props;
    return <Text>{children}</Text>;
  },
};

export interface ProtocolMarkdownProps extends BoxProps {
  children?: string;
}

const ProtocolMarkdown = ({ children, ...props }: ProtocolMarkdownProps) => (
  <Box {...props}>
    <ReactMarkdown components={ChakraUIRenderer(RENDERER_THEME)} skipHtml>
      {children || ""}
    </ReactMarkdown>
  </Box>
);

export default ProtocolMarkdown;
