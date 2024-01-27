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
import WorkerForm from './Form';

const CreateUpdateWorkerModal = ({ worker, isOpen, handleCloseModal }: { worker?: any, isOpen: boolean, handleCloseModal: () => void }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Worker</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <WorkerForm onClose={handleCloseModal} worker={worker} />
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

export default CreateUpdateWorkerModal;
