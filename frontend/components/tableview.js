/* eslint-disable react/no-children-prop */
import { TriangleDownIcon } from '@chakra-ui/icons'
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Text,
  Stack,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
  useBreakpointValue
} from '@chakra-ui/react'
import { BiSearchAlt } from 'react-icons/bi'
import { IoCloseOutline } from 'react-icons/io5'
// import { FiEdit } from 'react-icons/fi'
import { useState } from 'react'

const priceFormatter = price => {
  if (isNaN(price) || price == undefined) return `R$ 0,00`

  const formatter = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })

  return formatter.format(price)
}

const TableView = ({ maxH, caption, rows, body }) => {
  const shouldSize = useBreakpointValue({
    base: 'sm',
    sm: 'sm',
    md: 'sm',
    lg: 'md'
  })

  return (
    <Box
      rounded={15}
      bg="#fff"
      maxH={maxH || '68vh'}
      overflow="scroll"
      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.06)"
      border="1px solid #00000010"
      pb={5}
    >
      <Table variant="simple" size={shouldSize}>
        <TableCaption>{caption}</TableCaption>
        <Thead>
          <Tr>{rows}</Tr>
        </Thead>
        <Tbody>{body}</Tbody>
      </Table>
    </Box>
  )
}

const Header = ({ colorA, colorB, headerTitle, buttonText, handler }) => {
  return (
    <Stack
      w="100%"
      direction="row"
      align="center"
      justifyContent="space-between"
      pr={2}
    >
      <Box rounded={5} bgGradient={`linear(to-l, ${colorA}80, ${colorB}80)`}>
        <Text
          fontSize={[16, 26, 35]}
          whiteSpace="nowrap"
          rounded={5}
          boxShadow="5px 5px 14px 0px rgba(0, 0, 0, 0.06)"
          m={1}
          mt="6px"
          px={1}
          fontWeight="semibold"
          casing="uppercase"
        >
          {headerTitle}
        </Text>
      </Box>
      <Text fontSize={[10, 14, 20]}> </Text>
      <Box
        as="button"
        rounded={5}
        bgGradient={`linear(to-l, ${colorA}80, ${colorB}80)`}
        _hover={{ bgGradient: `linear(to-l, ${colorA}96, ${colorB}96)` }}
        boxShadow="5px 5px 14px 0px rgba(0, 0, 0, 0.06)"
        onClick={handler}
      >
        <Text
          whiteSpace="nowrap"
          p={2}
          mt="3px"
          fontSize={[10, 14, 20]}
          casing="uppercase"
          fontWeight="semibold"
        >
          {buttonText}
        </Text>
      </Box>
    </Stack>
  )
}

const SearchBar = ({ placeholder, setSearchInput }) => {
  return (
    <Box
      w="100%"
      h="42px"
      bg="#fff"
      rounded={10}
      boxShadow="0px 0px 20px 0px rgba(0, 0, 0, 0.06)"
      my={2}
      align="center"
      justifyContent="center"
      border="1px solid #00000010"
    >
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BiSearchAlt color="#CBD5E0" size={25} />}
        />
        <Input
          rounded={10}
          placeholder={placeholder}
          variant="outlined"
          onKeyDown={e => {
            if (e.keyCode == 13) {
              const target = e.currentTarget
              e.preventDefault()
              e.target.blur()
              setTimeout(() => target.focus, 5)
            }
          }}
          onBlur={e => {
            setSearchInput(e.target.value.toLowerCase())
          }}
          onChange={e => (e.target.value === '' ? setSearchInput('') : null)}
        />
      </InputGroup>
    </Box>
  )
}

const RemoveButton = () => {
  const shouldSize = useBreakpointValue({ base: 15, sm: 20, md: 20, lg: 20 })

  return (
    <Box>
      <Tooltip
        textColor="#000"
        label="Pressione para remover registro"
        hasArrow
        rounded={5}
        placement="right"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        bg="gray.300"
      >
        <Box as="button">
          <IoCloseOutline color="red.100" opacity="0.5" size={shouldSize} />
        </Box>
      </Tooltip>
    </Box>
  )
}

/*
const EditButton = () => {
  const shouldSize = useBreakpointValue({ base: 13, sm: 18, md: 18, lg: 18 })

  return (
    <Box>
      <Tooltip
        textColor="#000"
        label="Pressione para editar item"
        hasArrow
        rounded={5}
        placement="right"
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        bg="gray.300"
      >
        <Box as="button">
          <FiEdit opacity="0.5" size={shouldSize} />
        </Box>
      </Tooltip>
    </Box>
  )
}
*/

