import * as React from 'react';
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress} from '@mui/material';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {ISpotifyPlaylistInfo, ISpotifyTrackInfo} from "../utilities/types";
import {createTrackListIdString, findAudioFeaturesOfTrack} from "../utilities/helpers";
import {getAudioFeaturesOfMultipleTracks} from "../utilities/apiRequest";
import {audioFeatureHelperTexts, blankAudioFeatures} from "../utilities/defaults";


const columns: GridColDef[] = [
    {field: 'name', headerName: 'name', width: 350},
    {
        field: 'tempo',
        headerName: 'BPM',
        type: 'number',
        description: audioFeatureHelperTexts.tempo,
        width: 90,
        editable: true,
    },
    {
        field: 'danceability',
        headerName: 'Danceabiltiy',
        type: 'number',
        description: audioFeatureHelperTexts.danceability,
        width: 150,
        editable: true,
    },
    {
        field: 'energy',
        headerName: 'Energy',
        type: 'number',
        description: audioFeatureHelperTexts.energy,
        width: 150,
        editable: true,
    },
    {
        field: 'acousticness',
        headerName: 'Acousticness',
        type: 'number',
        description: audioFeatureHelperTexts.acousticness,
        width: 150,
        editable: true,
    },
    {
        field: 'valence',
        headerName: 'Valence',
        type: 'number',
        description: audioFeatureHelperTexts.valence,
        width: 150,
        editable: true,
    },
];

interface IProps {
    playlist: ISpotifyPlaylistInfo<ISpotifyTrackInfo[]>
}

export function TrackLister(props: IProps) {

    const {playlist} = props;

    // obtain audio features of the last played tracks
    let trackIds = '';

    if (playlist.items.length) {
        trackIds = createTrackListIdString(playlist.items);
    }

    // do this for the whole playlist using useQueries
    const audioFeatures = useQuery(['getAudioFeatures', trackIds],
        () => getAudioFeaturesOfMultipleTracks(trackIds),
        {
            enabled: !!playlist.items.length
        })


    if (audioFeatures.isLoading) {
        return (
            <Box sx={{display: 'flex', justifyContent: 'center'}}>
                <CircularProgress/>
            </Box>
        )
    }

    const trackList = playlist.items.map((item) => {

        const trackAudioFeatures = audioFeatures.data ? findAudioFeaturesOfTrack(audioFeatures.data.audio_features, item.track.id) :
            blankAudioFeatures
        return {
            id: item.track.id,
            name: `${item.track.artists[0].name} - ${item.track.name}`,
            tempo: Math.round(trackAudioFeatures.tempo),
            danceability: Math.round(trackAudioFeatures.danceability * 100),
            energy: Math.round(trackAudioFeatures.energy * 100),
            acousticness: Math.round(trackAudioFeatures.acousticness * 100),
            valence: Math.round(trackAudioFeatures.valence * 100),
        }
    })

    return (
        <Box sx={{height: 700, width: '100%'}}>
            <DataGrid
                rows={trackList}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 20,
                        },
                    },
                }}
                pageSizeOptions={[10, 20, 50]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </Box>
    );
}
