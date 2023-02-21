import React, {useState} from "react";
import {Text, Box, Button, Select, VStack} from "@chakra-ui/react";
import {IModalParams, ISpotifyPlaylist} from "../utilities/types";
import {getPlaylistItems, getUsersPlaylists} from "../utilities/apiRequest";
import {TrackLister} from "./TrackLister";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {useQuery} from "@tanstack/react-query";

interface IProps {
    openModal: (modalParams: IModalParams) => void,
}

export const PlaylistBrowser: React.FC<IProps> = ({openModal}) => {

    const limit = 50;
    const [offset, setOffset] = useState(0);

    const usersPlaylists = useQuery(['usersPlaylists'], getUsersPlaylists);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');

    const selectedPlayList = useQuery(['getPlayListTracks', selectedPlaylistId, limit, offset],
        () => getPlaylistItems(selectedPlaylistId, limit, offset),
        {
            enabled: !!selectedPlaylistId
        })

    return (
        <VStack spacing={'1.5rem'}>
            <Select onChange={(event) => {
                setSelectedPlaylistId(event.target.value)
            }} placeholder={'select one of your playlists...'}>
                {usersPlaylists.data?.items.map((item: ISpotifyPlaylist, key: number) => {
                    return (
                        <option key={key} value={item.id}>{item.name}</option>
                    )
                })}
            </Select>
            <Box width={'100%'} display={'flex'} justifyContent={'space-between'}>
                <Button disabled={!selectedPlayList.data || offset === 0} leftIcon={<ChevronLeftIcon/>} onClick={() => {
                    setOffset(offset - limit)
                }}>Previous</Button>
                {selectedPlayList.data &&
                    <Text>
                        {`Showing ${selectedPlayList.data.items.length} tracks, 
                        ${selectedPlayList.data.total} in total`}
                    </Text>
                }
                <Button disabled={!selectedPlayList.data || !selectedPlayList.data.next} rightIcon={<ChevronRightIcon/>}
                        onClick={() => {
                            setOffset(offset + limit);
                        }}>Next</Button>
            </Box>
            {selectedPlayList.data && <TrackLister playListTracks={selectedPlayList.data} openModal={openModal}/>}
        </VStack>
    )
}
