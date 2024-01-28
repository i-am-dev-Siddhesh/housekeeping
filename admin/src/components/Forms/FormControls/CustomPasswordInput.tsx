import React, { useState } from 'react';
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    Input,
    InputGroup,
    InputRightElement,
    Checkbox,
    Box,
    IconButton,
} from '@chakra-ui/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

interface IProps {
    label: string;
    register: any;
    helperText?: string;
    error: string;
    name: string;
    placeholder?: string;
}

const CustomPasswordInput = ({
    label,
    register,
    helperText,
    error,
    name,
    placeholder,
}: IProps) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <>
            <FormControl isInvalid={error ? true : false}>
                <FormLabel color="black">{label}</FormLabel>
                <InputGroup>
                    <Input
                        color="black"
                        {...register(name)}
                        type={showPassword ? 'text' : 'password'}
                        placeholder={placeholder}
                    />
                    <InputRightElement width="4.5rem">
                        <IconButton
                            aria-label='password-eye-button'
                            h="1.75rem"
                            size="sm"
                            onClick={togglePasswordVisibility}
                            icon={showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        />
                    </InputRightElement>
                </InputGroup>
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
        </>
    );
};

export default CustomPasswordInput;
