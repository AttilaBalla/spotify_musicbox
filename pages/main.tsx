import React from "react";
import {NextPage} from "next";
import {useRouter} from "next/router";
import {getUserProfile} from "../utilities/apiRequest";
import {useQuery} from "@tanstack/react-query";
import {Box, CircularProgress} from "@mui/material";

import {MainHeader} from "../material/MainHeader";
import {PlaylistBrowser} from "../material/PlaylistBrowser";


const Main: NextPage = () => {

    const router = useRouter();
    const userProfile = useQuery({
        queryKey: ['userProfile'],
        queryFn: getUserProfile
    });

    console.log(userProfile)

    if (userProfile.isLoading) {
        return (
            <Box mt={'2rem'}>
                <CircularProgress/>
            </Box>
        )
    }

    if (userProfile.data === null || userProfile.isError) {
        router.push('/')
        return null
    }

    return (
        <>
            <MainHeader displayName={userProfile.data.display_name}/>
            <PlaylistBrowser/>
        </>

    )
}

export default Main;
