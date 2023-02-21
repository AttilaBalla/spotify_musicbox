import {NextPage} from "next";
import React, {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {getUserProfile} from "../utilities/apiRequest";
import {RecentlyPlayedTracks} from "../components/RecentlyPlayedTracks";
import {constructAuthorizationUrl} from "../utilities/helpers";
import {PlaylistBrowser} from "../components/PlaylistBrowser";
import {TrackModal} from "../components/TrackModal";
import {IModalParams} from "../utilities/types";
import {MusicPlayer} from "../components/MusicPlayer";
import {MdLogout} from "react-icons/md";
import {useQuery} from "@tanstack/react-query";
import {Alert, Box, Button, Container, Stack, Typography} from "@mui/material";
import {useDisclosure} from "@chakra-ui/hooks";
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import {MainHeader} from "../material/MainHeader";


const Main: NextPage = () => {

    const router = useRouter();
    const [modalTrackInfo, setModalTrackInfo] = useState<IModalParams>();
    const userProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: getUserProfile
    });
    const {isOpen, onOpen, onClose} = useDisclosure();

    const logout = (): void => {
        localStorage.clear();
        router.push('/');
    }

    const openModal = (modalParams: IModalParams): void => {
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
                Loading spinner here
            </Container>
        )
    }

    if (userProfile.isError) {
        return (
            <Container>
                <Alert severity={'error'}>
                    Your session has expired, please login again.
                </Alert>
            </Container>
        )
    }

    return (
        <Box>
            <Box sx={{maxWidth: '1300px', marginTop: '1rem'}}>
                <MainHeader displayName={userProfile.data.display_name}/>
                {/*<Box mt={'2rem'} display={{md: 'flex'}}>*/}
                {/*    <Box width={['100%', '100%', '50%']} padding={'1rem'}>*/}
                {/*        <PlaylistBrowser openModal={openModal}/>*/}
                {/*    </Box>*/}
                {/*    <Box width={['100%', '100%', '50%']} padding={'1rem'}>*/}
                {/*        <MusicPlayer/>*/}
                {/*        <RecentlyPlayedTracks openModal={openModal}/>*/}
                {/*    </Box>*/}
                {/*</Box>*/}
                {/*<TrackModal isOpen={isOpen} onClose={onClose} trackInfo={modalTrackInfo}/>*/}
            </Box>
        </Box>
    )
}

export default Main;
