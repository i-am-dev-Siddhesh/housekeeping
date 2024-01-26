import { Box } from "@chakra-ui/react";
import styles from "./index.module.css";
import Sidebar from "../Sidebar";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
}
const DesktopBar = ({ children }: IProps) => {
  return (
    <Box className={styles.desktop}>
      <Sidebar>{children}</Sidebar>
    </Box>
  );
};

export default DesktopBar;
