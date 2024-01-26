

import DesktopBar from "./DesktopBar";
import MobileTopBar from "./MobileTopBar";

interface IProps {
  children: React.ReactNode;
}
const BasicLayout = ({ children }: IProps) => {


  return (
    <>
      <DesktopBar>{children}</DesktopBar>
      <MobileTopBar>{children}</MobileTopBar>
    </>
  );
};

export default BasicLayout;
