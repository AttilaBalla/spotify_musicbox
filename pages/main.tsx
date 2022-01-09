import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getUserProfile} from "../utilities/apiRequest";
import {Container, Heading, Text, Box, Button, AlertIcon, Alert, useDisclosure} from "@chakra-ui/react";
import {ArrowRightIcon} from "@chakra-ui/icons";
import {RecentlyPlayedTracks} from "../components/RecentlyPlayedTracks";
import {constructAuthorizationUrl} from "../utilities/helpers";
import {PlaylistBrowser} from "../components/PlaylistBrowser";
import {TrackModal} from "../components/TrackModal";
import {IModalParams} from "../utilities/types";

const Main: NextPage = () => {

    const router = useRouter();
    const [modalTrackInfo, setModalTrackInfo] = useState<IModalParams>();
    const userProfile = useQuery('userProfile', getUserProfile);
    const {isOpen, onOpen, onClose} = useDisclosure();

    const logout = (): void => {
        localStorage.clear();
        router.push('/');
    }

    const openModal = (modalParams: IModalParams): void => {
        console.log(modalParams);
        setModalTrackInfo(modalParams);
        onOpen();
    }

    // have to put this into useEffect, there is no browser API support on server side
    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            router.push('/');
        }
    }, [router]);

    if (userProfile.isLoading) {
        return (
            <Container>
                <Text>Loading...</Text>
            </Container>
        )
    }

    if (userProfile.isError) {
        return (
            <Container mt={'1.5rem'}>
                <Alert status='info'>
                    <AlertIcon/>
                    Your session has expired, please login again.
                </Alert>
                <Button m={'1rem'} colorScheme={'teal'} size={'md'}
                        onClick={() => {
                            router.push(constructAuthorizationUrl());
                        }}>
                    Login with Spotify
                </Button>
            </Container>
        )
    }

    return (
        <Box display={'flex'} justifyContent={'center'}>
            <Box margin={['.75rem', '1.5rem', '3rem']} sx={{maxWidth: '1300px'}}>
                <Box width={'100%'} display={"flex"} justifyContent={'space-between'}>
                    <Heading>Hi {userProfile.data?.display_name}!</Heading>
                    <Button onClick={() => {
                        logout();
                    }}
                            rightIcon={<ArrowRightIcon/>}>
                        Logout
                    </Button>
                </Box>
                <Box mt={'2rem'} display={{md: 'flex'}}>
                    <Box width={['100%', '100%', '50%']} padding={'1rem'}>
                        <PlaylistBrowser openModal={openModal}/>
                    </Box>
                    <Box width={['100%', '100%', '50%']} padding={'1rem'}>
                        <RecentlyPlayedTracks openModal={openModal}/>
                    </Box>
                </Box>
                <TrackModal isOpen={isOpen} onClose={onClose} trackInfo={modalTrackInfo}/>
            </Box>
        </Box>
    )
}

export default Main;