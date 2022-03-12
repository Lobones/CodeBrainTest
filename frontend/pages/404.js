import NextLink from 'next/link'
import {
  Box,
  Heading,
  Text,
  Container,
  Divider,
  Button
} from '@chakra-ui/react'

const NotFound = () => (
  <Container align="center">
    <Heading as="h1" fontSize="9xl">
      404
    </Heading>
    <Text>Se perdeu no caminho? É melhor voltar logo.</Text>
    <Divider my={6} />
    <Box my={6} align="center">
      <NextLink href="/" passHref>
        <Button>Retornar para Página Principal</Button>
      </NextLink>
    </Box>
  </Container>
)

export default NotFound
