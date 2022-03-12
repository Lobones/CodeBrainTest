import { Stack } from '@chakra-ui/react'
import { getAllProducts } from '../api/services/product-service'
import Body from '../components/layouts/body'
import { ProductTableView } from '../components/tableview'

const Products = ({ products }) => {
  return (
    <Body title="Produtos">
      <Stack direction="row" align="flex-start">
        <Stack direction="column" align="flex-start" spacing={5}>
          <ProductTableView isFull products={products} sort="moreSalesFirst" />
        </Stack>
      </Stack>
    </Body>
  )
}

export const getServerSideProps = async () => {
  const json = await getAllProducts()

  return {
    props: {
      products: json
    }
  }
}

export default Products
