import { Stack } from '@chakra-ui/react'
import { getAllSales } from '../api/services/sale-service'
import Body from '../components/layouts/body'
import { SaleTableView } from '../components/tableview'

const Sales = ({ sales }) => {
  return (
    <Body title="Vendas">
      <Stack direction="row" align="flex-start">
        <Stack direction="column" align="flex-start" spacing={5}>
          <SaleTableView isFull sales={sales} sort="moreSalesFirst" />
        </Stack>
      </Stack>
    </Body>
  )
}

export const getServerSideProps = async () => {
  const json = await getAllSales()

  return {
    props: {
      sales: json
    }
  }
}

export default Sales
