/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Icon,
  Input,
  Spinner,
  Stack,
  Text
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import {
  OperatorTableView,
  priceFormatter,
  ProductTableView
} from './tableview'
import { IoCloseOutline } from 'react-icons/io5'
import { BsCartPlus } from 'react-icons/bs'
import { createOperator } from '../api/services/operator-service'
import { createSale } from '../api/services/sale-service'

const convertArrayToObject = (array, key) => {
  const initialValue = {}
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item
    }
  }, initialValue)
}

const CartItem = ({
  id,
  name,
  price,
  quantity,
  shoppingCart,
  setShoppingCart,
  setCartTotalPrice
}) => {
  useEffect(() => {
    setCartTotalPrice(0)

    Object.values(shoppingCart).map(({ price, quantity }) => {
      setCartTotalPrice(cartTotalPrice => cartTotalPrice + price * quantity)
    })
  }, [shoppingCart])

  return (
    <Stack
      direction="row"
      boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
      border="1px solid #00000010"
      rounded={10}
      w="100%"
      h="40px"
      bgColor="#fff"
      justifyContent="start"
      spacing="20%"
    >
      <Stack
        ml={3}
        justifyContent="start"
        direction="row"
        align="center"
        w="40%"
      >
        <Icon
          cursor="pointer"
          as={IoCloseOutline}
          color="red.400"
          onClick={() => {
            const obj = Object.values(shoppingCart).filter(
              ({ id: itemId }) => id != itemId
            )

            setShoppingCart(convertArrayToObject(obj, 'id'))
          }}
        />
        <Text fontSize={[11, 14, 14]} align="start" casing="uppercase">
          {name}
        </Text>
      </Stack>
      <Stack justifyContent="end" direction="row" align="center" w="70%" pr={4}>
        <Text fontSize={[11, 14, 14]} align="end" casing="uppercase">
          {priceFormatter(price)} X {quantity}
        </Text>
        <Text fontSize={[11, 14, 14]} align="end" casing="uppercase">
          {' '}
          = {priceFormatter(price * quantity)}
        </Text>
      </Stack>
    </Stack>
  )
}

const MakeSale = ({ products, operators }) => {
  const [selectedOperator, setSelectedOperator] = useState('')
  const [shoppingCart, setShoppingCart] = useState({})
  const [cartTotalPrice, setCartTotalPrice] = useState(0)
  const [createdSaleId, setCreatedSaleId] = useState('')

  const handleCreateSale = async () => {
    setCreatedSaleId('Criando..')

    let products = {}

    Object.values(shoppingCart).forEach(({ id, quantity }) => {
      products = { ...products, [id]: quantity }
    })

    await createSale({
      operatorId: selectedOperator.id,
      products: products
    }).then(res => {
      setCreatedSaleId(res)
    })
  }

  const addToShoppingCart = product => {
    if (product.id in shoppingCart) {
      setShoppingCart({
        ...shoppingCart,
        [product.id]: {
          id: product.id,
          name: product.title,
          price: product.price,
          quantity: shoppingCart[product.id]['quantity'] + 1
        }
      })
      return
    }

    setShoppingCart({
      ...shoppingCart,
      [product.id]: {
        id: product.id,
        name: product.title,
        price: product.price,
        quantity: 1
      }
    })
  }

  useEffect(() => {
    setCartTotalPrice(0)

    Object.values(shoppingCart).map(({ price, quantity }) => {
      setCartTotalPrice(cartTotalPrice => cartTotalPrice + price * quantity)
    })
  }, [shoppingCart])

  return (
    <Box>
      {createdSaleId === 'Criando...' ? (
        <Spinner align="center" size="xl" />
      ) : createdSaleId === '' ? (
        <Stack direction="column">
          {selectedOperator === '' ? (
            <>
              <Text
                mx={1}
                mb={-2}
                casing="uppercase"
                fontWeight="semibold"
                textColor="#00000099"
              >
                Selecione um operador
              </Text>
              <OperatorTableView
                maxH="60vh"
                operators={operators}
                onRefClick={setSelectedOperator}
              />
            </>
          ) : (
            <>
              <Text
                mx={1}
                mb={1}
                casing="uppercase"
                fontWeight="semibold"
                textColor="#00000099"
              >
                Operador:
              </Text>
              <Stack
                direction="row"
                boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
                border="1px solid #00000010"
                rounded={10}
                w="100%"
                h="40px"
                bgColor="#fff"
                justifyContent="space-around"
                align="center"
              >
                <Icon
                  cursor="pointer"
                  as={IoCloseOutline}
                  color="red.400"
                  onClick={() => setSelectedOperator('')}
                />
                <Text casing="uppercase">
                  {selectedOperator.firstName} {selectedOperator.lastName}
                </Text>
              </Stack>
              <Text
                mx={1}
                pt={5}
                mb={-2}
                casing="uppercase"
                fontWeight="semibold"
                textColor="#00000099"
              >
                Todos os Produtos
              </Text>
              <ProductTableView
                maxH="30vh"
                buttons={<Icon h={4} w={4} as={BsCartPlus} cursor="pointer" />}
                products={products}
                onRefClick={addToShoppingCart}
              />
              <Text
                mx={1}
                pt={5}
                mb={-2}
                casing="uppercase"
                fontWeight="semibold"
                textColor="#00000099"
              >
                Carrinho
              </Text>
              {Object.keys(shoppingCart).length === 0 ? (
                <Text align="center" fontSize={12} py={3} textColor="#00000099">
                  Adicione produtos ao carrinho na tabela acima
                </Text>
              ) : (
                <>
                  {Object.entries(shoppingCart).map(
                    ([id, { name, price, quantity }]) => {
                      return (
                        <CartItem
                          key={id}
                          id={id}
                          name={name}
                          price={price}
                          quantity={quantity}
                          shoppingCart={shoppingCart}
                          setShoppingCart={setShoppingCart}
                          cartTotalPrice={cartTotalPrice}
                          setCartTotalPrice={setCartTotalPrice}
                        />
                      )
                    }
                  )}
                  <Box h="1px" w="100%" bgColor="#00000040">
                    <Stack direction="row" justifyContent="space-between" p={3}>
                      <Text>TOTAL</Text>
                      <Text>{priceFormatter(cartTotalPrice)}</Text>
                    </Stack>
                    <Stack direction="row" justifyContent="end" w="100%" pb={5}>
                      <Button
                        variant="outline"
                        align="end"
                        onClick={handleCreateSale}
                      >
                        CONCLUIR VENDA
                      </Button>
                    </Stack>
                  </Box>
                </>
              )}
            </>
          )}
        </Stack>
      ) : (
        <Stack
          direction="column"
          boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
          border="1px solid #00000010"
          rounded={10}
          w="100%"
          h="200px"
          bgColor="green.200"
          justifyContent="center"
          align="center"
          p={5}
          pb={7}
        >
          <Text
            fontWeight="semibold"
            casing="uppercase"
            fontSize={[14, 16, 20]}
          >
            Venda efetuada com sucesso
          </Text>
          <Text fontSize={[13, 16, 20]}>Ref. {createdSaleId}</Text>
        </Stack>
      )}
    </Box>
  )
}

