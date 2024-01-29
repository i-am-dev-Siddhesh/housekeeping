import { Box, Button } from '@chakra-ui/react';
import { useState } from 'react';
import { GrUserWorker } from 'react-icons/gr';
import CreateUpdateOrderModal from '../Forms/CreateUpdateOrderModal';

const CreateOrder = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleCloseModal = () => {
    setIsOpen(false);
  };
  const handleOpenModal = () => {
    setIsOpen(true);
  };
  return (
    <>
      <Button
        colorScheme="green"
        variant="outline"
        justifyContent="flex-start"
        textAlign="start"
        onClick={handleOpenModal}
        gap={3}
      >
        <Box style={{ width: '20px' }}>
          <GrUserWorker />
        </Box>
        <Box flex="1">Create Order</Box>
      </Button>

      <CreateUpdateOrderModal
        handleCloseModal={handleCloseModal}
        isOpen={isOpen}
      />
    </>
  );
};

export default CreateOrder;
