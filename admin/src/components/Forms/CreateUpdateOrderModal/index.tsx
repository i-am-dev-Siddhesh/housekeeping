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
import OrderForm from './Form';

const CreateUpdateOrderModal = ({ order, isOpen, handleCloseModal }: { order?: any, isOpen: boolean, handleCloseModal: () => void }) => {

    return (
        <>
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{order ? "Update" : "Add"} Order</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <OrderForm onClose={handleCloseModal} order={order} />
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

export default CreateUpdateOrderModal;
