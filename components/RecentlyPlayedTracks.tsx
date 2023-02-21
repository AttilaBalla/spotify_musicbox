import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {getRecentlyPlayedTracks} from "../utilities/apiRequest";
import {IModalParams} from "../utilities/types";
import {TrackLister} from "./TrackLister";
import { useQuery } from "@tanstack/react-query";

interface IProps {
    openModal: (modalParams: IModalParams) => void,
}

export const RecentlyPlayedTracks: React.FC<IProps> = ({openModal}) => {

    const recentTracks = useQuery(['getRecentTracks'], getRecentlyPlayedTracks);

    return (
        <Box>
            {recentTracks.data && <TrackLister playListTracks={recentTracks.data} openModal={openModal}/>}
        </Box>
    )
}

