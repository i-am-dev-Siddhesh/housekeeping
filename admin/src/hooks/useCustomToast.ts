import { useToast } from "@chakra-ui/react";

export const useCustomToast = () => {
  const toast = useToast();
  const toastAlert = (
    title: string,
    message: string,
    status: "success" | "warning" | "error" | "info"
  ) => {
    toast({
      title: title,
      description: message,
      status,
      duration: 7000,
      isClosable: true,
    });
  };

  return { toastAlert };
};
