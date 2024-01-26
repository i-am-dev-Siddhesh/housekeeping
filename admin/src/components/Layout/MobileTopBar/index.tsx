import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Sidebar from "../Sidebar";
import styles from "./index.module.css";

interface IProps {
  children: ReactNode;
}
const MobileTopBar = ({ children }: IProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box className={styles.mobile}>
      <Flex bg="gray.800" padding="5">
        <GiHamburgerMenu color="#ffffff" size="20" onClick={onOpen} />
      </Flex>
      <Box m='5'>{children}</Box>
      <MobileDrawer isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default MobileTopBar;

interface IMobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileDrawer = ({ isOpen, onClose }: IMobileDrawerProps) => {
  return (
    <Drawer isOpen={isOpen} size="xs" placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Sidebar onClose={onClose} />
      </DrawerContent>
    </Drawer>
  );
};
