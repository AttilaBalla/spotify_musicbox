import React from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";

interface IProps {
    isOpen: boolean,
    onClose: () => void,
}

export const TrackModal: React.FC<IProps> = ({isOpen, onClose}) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        Some track info here
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}