import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react'
import { generateData } from '../api/services/general-service'
import Body from '../components/layouts/body'

const About = () => {
  const generateTestData = async () => {
    await generateData()
  }

  return (
    <Body title="Sobre" align="center">
      <Stack direction="column" align="center" pt={50} spacing="30px">
        <Stack
          mb={4}
          direction="row"
          justify="center"
          alignItems="center"
          spacing="0"
        >
          <Box
            display="inline-block"
            w="20vw"
            height="3px"
            backgroundColor="#1a202c"
          />
          <Box rounded={10} border="3px solid #1a202c">
            <Heading p={1} as="h1" fontSize={[24, 30, 36]} textColor="#1a202c">
              {'<CodeBrainTest/>'}
            </Heading>
          </Box>
          <Box
            display="inline-block"
            w="20vw"
            height="3px"
            backgroundColor="#1a202c"
          />
        </Stack>
        <Text w="54vw" fontSize={[13, 16, 18]} textAlign="center">
          Criado por Rômulo Lobo para submeter ao teste proposto por Kim Aragon
          Escobar da empresa CodeBrain para vaga de Desenvolvedor ReactJS
          Fullstack Jr.
        </Text>
        <Text w="54vw" fontSize={[13, 16, 18]} textAlign="center">
          ReactJS, NextJS, ChakraUI, Styled Components
        </Text>
        <Text w="54vw" fontSize={[13, 16, 18]} textAlign="center">
          Spring Boot, MongoDB, Mongo Express, Docker
        </Text>
        <Text w="54vw" fontSize={[13, 16, 18]} textAlign="center">
          Versão 1.0.0
        </Text>

        <Button
          onClick={() => {
            generateTestData()
          }}
        >
          Gerar operadores, produtos e vendas
        </Button>
      </Stack>
    </Body>
  )
}

export default About
