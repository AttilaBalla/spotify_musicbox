import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import LogoutIcon from "@mui/icons-material/Logout";
import {useRouter} from "next/router";

interface IProps {
    displayName: string
}

export function MainHeader(props: IProps) {

    const {displayName} = props;
    const router = useRouter();
    const logout = (): void => {
        localStorage.clear();
        router.push('/');
    }

    return (
        <Box width={'100%'} display={'flex'} justifyContent={'space-between'} mt={'.5rem'}>
            <Stack direction={'row'} spacing={4}>
                <Stack direction={'row'} spacing={1} sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <PersonIcon/>
                    <Typography variant={'subtitle1'}>{displayName}</Typography>
                </Stack>
                <Button startIcon={<SettingsSuggestIcon/>}>
                    Generate Playlist
                </Button>
            </Stack>
            <Button onClick={() => {
                logout();
            }}
                    startIcon={<LogoutIcon/>}>
                Logout
            </Button>
        </Box>
    )
}
