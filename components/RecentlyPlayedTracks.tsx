import React from "react";
import {Box, Text} from "@chakra-ui/react";
import {useQuery} from "react-query";
import {getAudioFeaturesOfMultipleTracks, getRecentlyPlayedTracks} from "../utilities/apiRequest";
import {createTrackListIdString, findAudioFeaturesOfTrack} from "../utilities/helpers";
import {TrackItem} from "./TrackItem";
import {blankAudioFeatures} from "../utilities/defaults";
import {IModalParams} from "../utilities/types";

interface IProps {
    openModal: (modalParams: IModalParams) => void,
}

export const RecentlyPlayedTracks: React.FC<IProps> = ({openModal}) => {

    const recentTracks = useQuery('getRecentTracks', getRecentlyPlayedTracks);

    // obtain audio features of the last played tracks
    let trackIds = '';

    if (recentTracks.data?.items.length) {
        trackIds = createTrackListIdString(recentTracks.data.items);
    }

    const audioFeatures = useQuery(['getAudioFeatures', trackIds],
        () => getAudioFeaturesOfMultipleTracks(trackIds),
        {
            enabled: !!recentTracks.data?.items.length
        })

    if (!recentTracks.data) {
        return <div>Loading...</div>
    }

    const recentTrackHistory = recentTracks.data.items.map((item) => {
        return {
            trackInfo: item,
            audioFeatures: audioFeatures.data ?
                findAudioFeaturesOfTrack(audioFeatures.data.audio_features, item.track.id) :
                blankAudioFeatures
        }
    })

    return (
        <Box>
            <Text mb={'1rem'}>Previously played tracks</Text>
            {recentTrackHistory.map((item, key) => {
                return <TrackItem item={item.trackInfo}
                                  audioFeatures={item.audioFeatures}
                                  openModal={openModal}
                                  key={key}/>
            })}
        </Box>
    )
}

