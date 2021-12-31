import React from "react";
import {Alert, AlertIcon, Select, useDisclosure, VStack} from "@chakra-ui/react";
import {ISpotifyPlaylist} from "../utilities/types";
import {useQuery} from "react-query";
import {getUsersPlaylists} from "../utilities/apiRequest";

export const PlaylistBrowser: React.FC = () => {

    const usersPlaylists = useQuery('usersPlaylists', getUsersPlaylists);

    return (
        <VStack spacing={'1.5rem'}>
            <Alert status={'info'} mb={'1rem'}>
                <AlertIcon/>
                {'Select a playlist to display it\'s tracks. You can get detailed information about a track by clicking on it in the list'}
            </Alert>
            <Select placeholder={'select one of your playlists...'}>
                {usersPlaylists.data?.items.map((item: ISpotifyPlaylist, key: number) => {
                    return (
                        <option key={key} value={item.id}>{item.name}</option>
                    )
                })}
            </Select>
        </VStack>
    )
}