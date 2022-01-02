import React from "react";
import '../styles/globals.css'
import type {AppProps} from 'next/app'
import {ChakraProvider, ThemeConfig} from "@chakra-ui/react";
import {extendTheme} from "@chakra-ui/react";
import {QueryClient, QueryClientProvider} from "react-query";

const config: ThemeConfig = {
    initialColorMode: 'dark',
    useSystemColorMode: false
}

const theme = extendTheme({config});

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false // do not retry failed requests by default
        }
    }
});

function MyApp({Component, pageProps}: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <ChakraProvider resetCSS theme={theme}>
                <Component {...pageProps} />
            </ChakraProvider>
        </QueryClientProvider>
    )
}

export default MyApp
