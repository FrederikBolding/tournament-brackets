import "../styles/globals.css";
import { ChakraProvider, ColorMode, extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark" as ColorMode,
  useSystemColorMode: false,
};
const theme = extendTheme({ config });

function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default App;
