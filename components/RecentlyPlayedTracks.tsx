import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {getRecentlyPlayedTracks} from "../utilities/apiRequest";
import {IModalParams} from "../utilities/types";
import {TrackLister} from "./TrackLister";

interface IProps {
    openModal: (modalParams: IModalParams) => void,
}

export const RecentlyPlayedTracks: React.FC<IProps> = ({openModal}) => {

    const recentTracks = useQuery('getRecentTracks', getRecentlyPlayedTracks);

    return (
        <Box>
            <Text mb={'1rem'}>Previously played tracks</Text>
            {recentTracks.data && <TrackLister playListTracks={recentTracks.data} openModal={openModal}/>}
        </Box>
    )
}