const TableButtons = () => {
  return (
    <Td>
      <Stack direction="row" align="center" spacing={2}>
        <RemoveButton />
      </Stack>
    </Td>
  )
}

const SaleTableView = ({ isFull, maxH, sales, sort }) => {
  const [searchInput, setSearchInput] = useState('')

  const sorts = {
    moreSalesFirst: (o1, o2) => o2.totalPrice - o1.totalPrice,
    lessSalesFirst: (o1, o2) => o1.totalPrice - o2.totalPrice
  }

  const currentSales = sales.sort(sorts[sort])

  const filteredCurrentSales = currentSales.filter(sale => {
    if (searchInput === '') return sale
    else {
      const localTimeSplit = sale.time.split('T')
      const localTimeDate = localTimeSplit[0]
      const localTimeHoursAndMinutes = localTimeSplit[1].split('.')[0]

      const saleTime = localTimeDate + ' ' + localTimeHoursAndMinutes

      return (
        sale.operatorId.toLowerCase().includes(searchInput) ||
        sale.id.toLowerCase().includes(searchInput) ||
        saleTime.toLowerCase().includes(searchInput) ||
        priceFormatter(sale.totalPrice).toLowerCase().includes(searchInput)
      )
    }
  })

  const salesList = filteredCurrentSales.map(sale => {
    const localTimeSplit = sale.time.split('T')
    const localTimeDate = localTimeSplit[0]
    const localTimeHoursAndMinutes = localTimeSplit[1].split('.')[0]

    const map = new Map(Object.entries(sale.products))

    let sum = 0
    map.forEach((value, _) => (sum += value))

    return (
      <Tr key={sale.id}>
        {isFull ? <TableButtons /> : <Td>{buttons}</Td>}
        <Td style={{ whiteSpace: 'nowrap' }}>
          <Text
            casing="uppercase"
            bgGradient="linear(to-l, #2193b0, #6dd5ed)"
            bgClip="text"
            fontSize={[9, 14, 14]}
            cursor="pointer"
          >
            {`...${sale.id.substring(sale.id.length - 6, sale.id.length)}`}
          </Text>
        </Td>
        <Td
          display={['none', 'none', 'table-cell']}
          style={{ whiteSpace: 'nowrap' }}
          fontSize={[9, 14, 14]}
        >
          {localTimeDate} {localTimeHoursAndMinutes}
        </Td>
        <Td
          display={['none', 'none', 'table-cell']}
          style={{ whiteSpace: 'nowrap' }}
        >
          <Text
            casing="uppercase"
            bgGradient="linear(to-l, #2193b0, #6dd5ed)"
            bgClip="text"
            fontSize={[9, 14, 14]}
          >
            {sale.operatorId}
          </Text>
        </Td>
        <Td
          style={{ whiteSpace: 'nowrap' }}
          fontSize={[11, 14, 14]}
          isNumeric={isFull || true}
        >
          {sum}
        </Td>
        <Td
          style={{ whiteSpace: 'nowrap' }}
          fontSize={[9, 14, 14]}
          isNumeric={isFull || true}
        >
          {priceFormatter(sale.totalPrice)}
        </Td>
      </Tr>
    )
  })

  return (
    <Stack direction="column" align="flex-start" spacing={5}>
      {isFull ? (
        <Header
          colorA="#2193b0"
          colorB="#6dd5ed"
          headerTitle="Vendas"
          buttonText="Nova Venda"
        />
      ) : (
        ''
      )}
      <Stack direction="column">
        <SearchBar
          placeholder="Busque por referência, data, operador, etc"
          setSearchInput={setSearchInput}
        />
        <TableView
          maxH={maxH}
          caption="Fim da Lista de Vendas"
          rows={
            <>
              <Th />
              <Th fontSize={[9, 14, 14]}>Ref.</Th>
              <Th
                fontSize={[9, 14, 14]}
                display={['none', 'none', 'table-cell']}
              >
                Data
              </Th>
              <Th
                fontSize={[9, 14, 14]}
                display={['none', 'none', 'table-cell']}
              >
                Operador
              </Th>
              <Th fontSize={[9, 14, 14]}>Itens</Th>
              <Th fontSize={[9, 14, 14]}>
                Total <TriangleDownIcon aria-label="sorted descending" />
              </Th>
            </>
          }
          body={salesList}
        />
      </Stack>
    </Stack>
  )
}

