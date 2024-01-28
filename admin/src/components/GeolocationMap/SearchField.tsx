import { ILocationData } from '@/types';
import { DEFAULT_LOCATION } from '@/utils/constant';
import {
    Box,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';

const SearchField = ({ setValue, value }: any) => {
    const [searchedLocations, setSearchedLocations] = useState<ILocationData[]>(
        []
    ); 
    const [selectedLocation, setSelectedLocation] =
        useState<ILocationData | null>();
    const [searchQuery, setSearchQuery] = useState<any>(value.label);

    const handleItemClick = (location: ILocationData) => {
        setSelectedLocation(location);
        const customlocation = {
            lat: location?.y,
            lon: location?.x,
            label: location?.label,
          };
        setValue('location', customlocation);
        setSearchQuery(location.label);
        setSearchedLocations([]);
    };

    const searchLocations = useCallback(async (query: string) => {
        const provider = new OpenStreetMapProvider();
        const results = (await provider.search({ query })) as any;
        setSearchedLocations(results);
    }, []);


    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery && searchQuery !== value.label && searchQuery !== selectedLocation?.label) {
                searchLocations(searchQuery);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    useEffect(() => {
        if (value?.lat) {
            setSearchQuery(value.label)
        }
    }, [value?.lat])

    const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Box position="relative">
            <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                    type="text"
                    value={searchQuery}
                    onChange={onSearch}
                />
                <FormHelperText>Enter location</FormHelperText>
            </FormControl>
            <Flex
                flexDir="column"
                gap="2"
                position="absolute"
                bgColor="whitesmoke"
                zIndex={99999999999999}
            >
                {searchedLocations?.map((location) => (
                    <Box
                        key={location?.raw?.place_id}
                        onClick={() => handleItemClick(location)}
                        cursor="pointer"
                        p={4}
                        borderWidth={1}
                        borderColor="gray.300"
                        borderRadius="md"
                        bg={
                            selectedLocation &&
                                selectedLocation?.raw?.place_id === location?.raw?.place_id
                                ? 'teal.500'
                                : 'white'
                        }
                        color={
                            selectedLocation &&
                                selectedLocation?.raw?.place_id === location?.raw?.place_id
                                ? 'white'
                                : 'black'
                        }
                        _hover={{ bg: 'teal.200' }}
                        mr={2}
                    >
                        {location.label}
                    </Box>
                ))}
            </Flex>
        </Box>
    );
};

export default SearchField;
