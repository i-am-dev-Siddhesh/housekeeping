import FullScreenLoader from '@/components/Loader';
import { useAuth } from '@/hooks/useAuth';
import wrapper from '@/store';
import '@/styles/globals.css';
import { CacheProvider } from '@chakra-ui/next-js';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';

function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAuth()
  return (
    <CacheProvider>
      <ChakraProvider>
        {isLoading ? <FullScreenLoader /> : <Component {...pageProps} />}
      </ChakraProvider>
    </CacheProvider>
  );
}

export default wrapper.withRedux(App)
