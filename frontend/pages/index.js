import { Icon, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import {
  getAllOperators,
  getTopSaleOperator
} from '../api/services/operator-service'
import {
  getAllProducts,
  getLowStockProducts,
  getTopAverageTicketProduct
} from '../api/services/product-service'
import { CustomButton } from '../components/custom-button'
import Highlight from '../components/dashboard-highlight'
import Body from '../components/layouts/body'
import { MakeSale, OperatorRegister } from '../components/page-functions'
import { GiMoneyStack, GiPerson, GiShoppingBag } from 'react-icons/gi'
import { MdOutlineProductionQuantityLimits } from 'react-icons/md'
import { priceFormatter } from '../components/tableview'
import { getAllSales, getTopSaleByPrice } from '../api/services/sale-service'
import { RiProductHuntLine } from 'react-icons/ri'

const Index = ({
  products,
  topAverageTicketProduct,
  lowStockProducts,
  operators,
  topSaleOperator,
  sales,
  topSaleByPrice
}) => {
  let revenues = 0
  let productSales = 0

  products.forEach(product => {
    revenues = revenues + product.sales * product.price
    productSales = productSales + product.sales
  })

  const revenueStr = priceFormatter(revenues)

  const productsMap = products.reduce((map, obj) => {
    map[obj.id] = { title: obj.title, stock: obj.stock }
    return map
  }, {})

  const operatorsMap = operators.reduce((map, obj) => {
    map[obj.id] = { firstName: obj.firstName, lastName: obj.lastName }
    return map
  }, {})

  const topSaleStr = priceFormatter(topSaleByPrice.totalPrice)
  const topProductAverageTicketStr = priceFormatter(
    topAverageTicketProduct.averageTicket
  )

  return (
    <Body title="Principal">
      <Text ml={6} p={1} fontSize={[20, 26, 30]} fontWeight="semibold">
        Atalhos
      </Text>
      <SimpleGrid
        minChildWidth={['128px', '180px', '300px']}
        gap={[1, 2, 2]}
        spacing={[0, 1, 1]}
      >
        <CustomButton
          colorA="#2193b0"
          colorB="#6dd5ed"
          title="Efetuar Venda"
          description="Iniciar flow de uma nova venda."
          drawerHeader="EFETUAR VENDA"
          drawerBody={<MakeSale products={products} operators={operators} />}
        />
        <CustomButton
          colorA="#02aab0"
          colorB="#00cdac"
          title="Cadastrar Op."
          description="Registrar novo operador."
          drawerHeader="CADASTRAR NOVO OPERADOR"
          drawerBody={<OperatorRegister />}
        />
      </SimpleGrid>
      <Text mt={12} ml={6} p={1} fontSize={[20, 26, 30]} fontWeight="semibold">
        Visão Geral
      </Text>
      <SimpleGrid
        minChildWidth={['265px', '265px', '400px']}
        gap={[1, 2, 2]}
        spacing={[0, 1, 1]}
      >
        <Highlight
          border="1px solid #00000050"
          colorA="#A0AEC0"
          colorB="#E2E8F0"
          title="Faturamento"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-evenly"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon as={GiMoneyStack} ml={-4} h={14} w={14} color="#00000099" />
              <Stack direction="row" w="100%" justifyContent="space-between">
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                >
                  <Text fontWeight="semibold" color="#00000099">
                    TOTAL
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                >
                  {' '}
                  <Text fontWeight="semibold" color="#00000099">
                    {revenueStr}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />

        <Highlight
          border="1px solid #00000050"
          colorA="#A0AEC0"
          colorB="#E2E8F0"
          title="Vendas"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-around"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon
                as={GiShoppingBag}
                ml={-2}
                h={14}
                w={14}
                color="#00000099"
              />
              <Stack direction="row" w="100%" justifyContent="space-between">
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                >
                  <Text fontWeight="semibold" color="#00000099">
                    VENDAS REALIZADAS
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    PRODUTOS VENDIDOS
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                >
                  {' '}
                  <Text fontWeight="semibold" color="#00000099">
                    {sales.length}
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {productSales}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />

        <Highlight
          border="1px solid #00000050"
          colorA="#A0AEC0"
          colorB="#E2E8F0"
          title="Para Repor"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-between"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon
                as={MdOutlineProductionQuantityLimits}
                ml={-2}
                h={14}
                w={14}
                color="#00000099"
              />
              <Stack
                align="center"
                direction="row"
                w="100%"
                justifyContent="space-between"
              >
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                  w="100%"
                  spacing={[0, 1, 1]}
                >
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[0]].title}:
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[1]].title}:
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[2]].title}:
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                  w="100%"
                  spacing={[0, 1, 1]}
                >
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[0]].stock} unidades
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[1]].stock} unidades
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {productsMap[lowStockProducts[2]].stock} unidades
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />
      </SimpleGrid>

      <Text mt={12} ml={6} p={1} fontSize={[20, 26, 30]} fontWeight="semibold">
        Destaques
      </Text>
      <SimpleGrid
        minChildWidth={['265px', '265px', '400px']}
        gap={[1, 2, 2]}
        spacing={[0, 1, 1]}
        pb={5}
      >
        <Highlight
          border="1px solid #00000050"
          colorA="#DBA514"
          colorB="#FCC201"
          title="Melhor Venda"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-around"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon
                as={GiShoppingBag}
                ml={-2}
                h={14}
                w={14}
                color="#00000099"
              />
              <Stack direction="row" w="100%" justifyContent="space-between">
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                >
                  <Text fontWeight="semibold" color="#00000099">
                    Feita por:
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    Valor:
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                >
                  {' '}
                  <Text fontWeight="semibold" color="#00000099">
                    {operatorsMap[topSaleByPrice.operatorId].firstName}
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {topSaleStr}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />
        <Highlight
          border="1px solid #00000050"
          colorA="#DBA514"
          colorB="#FCC201"
          title="Operador em Destaque"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-around"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon as={GiPerson} ml={-2} h={14} w={14} color="#00000099" />
              <Stack direction="row" w="100%" justifyContent="space-between">
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                >
                  <Text fontWeight="semibold" color="#00000099">
                    Operador:
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    Vendas:
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                >
                  {' '}
                  <Text fontWeight="semibold" color="#00000099">
                    {topSaleOperator.firstName}
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {topSaleOperator.sales.length}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />
        <Highlight
          border="1px solid #00000050"
          colorA="#DBA514"
          colorB="#FCC201"
          title="Produto em Destaque"
          body={
            <Stack
              align="center"
              direction="column"
              justifyContent="space-around"
              px={5}
              pt={2}
              h="100%"
            >
              <Icon
                as={RiProductHuntLine}
                ml={-2}
                h={14}
                w={14}
                color="#00000099"
              />
              <Stack direction="row" w="100%" justifyContent="space-between">
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="start"
                >
                  <Text fontWeight="semibold" color="#00000099">
                    Produto:
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    Ticket Médio:
                  </Text>
                </Stack>
                <Stack
                  fontSize={[10, 12, 20]}
                  direction="column"
                  pr={2}
                  align="end"
                >
                  {' '}
                  <Text fontWeight="semibold" color="#00000099">
                    {topAverageTicketProduct.title}
                  </Text>
                  <Text fontWeight="semibold" color="#00000099">
                    {topProductAverageTicketStr}
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          }
        />
      </SimpleGrid>
    </Body>
  )
}

export const getServerSideProps = async () => {
  const operators = await getAllOperators()
  const topSaleOperator = await getTopSaleOperator()
  const products = await getAllProducts()
  const topAverageTicketProduct = await getTopAverageTicketProduct()
  const lowStockProducts = await getLowStockProducts()
  const sales = await getAllSales()
  const topSaleByPrice = await getTopSaleByPrice()

  return {
    props: {
      operators: operators,
      topSaleOperator: topSaleOperator,
      products: products,
      topAverageTicketProduct: topAverageTicketProduct,
      lowStockProducts: lowStockProducts,
      sales: sales,
      topSaleByPrice: topSaleByPrice
    }
  }
}

export default Index
