import type {NextPage} from 'next'
import {Box, Button, Container, Heading} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {constructAuthorizationUrl, parseHashParamsFromUrl} from "../utilities/helpers";


const Home: NextPage = () => {

    const router = useRouter();

    const authenticate = () => {
        router.push(constructAuthorizationUrl());
    }

    if(router.asPath.includes('access_token')) {
        localStorage.setItem('accessToken', parseHashParamsFromUrl(router.asPath).accessToken);
        router.push('/main');
    }

    return (
        <Container mt={'3rem'}>
            <Box display={'flex'} alignItems={'center'} flexDir={'column'} borderWidth={'1px'} borderRadius={'lg'}>
                <Heading m={'1rem'}>Spotify Music box</Heading>
                <Button onClick={authenticate} m={'1rem'} colorScheme={'teal'} size={'md'}>Login with Spotify</Button>
            </Box>
        </Container>
    )
}

export default Home
