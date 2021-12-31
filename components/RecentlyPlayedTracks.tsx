import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {getAudioFeaturesOfMultipleTracks, getRecentlyPlayedTracks} from "../utilities/apiRequest";
import classes from '../styles/recentlyPlayed.module.css'
import {createTrackListIdString} from "../utilities/helpers";

interface IProps {
    onOpen: () => void,
}

export const RecentlyPlayedTracks: React.FC<IProps> = ({onOpen}) => {

    const recentTracks = useQuery('getRecentTracks', getRecentlyPlayedTracks);
    let trackIds = '';

    if (recentTracks.data?.items.length) {
        trackIds = createTrackListIdString(recentTracks.data.items);
    }

    const audioFeatures = useQuery(['getAudioFeatures', trackIds],
        () => getAudioFeaturesOfMultipleTracks(trackIds),
        {
            enabled: !!recentTracks.data?.items.length
        })

    console.log(audioFeatures.data);

    return (
        <Box onClick={onOpen}>
            <Text mb={'1rem'}>Previously played tracks</Text>
            {recentTracks.data?.items.map((item, key) => {
                return <div className={classes.recentlyPlayedItem} key={key}>
                    <Text sx={{opacity: '100%'}}>{item.track.artists[0].name} - {item.track.name}</Text>
                </div>
            })}
        </Box>
    )
}