const OperatorRegister = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [calledCreate, setCalledCreate] = useState(0)
  const [createdOperatorId, setCreatedOperatorId] = useState('Carregando...')

  const doCreateOperator = async () => {
    setCalledCreate(1)

    await createOperator({
      firstName: firstName,
      lastName: lastName
    }).then(res => {
      setCreatedOperatorId(res)
    })
  }

  return (
    <Box>
      {calledCreate === 0 ? (
        <Stack
          direction="row"
          boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
          border="1px solid #00000010"
          rounded={10}
          w="100%"
          h="200px"
          bgColor="#fff"
          justifyContent="space-around"
          align="start"
          p={5}
          pb={7}
        >
          <Stack direction="column" w="100%">
            <Text fontSize={[14, 14, 16]} m={1}>
              Para concluir o cadastro do operador insira os seguintes dados do
              novo operador:
            </Text>
            <Input
              w="50%"
              fontSize={[12, 14, 14]}
              size="md"
              placeholder="Nome"
              onChange={e => setFirstName(e.target.value)}
            />
            <Input
              w="50%"
              fontSize={[12, 14, 14]}
              size="md"
              placeholder="Sobrenome"
              onChange={e => setLastName(e.target.value)}
            />
          </Stack>

          {firstName != '' && lastName != '' ? (
            <Button
              size="sm"
              p={[3, 3, 5]}
              border="1px solid #00000010"
              boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
              variant="simple"
              fontSize={[12, 14, 16]}
              alignSelf="end"
              onClick={() => {
                doCreateOperator()
              }}
            >
              Cadastrar
            </Button>
          ) : (
            ''
          )}
        </Stack>
      ) : (
        <Stack
          direction="column"
          boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
          border="1px solid #00000010"
          rounded={10}
          w="100%"
          h="200px"
          bgColor="green.200"
          justifyContent="center"
          align="center"
          p={5}
          pb={7}
        >
          <Text
            fontWeight="semibold"
            casing="uppercase"
            fontSize={[14, 16, 20]}
          >
            Novo Operador cadastrado com sucesso
          </Text>
          <Text fontSize={[13, 16, 20]}>Ref. {createdOperatorId}</Text>
        </Stack>
      )}
    </Box>
  )
}

const ProductRegister = () => {
  return (
    <Box>
      <Stack></Stack>
    </Box>
  )
}

const StockEditor = () => {
  return (
    <Box>
      <Stack></Stack>
    </Box>
  )
}

export { MakeSale, OperatorRegister, ProductRegister, StockEditor }
