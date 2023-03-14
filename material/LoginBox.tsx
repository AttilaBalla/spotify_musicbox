import {Box, Button, Paper, Stack, Typography} from "@mui/material";
import {FaSpotify} from "react-icons/fa";
import { FiBox } from "react-icons/fi";

interface IProps {
    authenticate: () => void
}

export function LoginBox(props: IProps) {

    const {authenticate} = props;

    return (
        <Box sx={{
            marginTop: '5rem',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <Paper elevation={2} sx={{
                padding: '3rem',
            }}>
                <Stack spacing={3} sx={{
                    display: 'flex',
                    alignItems: 'center'
                }}>
                    <Stack direction={'row'} spacing={2} sx={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                        <FiBox size={40}/>
                        <Typography variant={'h5'}>Spotify Musicbox</Typography>
                    </Stack>
                    <Typography variant={'body2'}> I will figure out some fancy intro for the app here</Typography>
                    <Button
                        variant="contained"
                        startIcon={<FaSpotify/>}
                        onClick={authenticate}
                    >
                        Login with Spotify
                    </Button>
                </Stack>
            </Paper>
        </Box>
    )
}
