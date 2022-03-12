import { Badge, Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react'
import { useRef } from 'react'
import CustomDrawer from './custom-drawer.js'

const CustomButton = ({
  drawerHeader,
  drawerBody,
  drawerFooter,
  colorA,
  colorB,
  title,
  description
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = useRef()

  return (
    <Flex
      flexWrap="wrap"
      justifyContent={['center', 'space-evenly', 'space-evenly']}
      ml={[0, 0, 0]}
    >
      <Box
        ref={buttonRef}
        onClick={onOpen}
        as="button"
        display="flex"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        rounded={15}
        align="center"
        boxShadow="10px 10px 14px 0px rgba(0, 0, 0, 0.06)"
        mt={2}
        minW={[120, 180, 300]}
        minH={[78, 90, 150]}
        bgGradient={`linear(to-l, ${colorA}80, ${colorB}80)`}
        _hover={{ bgGradient: `linear(to-l, ${colorA}98, ${colorB}98)` }}
      >
        <Badge
          fontSize={[10, 16, 26]}
          whiteSpace="nowrap"
          position="absolute"
          mb={[, , '70px']}
          variant="subtle"
          colorScheme="blackAlpha"
          rounded={5}
          pt="1.5px"
        >
          {title}
        </Badge>
        <Box
          display={['none', 'none', 'unset']}
          w={280}
          h="1px"
          position="absolute"
          bg="#000"
          opacity="0.8"
        />
        <Text
          display={['none', 'none', 'unset']}
          fontSize={[10, 16, 18]}
          whiteSpace="nowrap"
          position="absolute"
          px={20}
          py={10}
          mt={[, , '70px']}
        >
          {description}
        </Text>
      </Box>

      <CustomDrawer
        header={drawerHeader || title}
        body={drawerBody}
        footer={
          drawerFooter || (
            <Button variant="outline" mr={3} onClick={onClose} _focus={false}>
              Fechar
            </Button>
          )
        }
        isOpen={isOpen}
        onClose={onClose}
        buttonRef={buttonRef}
      />
    </Flex>
  )
}

const SimpleButtonWithDrawer = ({
  children,
  drawerHeader,
  drawerBody,
  drawerFooter
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const buttonRef = useRef()

  return (
    <Box ref={buttonRef} onClick={onOpen} as="button">
      {children}

      <CustomDrawer
        header={drawerHeader || title}
        body={drawerBody}
        footer={
          drawerFooter || (
            <Button variant="outline" mr={3} onClick={onClose} _focus={false}>
              Fechar
            </Button>
          )
        }
        isOpen={isOpen}
        onClose={onClose}
        buttonRef={buttonRef}
      />
    </Box>
  )
}

export { CustomButton, SimpleButtonWithDrawer }
