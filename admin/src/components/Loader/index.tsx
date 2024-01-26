import React from "react";
import { Modal, ModalBody, ModalContent, ModalOverlay, Spinner, Text } from "@chakra-ui/react";

const FullScreenLoader = () => {
    return (
        <Modal isOpen={true} onClose={() => { }} isCentered size="xs">
            <ModalOverlay />
            <ModalContent>
                <ModalBody display="flex" flexDirection="column"gap={5} my='10' mx='5' alignItems="center" justifyContent="center">
                    <Spinner size="lg" />
                    <Text fontSize="3xl">Loading...</Text>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default FullScreenLoader;
