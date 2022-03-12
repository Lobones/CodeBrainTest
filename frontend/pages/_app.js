import { ChakraProvider } from '@chakra-ui/provider'
import { Flex } from '@chakra-ui/react'
import { AnimatePresence } from 'framer-motion'
import Body from '../components/layouts/body'
import Sidebar from '../components/sidebar'
import theme from '../config/theme'

const Application = ({ Component, pageProps, router }) => (
  <ChakraProvider theme={theme}>
    <Body router={router}>
      <Flex h="100vh" flexDirection="row" overflow="hidden" maxW="100vw">
        <Sidebar w="15%" path={router.asPath} />

        <Flex
          position="relative"
          w="100%"
          p="3%"
          flexDirection="column"
          overflow="auto"
          h="95vh"
          mt="2.5vh"
          ml={['28px', '42px', '42px']}
          mr={['1.8vh', '2.5vh', '2.5vh']}
          rounded={15}
          boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
          backgroundColor="#fff"
        >
          <AnimatePresence exitBeforeEnter initial={true}>
            <Component {...pageProps} key={router.route} />
          </AnimatePresence>
        </Flex>
      </Flex>
    </Body>
  </ChakraProvider>
)

export default Application
