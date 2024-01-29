import { DataCard } from '@/components/DataCard';
import { selectSingleOrder } from '@/store/selectors/order';
import { Box } from '@chakra-ui/react';
import { useParams } from 'next/navigation';
import { useSelector } from 'react-redux';

const ViewOrder = () => {
     const params = useParams();
      const data = useSelector(selectSingleOrder(Number(params?.id)));

    return (
        <Box p={2} bg="white" color="black">
            <DataCard data={data} />
        </Box>
    );
};

export default ViewOrder;
