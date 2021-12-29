import {NextPage} from "next";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {useQuery} from "react-query";
import {getUserProfile, getUsersPlaylists} from "../utilities/apiRequest";
import {IApiError, ISpotifyPlaylist, ISpotifyPlaylistInfo, ISpotifyUser} from "../utilities/types";
import {Container, Heading, Text, Box, Button} from "@chakra-ui/react";
import {PlaylistItem} from "../components/PlaylistItem";
import {ArrowRightIcon} from "@chakra-ui/icons";
import styles from '../styles/Home.module.css';

const Main: NextPage = () => {

    const router = useRouter();
    const userProfile = useQuery('userProfile', getUserProfile)
    const usersPlaylists = useQuery('usersPlaylists', getUsersPlaylists);

    const logout = (): void => {
        localStorage.clear();
        router.push('/');
    }

    // have to put this into useEffect, there is no browser API support on server side
    useEffect(() => {
        if (localStorage.getItem('accessToken') === null) {
            router.push('/');
        }
    }, []);

    if (userProfile.isLoading) {
        return (
            <Container>
                <Text>Loading...</Text>
            </Container>
        )
    }

    console.log(usersPlaylists);

    return (
        <Container mt={'1.5rem'} position={'relative'}>
            <Button onClick={() => {
                logout();
            }}
                    position={'absolute'}
                    right={'5'}
                    rightIcon={<ArrowRightIcon/>}>
                Logout
            </Button>
            <Heading>Hi {userProfile.data?.display_name}!</Heading>
            <Text mt={'1rem'}>Please select one of your playlists from the list below:</Text>
            <Box display={'flex'} alignItems={'center'} flexDir={'column'}>
                {usersPlaylists.data?.items.map((item: ISpotifyPlaylist, key: number) => {
                    return (
                        <PlaylistItem key={key}
                                      name={item.name}
                                      numberOfTracks={item.tracks.total}
                                      playlistId={item.id}/>
                    )
                })}
            </Box>
        </Container>
    )
}

export default Main;