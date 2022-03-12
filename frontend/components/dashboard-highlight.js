import { Box, Flex, Stack, Text } from '@chakra-ui/react'

const Highlight = ({ title, body, colorA, colorB, border }) => {
  return (
    <Flex
      flexWrap="wrap"
      justifyContent={['center', 'space-evenly', 'space-evenly']}
      ml={[0, 0, 0]}
    >
      <Box
        rounded={15}
        mt={2}
        minH={['180px', '215px', '280px']}
        minW={['85%', '265px', '400px']}
        bgGradient={`linear(to-l, ${colorA}80, ${colorB}80)`}
        boxShadow="10px 10px 14px 0px rgba(0, 0, 0, 0.06)"
        border={border}
      >
        <Box align="center" w="100%" h="100%">
          <Stack align="center" direction="column">
            <Text
              textColor="#00000099"
              fontSize={['14px', '19px', '26px']}
              fontWeight="semibold"
              casing="uppercase"
              mt={3}
            >
              {title}
            </Text>
            <Box w="100%" h="1px" bgColor="#00000050" />
          </Stack>
          <Box w="95%" h="70%">
            {body}
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}

export default Highlight
