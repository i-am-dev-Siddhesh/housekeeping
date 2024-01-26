import { selectSingleWorker } from '@/store/selectors/worker';
import { Box } from '@chakra-ui/react';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DataCard } from './DataCard';

const ViewWorker = () => {
    const router = useRouter();
    const params = useParams();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const user = useSelector(selectSingleWorker(Number(params?.id)));

    return (
        <Box p={2} bg="white" color="black">
            <DataCard data={user} />
        </Box>
    );
};

export default ViewWorker;
