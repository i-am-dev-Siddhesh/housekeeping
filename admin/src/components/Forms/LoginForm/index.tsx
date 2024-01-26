import { useYupValidationResolver } from "@/utils/helpers";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import CustomInput from "../FormControls";

const LoginForm = ({ onSubmit, isSubmitting }: any) => {
  const validationSchema = yup.object({
    email: yup.string().email("Enter email").required("Required"),
    password: yup.string().required("Required"),
  });

  const resolver = useYupValidationResolver(validationSchema);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver });

  return (
    <Flex
      gap={5}
      bg="ButtonShadow"
      minH="100vh"
      overflowY="scroll"
      overflowX="scroll"
      alignItems="center"
      as="form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(onSubmit)()
      }
      }
    >
      <Flex
        gap={5}
        flexDir="column"
        w={{ base: "100%", md: "50rem" }}
        mx={{ base: "10px", md: "auto" }}
        px={{ base: "20px", md: "80px" }}
        py={{ base: "10px", md: "40px" }}
        bg="#ffffff"
        borderRadius="10"
      >
        <Heading textAlign="center" color="black">Login to dashboard</Heading>
        <CustomInput
          register={register}
          error={(errors["email"]?.message as string) || ""}
          type="email"
          helperText="Enter email here"
          label="Email"
          name="email"
        />
        <CustomInput
          register={register}
          error={(errors["password"]?.message as string) || ""}
          type="password"
          helperText="Enter password here"
          label="Password"
          name="password"
        />
        <Button colorScheme="green" type="submit" isLoading={isSubmitting}>
          Submit
        </Button>
      </Flex>
    </Flex >
  );
};

export default LoginForm;
