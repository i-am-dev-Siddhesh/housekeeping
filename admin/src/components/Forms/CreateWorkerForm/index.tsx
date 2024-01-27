import WorkerService from '@/services/Worker';
import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
} from '@chakra-ui/react';
import { useState } from 'react';
import AddWorkerForm from './Form';

const CreateWorkerModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

   

    return (
        <>
            <Button onClick={handleOpenModal}>Add Worker</Button>

            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Worker</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <AddWorkerForm onClose={handleCloseModal}  />
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default CreateWorkerModal;
