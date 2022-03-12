import Body from '../components/layouts/body'
import { getAllOperators } from '../api/services/operator-service'
import { OperatorTableView } from '../components/tableview'
import { Stack } from '@chakra-ui/react'

const Operators = ({ operators }) => {
  return (
    <Body title="Operadores">
      <Stack direction="row" align="flex-start">
        <Stack direction="column" align="flex-start" spacing={5}>
          <OperatorTableView
            isFull
            operators={operators}
            sort="moreAverageSalesRevenueFirst"
          />
        </Stack>
      </Stack>
    </Body>
  )
}

export const getServerSideProps = async () => {
  const operators = await getAllOperators()

  return {
    props: {
      operators: operators
    }
  }
}

export default Operators