const OperatorTableView = ({
  isFull,
  buttons,
  maxH,
  operators,
  sort,
  onRefClick
}) => {
  const [searchInput, setSearchInput] = useState('')

  const sorts = {
    moreSalesFirst: (o1, o2) => o2.sales.length - o1.sales.length,
    lessSalesFirst: (o1, o2) => o1.sales.length - o2.sales.length,
    moreAverageSalesRevenueFirst: (o1, o2) =>
      o2.averageSalesRevenue - o1.averageSalesRevenue,
    lessAverageSalesRevenueFirst: (o1, o2) =>
      o1.averageSalesRevenue - o2.averageSalesRevenue
  }

  const currentOperators = operators.sort(sorts[sort])

  const filteredCurrentOperators = currentOperators.filter(operator => {
    if (searchInput === '') return operator
    else {
      return (
        operator.id.toLowerCase().includes(searchInput) ||
        operator.firstName.toLowerCase().includes(searchInput) ||
        operator.lastName.toLowerCase().includes(searchInput) ||
        `${operator.sales.length}`.includes(searchInput) ||
        priceFormatter(operator.averageSalesRevenue)
          .toLocaleLowerCase()
          .includes(searchInput)
      )
    }
  })

  const operatorsList = filteredCurrentOperators.map(operator => {
    return (
      <Tr key={operator.id}>
        {isFull ? <TableButtons /> : <Td>{buttons}</Td>}
        <Td style={{ whiteSpace: 'nowrap' }}>
          <Text
            casing="uppercase"
            bgGradient="linear(to-l, #02aab0, #00cdac)"
            bgClip="text"
            isTruncated
            fontSize={[isFull ? 9 : 14, 14, 14]}
            cursor="pointer"
            onClick={() => {
              onRefClick(operator)
            }}
          >
            {`...${operator.id.substring(
              operator.id.length - 6,
              operator.id.length
            )}`}
          </Text>
        </Td>
        <Td
          style={{ whiteSpace: 'nowrap' }}
          fontSize={[isFull ? 9 : 14, 14, 14]}
        >
          {operator.firstName}
        </Td>
        <Td
          style={{ whiteSpace: 'nowrap' }}
          isNumeric={isFull || true}
          fontSize={[isFull ? 9 : 14, 14, 14]}
        >
          {operator.sales.length}
        </Td>
        {isFull ? (
          <Td
            display={['none', 'none', 'table-cell']}
            style={{ whiteSpace: 'nowrap' }}
            isNumeric={isFull || true}
            fontSize={[isFull ? 9 : 14, 14, 14]}
          >
            {priceFormatter(operator.averageSalesRevenue)}
          </Td>
        ) : (
          ''
        )}
      </Tr>
    )
  })

  return (
    <Stack direction="column" align="flex-start" spacing={5}>
      {isFull ? (
        <Header
          colorA="#02aab0"
          colorB="#00cdac"
          headerTitle="Operadores"
          buttonText="Novo Operador"
        />
      ) : (
        ''
      )}
      <Stack direction="column">
        <SearchBar
          placeholder="Busque por referência, nome, vendas, etc"
          setSearchInput={setSearchInput}
        />
        <TableView
          maxH={maxH}
          caption="Fim da Lista de Operadores"
          rows={
            <>
              {isFull ? <Th /> : !buttons ? <Th /> : ''}
              <Th fontSize={[isFull ? 9 : 14, 14, 14]}>Ref.</Th>
              <Th fontSize={[isFull ? 9 : 14, 14, 14]}>Nome</Th>
              <Th fontSize={[isFull ? 9 : 14, 14, 14]}>Vendas</Th>
              {isFull ? (
                <Th
                  fontSize={[isFull ? 9 : 14, 14, 14]}
                  display={['none', 'none', 'table-cell']}
                >
                  RMV <TriangleDownIcon aria-label="sorted descending" />
                </Th>
              ) : (
                ''
              )}
            </>
          }
          body={operatorsList}
        />
      </Stack>
    </Stack>
  )
}

