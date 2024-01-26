import { RootState } from "@/store";
import { Avatar, Flex, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const AdminProfile = () => {
  const admin = useSelector((state: RootState) => state.admin.admin);  
  return (
    <Flex align="center" justify="flex-start" gap="5px">
      <Avatar
        name={
          admin?.first_name && admin?.last_name
            ? `${admin?.first_name || ""} ${admin?.last_name || ""}`
            : "Admin"
        }
        size="md"
        alignSelf="self-start"
      />
      <Text
        fontWeight="bold"
        color="gray.700"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        {admin?.email}
      </Text>
    </Flex>
  );
};

export default AdminProfile;
