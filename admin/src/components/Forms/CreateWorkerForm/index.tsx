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
import WorkerService from '@/services/Worker';

const CreateWorkerModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFormSubmit = async (data: any) => {
        try {

            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof FileList) {
                    // If it's a FileList (which is the type for file inputs), append each file
                    for (let i = 0; i < value.length; i++) {
                        formData.append(key, value[i]);
                    }
                } else {
                    // For regular form fields
                    formData.append(key, value);
                }
            });

            await WorkerService.createWorker(formData)
        }
        catch (error) {
            console.log('errr,e', error);

        }
    };

    return (
        <>
            {/* Trigger button to open the modal */}
            <Button onClick={handleOpenModal}>Add Worker</Button>

            {/* Modal */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Add Worker</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {/* Include the AddWorkerForm component */}
                        <AddWorkerForm onSubmit={handleFormSubmit} isSubmitting={false} />
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
