import { useState } from 'react'
import CreateUpdateWorkerModal from '../Forms/CreateUpdateWorkerModal'
import { Box, Button, Text } from '@chakra-ui/react'
import { FaRegUser } from 'react-icons/fa'

const CreateWorker = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleCloseModal = () => {
        setIsOpen(false)
    }
    const handleOpenModal = () => {
        setIsOpen(true)
    }
    return (
        <>
            <Button colorScheme="green" variant="outline" justifyContent="flex-start" textAlign="start" onClick={handleOpenModal} gap={3}>
                <Box w='20px' >
                    <FaRegUser />
                </Box>
                <Box flex="1" >Create Worker</Box>
            </Button>
            <CreateUpdateWorkerModal handleCloseModal={handleCloseModal} isOpen={isOpen} />
        </>
    )
}

export default CreateWorker