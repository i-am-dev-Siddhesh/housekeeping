import { staticSlotData } from '@/utils/constant';
import { Box, Flex, FormControl, FormLabel, FormErrorMessage, FormHelperText, Text } from '@chakra-ui/react';
import React from 'react';

interface IProps {
    setValue: any;
    value: any;
    helperText: string;
    error: string
    label: string
}
const SlotSelection = ({ setValue, value, helperText, error, label }: IProps) => {
    console.log('value', value);

    const updateSlots = (slot: number, isSelected: boolean) => {
        const updatedSlots = isSelected
            ? value?.filter((item: number) => item !== slot) // Remove the slot if it already exists
            : [...value, slot]; // Add the slot if it doesn't exist

        setValue("slots", updatedSlots);
    };


    return (
        <Box>
            <FormControl isInvalid={error ? true : false}>
                <FormLabel color="black">{label}</FormLabel>
                <Flex flexWrap="wrap" gap={2} justify="space-between">
                    {staticSlotData.map((slot) => {
                        const isSelected = value?.includes(slot.value)
                        return <Flex cursor="pointer" width="200px" onClick={() => updateSlots(slot.value, isSelected)} gap={2} bg={!isSelected ? "black" : "green"} px="5" py="1" borderRadius="10px" display="inline-flex" color="whitesmoke" fontWeight="bold">
                            <Text color="whitesmoke" fontWeight="bold" >{slot.label}</Text>
                        </Flex>
                    })}

                </Flex>
                {error ? (
                    <FormErrorMessage color="red">{error}</FormErrorMessage>
                ) : (
                    helperText && (
                        <FormHelperText fontWeight="500" color="gray.500">
                            {helperText}
                        </FormHelperText>
                    )
                )}
            </FormControl>
        </Box>
    );
};

export default SlotSelection;
