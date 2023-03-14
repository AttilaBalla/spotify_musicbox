import React from "react";
import type {AppProps} from 'next/app'
import {theme} from "../utilities/theme";
import {Container, CssBaseline, ThemeProvider} from "@mui/material";
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import {makeStyles} from "tss-react/mui";
import {createEmotionSsrAdvancedApproach} from "tss-react/next/pagesDir";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false // do not retry failed requests by default
        }
    }
});

const useStyles = makeStyles()(
    (theme) => ({})
);

const {
    augmentDocumentWithEmotionCache,
    withAppEmotionCache
} = createEmotionSsrAdvancedApproach({"key": "css"});

export {augmentDocumentWithEmotionCache};

function CustomApp({Component, pageProps}: AppProps) {

    const {classes} = useStyles();

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <main>
                    <Container sx={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%'
                        }}>
                        <Component {...pageProps} />
                    </Container>
                </main>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    )
}

export default withAppEmotionCache(CustomApp);
