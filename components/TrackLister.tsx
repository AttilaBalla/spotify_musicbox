import React from "react";
import {TrackItem} from "./TrackItem";
import {Box, Spinner} from "@chakra-ui/react";
import {getAudioFeaturesOfMultipleTracks} from "../utilities/apiRequest";
import {createTrackListIdString, findAudioFeaturesOfTrack} from "../utilities/helpers";
import {blankAudioFeatures} from "../utilities/defaults";
import {IModalParams, ISpotifyPlaylistInfo, ISpotifyRecentTracks, ISpotifyTrackInfo} from "../utilities/types";
import {useQuery} from "@tanstack/react-query";

interface IProps {
    playListTracks: ISpotifyPlaylistInfo<ISpotifyTrackInfo> | ISpotifyRecentTracks,
    openModal: (modalParams: IModalParams) => void,
}

export const TrackLister: React.FC<IProps> = ({playListTracks, openModal}) => {

    // obtain audio features of the last played tracks
    let trackIds = '';

    if (playListTracks.items.length) {
        trackIds = createTrackListIdString(playListTracks.items);
    }

    const audioFeatures = useQuery(['getAudioFeatures', trackIds],
        () => getAudioFeaturesOfMultipleTracks(trackIds),
        {
            enabled: !!playListTracks.items.length
        })

    if (audioFeatures.isLoading) {
        return <Spinner color='blue.500' />
    }

    const trackList = playListTracks.items.map((item) => {
        return {
            trackInfo: item,
            audioFeatures: audioFeatures.data ?
                findAudioFeaturesOfTrack(audioFeatures.data.audio_features, item.track.id) :
                blankAudioFeatures
        }
    })

    return (
        <Box width={'100%'}>
            {trackList.map((item, key) => {
                return <TrackItem item={item.trackInfo}
                                  audioFeatures={item.audioFeatures}
                                  openModal={openModal}
                                  key={key}/>
            })}
        </Box>
    )
}
