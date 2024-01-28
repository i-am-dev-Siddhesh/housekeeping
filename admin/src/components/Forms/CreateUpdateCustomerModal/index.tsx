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
import CustomerForm from './Form';
import { ICustomer } from '@/types/global';

interface IProps {
    customer?: ICustomer;
    isOpen: boolean;
    handleCloseModal: () => void
}

const CreateUpdateCustomerModal = ({ customer, isOpen, handleCloseModal }: IProps) => {
    return (
        <>
            <Modal isOpen={isOpen} onClose={handleCloseModal} size="xl">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{customer ? "Update" : "Add"} Customer</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {customer ? <CustomerForm onClose={handleCloseModal} customer={customer} /> : <CustomerForm onClose={handleCloseModal} />}
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

export default CreateUpdateCustomerModal;
