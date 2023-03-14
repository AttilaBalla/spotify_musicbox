import React, {useState} from "react";
import {Box} from "@mui/material";
import {useQuery} from "@tanstack/react-query";
import {getPlaylistItems, getUsersPlaylists} from "../utilities/apiRequest";
import {createAutoCompleteOptions} from "../utilities/helpers";
import {AutoComplete} from "./AutoComplete";
import Grid from '@mui/material/Unstable_Grid2';
import {TrackLister} from "./TrackLister";

export function PlaylistBrowser() {

    const limit = 50;
    const [offset, setOffset] = useState(0);

    const usersPlaylists = useQuery(['usersPlaylists'], getUsersPlaylists);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState<string>('');

    const selectedPlaylist = useQuery(['getPlayListTracks', selectedPlaylistId, limit, offset],
        () => getPlaylistItems(selectedPlaylistId, limit, offset),
        {
            enabled: !!selectedPlaylistId
        })


    return (
        <Box mt={'2rem'}>
            <Grid container spacing={2} mb={'2rem'}>
                <Grid xs={12} md={6}>
                    <AutoComplete
                        onChange={(event, newValue) => {
                            console.log(newValue)
                            setSelectedPlaylistId(newValue.id)
                        }}
                        label={"Select a playlist"}
                        options={createAutoCompleteOptions(usersPlaylists.data?.items)}
                        disabled={false}/>
                </Grid>
                <Grid xs={12} md={6}>
                    <AutoComplete
                        onInputChange={(event, newValue) => {

                        }}
                        label={"Search for a song"}
                        options={[]}
                        disabled={true}/>
                </Grid>
            </Grid>
            {selectedPlaylist.data ? <TrackLister playlist={selectedPlaylist.data}/> : null}
        </Box>
    )
}
