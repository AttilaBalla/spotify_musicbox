import React from "react";
import {Box, Text} from "@chakra-ui/react";
import classes from "../styles/recentlyPlayed.module.css";
import {IModalParams, ISpotifyAudioFeatures, ISpotifyTrackInfo} from "../utilities/types";
import {convertMsToMinutesSeconds} from "../utilities/helpers";

interface IProps {
    item: ISpotifyTrackInfo,
    audioFeatures: ISpotifyAudioFeatures,
    openModal: (modalParams: IModalParams) => void // callback from useDisclosure that opens modal
}

export const TrackItem: React.FC<IProps> = ({item, audioFeatures, openModal}) => {

    const trackDuration = convertMsToMinutesSeconds(item.track.duration_ms);

    return (
        <Box className={classes.recentlyPlayedItem} onClick={() => {
            openModal({track: item.track, audioFeatures: audioFeatures});
        }}>
            <Text>{item.track.artists[0].name} - {item.track.name}</Text>
            <Box display={'flex'}>
                <Text mr={'2rem'}>{`${Math.floor(trackDuration.minutes)}:${trackDuration.seconds}`}</Text>
                <Text>{Math.round(audioFeatures?.tempo)}</Text>
            </Box>
        </Box>
    )
}