const ProductTableView = ({
  maxH,
  isFull,
  buttons,
  products,
  sort,
  onRefClick
}) => {
  const [searchInput, setSearchInput] = useState('')

  const sorts = {
    moreSalesFirst: (o1, o2) => o2.sales - o1.sales,
    lessSalesFirst: (o1, o2) => o1.sales - o2.sales,
    moreAverageTicketFirst: (o1, o2) => o2.averageTicket - o1.averageTicket,
    lessAverageTicketFirst: (o1, o2) => o1.averageTicket - o2.averageTicket
  }

  const currentProducts = products.sort(sorts[sort])

  const filteredCurrentProduct = currentProducts.filter(product => {
    if (searchInput === '') return product
    else {
      return (
        product.id.toLowerCase().includes(searchInput) ||
        product.title.toLowerCase().includes(searchInput) ||
        `${product.stock}`.includes(searchInput) ||
        `${product.sales}`.includes(searchInput) ||
        priceFormatter(product.price).toLowerCase().includes(searchInput) ||
        priceFormatter(product.averageTicket)
          .toLowerCase()
          .includes(searchInput)
      )
    }
  })

  const procuctsList = filteredCurrentProduct.map(product => {
    return (
      <Tr key={product.id}>
        {isFull ? (
          <TableButtons />
        ) : (
          <Td
            cursor="pointer"
            onClick={() => {
              onRefClick(product)
            }}
          >
            {buttons}
          </Td>
        )}
        {isFull ? (
          <Td style={{ whiteSpace: 'nowrap' }}>
            {' '}
            <Text
              casing="uppercase"
              bgGradient="linear(to-l, #d66d75, #e29587)"
              bgClip="text"
              isTruncated
              fontSize={[isFull ? 9 : 14, 14, 14]}
              cursor="pointer"
              onClick={() => {
                onRefClick(product)
              }}
            >
              {`...${product.id.substring(
                product.id.length - 6,
                product.id.length
              )}`}
            </Text>
          </Td>
        ) : (
          ''
        )}
        <Td
          style={{ whiteSpace: 'nowrap' }}
          fontSize={[isFull ? 9 : 14, 14, 14]}
        >
          {product.title}
        </Td>
        <Td
          style={{ whiteSpace: 'nowrap' }}
          isNumeric={isFull || true}
          fontSize={[isFull ? 9 : 14, 14, 14]}
        >
          {product.stock}
        </Td>
        {isFull ? (
          <Td
            style={{ whiteSpace: 'nowrap' }}
            isNumeric={isFull || true}
            fontSize={[isFull ? 9 : 14, 14, 14]}
            display={['none', 'none', 'table-cell']}
          >
            {product.sales}
          </Td>
        ) : (
          ''
        )}
        <Td
          style={{ whiteSpace: 'nowrap' }}
          isNumeric={isFull || true}
          fontSize={[isFull ? 9 : 14, 14, 14]}
          display={['none', 'none', 'table-cell']}
        >
          {priceFormatter(product.price)}
        </Td>
        {isFull ? (
          <Td
            style={{ whiteSpace: 'nowrap' }}
            isNumeric={isFull || true}
            fontSize={[isFull ? 9 : 14, 14, 14]}
            display={['none', 'none', 'table-cell']}
          >
            {priceFormatter(product.averageTicket)}
          </Td>
        ) : (
          ''
        )}
      </Tr>
    )
  })

  return (
    <Stack direction="column" align="flex-start" spacing={5}>
      {isFull ? (
        <Header
          colorA="#d66d75"
          colorB="#e29587"
          headerTitle="Produtos"
          buttonText="Novo Produto"
        />
      ) : (
        ''
      )}
      <Stack direction="column">
        <SearchBar
          placeholder="Busque por referência, produto, preço, etc"
          setSearchInput={setSearchInput}
        />
        <TableView
          maxH={maxH}
          caption="Fim da Lista de Produtos"
          rows={
            <>
              <Th />
              {isFull ? <Th fontSize={[isFull ? 9 : 14, 14, 14]}>Ref.</Th> : ''}
              <Th fontSize={[isFull ? 9 : 14, 14, 14]}>Produto</Th>
              <Th fontSize={[isFull ? 9 : 14, 14, 14]}>
                {useBreakpointValue({ base: 'ESTQ.', sm: 'Estoque' })}
              </Th>
              {isFull ? (
                <Th
                  fontSize={[isFull ? 9 : 14, 14, 14]}
                  display={['none', 'none', 'table-cell']}
                >
                  Vendas <TriangleDownIcon aria-label="sorted descending" />
                </Th>
              ) : (
                ''
              )}
              <Th
                fontSize={[isFull ? 9 : 14, 14, 14]}
                display={['none', 'none', 'table-cell']}
              >
                Preço
              </Th>
              {isFull ? (
                <Th
                  fontSize={[isFull ? 9 : 14, 14, 14]}
                  display={['none', 'none', 'table-cell']}
                >
                  Ticket Médio
                </Th>
              ) : (
                ''
              )}
            </>
          }
          body={procuctsList}
        />
      </Stack>
    </Stack>
  )
}

export { SaleTableView, OperatorTableView, ProductTableView, priceFormatter }
