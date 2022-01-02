import React from "react";
import {Box, Text} from "@chakra-ui/react";
import classes from "../styles/recentlyPlayed.module.css";
import {IModalParams, ISpotifyAudioFeatures, ISpotifyTrackInfo} from "../utilities/types";

interface IProps {
    item: ISpotifyTrackInfo,
    audioFeatures: ISpotifyAudioFeatures,
    openModal: (modalParams: IModalParams) => void // callback from useDisclosure that opens modal
}

export const TrackItem: React.FC<IProps> = ({item, audioFeatures, openModal}) => {

    return (
        <Box className={classes.recentlyPlayedItem} onClick={() => {
            openModal({track: item.track, audioFeatures: audioFeatures});
        }}>
            <Text>{item.track.artists[0].name} - {item.track.name}</Text>
            <Text>{Math.round(audioFeatures.tempo)}</Text>
        </Box>
    )
}