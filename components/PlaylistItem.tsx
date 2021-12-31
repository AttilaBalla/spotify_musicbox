import React from 'react';
import {Box, Text} from '@chakra-ui/react';

interface IPlayListItem {
    name: string,
    numberOfTracks: number
    playlistId: string,
}

export const PlaylistItem: React.FC<IPlayListItem> = ({name, numberOfTracks, playlistId}): JSX.Element => {

    return (
        <Box borderWidth={'1px'}
             borderRadius={'lg'}
             display={'flex'}
             alignItems={'center'}
             justifyContent={'space-between'}
             width={'100%'}
             m={'1rem'}
             p={'1rem'}
             sx={{cursor: 'pointer'}}>
            <Box sx={{flexBasis: '80%'}}>
                <Text fontSize={'xl'}>{name}</Text>
            </Box>
            <Box>
                <Text as={'sub'}>{numberOfTracks} tracks</Text>
            </Box>
        </Box>
    )
}