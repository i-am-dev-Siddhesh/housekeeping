import AdminProfile from '@/components/Common/AdminProfile';
import { useCustomToast } from '@/hooks/useCustomToast';
import AuthService from '@/services/Auth';
import {
  BoxProps,
  Button,
  Flex,
  FlexProps,
  Icon,
  IconButton,
  Link,
  useColorModeValue,
} from '@chakra-ui/react';
import Image from 'next/image';
import NextLink from 'next/link';
import NextRouter from 'next/router';
import { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import { BiLogOut } from 'react-icons/bi';
import CattlemartLogo from '../../../../public/cattlemart-logo.png';
import CreateUpdateWorkerModal from '@/components/Forms/CreateUpdateWorkerModal';
import CreateCustomer from '@/components/Buttons/CreateCustomer';
import CreateWorker from '@/components/Buttons/CreateWorker';
import { FaHouseUser, FaUserAstronaut } from 'react-icons/fa';
import CreateOrder from '@/components/Buttons/CreateOrder';

export default function SimpleSidebar({
  children,
  onClose,
}: {
  children?: ReactNode;
  onClose?: () => void;
}) {
  return (
    <Flex
      minH="100vh"
      flexDir="column"
      bg={useColorModeValue('gray.100', 'gray.900')}
      w="100%"
    >
      <SidebarContent onClose={onClose} />
      <Flex ml={{ base: 0, md: 60 }} p="4" flexDir="column" flex={1}>
        {children}
      </Flex>
    </Flex>
  );
}

interface SidebarProps extends BoxProps {
  onClose?: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  const { toastAlert } = useCustomToast();

  const handleLogout = async () => {
    try {
      await AuthService.logoutUser();
      toastAlert('Success', 'Logged out', 'success');
      NextRouter.push('/signin');
      return;
    } catch (error) {
      toastAlert('Error', 'Something went wrong', 'error');
      return;
    }
  };

  return (
    <Flex
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
      overflowX="hidden"
      flexDir="column"
    >
      <Flex
        mt="10"
        flexDir="column"
        gap={2}
        justifyContent="flex-start"
        mx="5"
        alignItems="space-between"
      >
        <NextLink href="/">
          <Image
            style={{ scale: 1.3 }}
            src={CattlemartLogo}
            width={600}
            height={50}
            alt="Logo"
          />
        </NextLink>
        <NextLink href="/customers">
          <Button
            colorScheme="facebook"
            justifyContent="flex-start"
            width="100%"
            gap={3}
          >
            <FaHouseUser /> Customers
          </Button>
        </NextLink>
        <NextLink href="/workers">
          <Button
            colorScheme="facebook"
            justifyContent="flex-start"
            width="100%"
            gap={3}
          >
            <FaUserAstronaut />
            Workers
          </Button>
        </NextLink>
        <NextLink href="/orders">
          <Button
            colorScheme="facebook"
            justifyContent="flex-start"
            width="100%"
            gap={3}
          >
            <FaUserAstronaut />
            Orders
          </Button>
        </NextLink>
      </Flex>
      {/* Modal buttons */}
      <Flex mt={20} mx="5" flexDir="column" gap={5}>
        <CreateWorker />
        <CreateCustomer />
        <CreateOrder />
      </Flex>

      <Flex mx="5" mb="10" alignItems="flex-end" flex={1}>
        <Flex flexDir="column" gap={5} w="100%">
          <AdminProfile />
          <IconButton
            aria-label="Logout"
            icon={<BiLogOut />}
            size="md"
            colorScheme="red"
            onClick={handleLogout}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
