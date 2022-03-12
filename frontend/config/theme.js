import { extendTheme } from '@chakra-ui/react'

const styles = {
  global: () => ({
    body: {
      bg: '#f8f9fa'
    }
  })
}

const theme = extendTheme({
  styles,
  fonts: {
    body: 'Sora, sans-serif'
  }
})

export default theme
