import {
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Select,
} from "@chakra-ui/react";

interface IProps {
  label: string;
  type: string;
  register: any;
  helperText: string;
  error: string;
  name: string;
  onChange?: any;
  options: { label: string | number; value: string | number }[];
  placeholder: string;
}

const CustomSelect = ({
  label,
  type,
  register,
  helperText,
  error,
  name,
  options,
  placeholder,
}: IProps) => {
  return (
    <FormControl isInvalid={error ? true : false}>
      <FormLabel>{label}</FormLabel>

      <Select placeholder={placeholder} {...register(name)} type={type}>
        {options?.map((option) => (
          <option value={option.value} key={option.value}>
            {option.label}
          </option>
        ))}
      </Select>

      {error ? (
        <FormErrorMessage color="red">{error}</FormErrorMessage>
      ) : (
        <FormHelperText fontWeight="500" color="gray.500">
          {helperText}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomSelect;
