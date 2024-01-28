import { DataCard } from '@/components/DataCard';
import { selectSingleCustomer } from '@/store/selectors/customer';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const ViewCustomer = () => {
    const params = useParams();
    const data = useSelector(selectSingleCustomer(Number(params?.id)));

    return (
        <Box p={2} bg="white" color="black">
            <DataCard data={data} />
        </Box>
    );
};

export default ViewCustomer;
