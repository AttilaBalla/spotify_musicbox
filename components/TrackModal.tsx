import React from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";
import {IModalParams} from "../utilities/types";
import {Stat, StatLabel, StatNumber} from "@chakra-ui/stat";
import {Box, Divider, Tooltip} from "@chakra-ui/react";
import {audioFeatureHelperTexts} from "../utilities/defaults";

interface IProps {
    trackInfo: IModalParams | undefined,
    isOpen: boolean,
    onClose: () => void,
}

export const TrackModal: React.FC<IProps> = ({trackInfo, isOpen, onClose}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>{`${trackInfo?.track.artists[0].name} - ${trackInfo?.track.name}`}</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    {trackInfo && <Box>
                        <Tooltip
                            label={audioFeatureHelperTexts.tempo}>
                            <Stat>
                                <StatLabel>BPM</StatLabel>
                                <StatNumber>{trackInfo?.audioFeatures.tempo}</StatNumber>
                            </Stat>
                        </Tooltip>
                        <Divider my={'.75rem'}/>
                        <Tooltip
                            label={audioFeatureHelperTexts.danceability}>
                            <Stat>
                                <StatLabel>Danceability</StatLabel>
                                <StatNumber>{`${Math.round(trackInfo.audioFeatures.danceability * 100)}%`}</StatNumber>
                            </Stat>
                        </Tooltip>
                        <Divider my={'.75rem'}/>
                        <Tooltip
                            label={audioFeatureHelperTexts.energy}>
                            <Stat>
                                <StatLabel>Energy</StatLabel>
                                <StatNumber>{`${Math.round(trackInfo?.audioFeatures.energy * 100)}%`}</StatNumber>
                            </Stat>
                        </Tooltip>
                        <Divider my={'.75rem'}/>
                        <Tooltip
                            label={audioFeatureHelperTexts.acousticness}>
                            <Stat>
                                <StatLabel>Acousticness</StatLabel>
                                <StatNumber>{`${Math.round(trackInfo?.audioFeatures.acousticness * 100)}%`}</StatNumber>
                            </Stat>
                        </Tooltip>
                        <Divider my={'.75rem'}/>
                        <Tooltip
                            label={audioFeatureHelperTexts.valence}>
                            <Stat>
                                <StatLabel>Valence</StatLabel>
                                <StatNumber>{`${Math.round(trackInfo?.audioFeatures.valence * 100)}%`}</StatNumber>
                            </Stat>
                        </Tooltip>
                    </Box>}
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}