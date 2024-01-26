import { ICattle } from '@/types/cattle';
import { Badge, Box, Divider, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';

interface IProps {
    data: ICattle | null;
}
export const DataCard = ({ data }: IProps) => {
    return (
        <Flex flexDir="column" gap={5}>
            {data &&
                Object.entries(data).map(([key, value]) => (
                    <>
                        <Box key={key} display="flex" alignItems="center">
                            <Text
                                fontWeight="bold"
                                color="gray.600"
                                marginRight="2"
                                minW={{ base: '48%', md: '400px' }}
                            >
                                {formatKey(key)}
                            </Text>
                            <Text>{formatValue(value, key)}</Text>
                        </Box>
                        <Divider />
                    </>
                ))}
        </Flex>
    );
};

type Location = {
    label: string;
    place: string;
    state: string;
    country: string;
    latitude: number;
    longitude: number;
};

const formatKey = (key: string): string => {
    return key
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const formatValue = (value: any, key: string) => {
    if (typeof value === 'string') {
        const datePattern = /^\d{4}-\d{2}-\d{2}$/;

        const date = new Date(value);
        const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
        if (datePattern.test(value) || !isNaN(date.getTime())) {
            return date.toLocaleDateString('en-IN', options);
        }
    }
    if (key === 'listing_status') {
        return value === null || value === 'reviewing' ? (
            <Badge colorScheme="linkedin"> In Review</Badge>
        ) : value === 'approved' ? (
            <Badge display="flex" gap="2" alignItems="center" colorScheme="green">
                Approved{' '}
            </Badge>
        ) : value === 'rejected' ? (
            <Badge display="flex" gap="2" alignItems="center" colorScheme="red">
                Rejected{' '}
            </Badge>
        ) : <>NA</>;
    }
    if (key === 'images') {
        return value?.map((image: any, index: number) => (
            <Image
                key={index}
                src={image?.url}
                alt={`Image ${index}`}
                width={200}
                height={150}
            />))
    }
    if (key === 'videos') {
        return value?.map((video: any, index: number) => (
            <video key={index} src={video?.url as string} controls />))
    }

    if (typeof value === 'string' || typeof value === 'number') {
        return value?.toString() ?? '';
    } else if (typeof value === 'object' && value !== null) {
        if (value?.label && value?.place && value?.state && value?.country) {
            // Format location object
            const location: Location = value;
            return `${location?.label}, ${location.place}, ${location.state}, ${location.country}`;
        } else if (value instanceof Date) {
            // Format Date object
            const options: any = { day: 'numeric', month: 'long', year: 'numeric' };
            return value?.toLocaleDateString('en-IN', options);
        } else {
            // Format other objects by converting to JSON string
            return JSON.stringify(value, null, 2);
        }
    }

    return '';
};
