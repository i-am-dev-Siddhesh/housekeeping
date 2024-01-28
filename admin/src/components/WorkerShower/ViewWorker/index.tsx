import { DataCard } from '@/components/DataCard';
import { selectSingleWorker } from '@/store/selectors/worker';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const ViewWorker = () => {
     const params = useParams();
      const user = useSelector(selectSingleWorker(Number(params?.id)));

    return (
        <Box p={2} bg="white" color="black">
            <DataCard data={user} />
        </Box>
    );
};

export default ViewWorker;
