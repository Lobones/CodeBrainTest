import {
  Flex,
  Divider,
  Avatar,
  Heading,
  Text,
  IconButton,
  useBreakpointValue
} from '@chakra-ui/react'

import {
  RiProductHuntLine,
  RiMenuUnfoldLine,
  RiMenuFoldLine
} from 'react-icons/ri'
import { IoHome, IoPeopleCircle, IoCodeSlash } from 'react-icons/io5'

import { MdSell } from 'react-icons/md'

import { useState } from 'react'
import SidebarItem from './sidebar-item'
import { motion } from 'framer-motion'

const Sidebar = props => {
  const { path } = props

  const startMenuState = useBreakpointValue({
    base: 'collapsed',
    sm: 'opened',
    md: 'opened',
    lg: 'opened',
    xl: 'opened'
  })

  const sideBarShouldWidth = useBreakpointValue({ base: '45px', sm: '80px' })

  const [menuState, setMenuState] = useState(startMenuState)
  const [hiddenState, setHiddenState] = useState(startMenuState)

  return (
    <motion.div
      onAnimationComplete={() => {
        setHiddenState(menuState)
      }}
      animate={{ width: menuState == 'opened' ? '200px' : sideBarShouldWidth }}
      transition={{ duration: 0.25 }}
    >
      <Flex
        backgroundColor="#fff"
        position="relative"
        left={['3', '5', '5']}
        h="95vh"
        marginTop="2.5vh"
        rounded={15}
        boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Flex
          p={['8px', '18px', '18px']}
          flexDirection="column"
          alignItems="flex-start"
          as="nav"
        >
          <IconButton
            ml={['-6px', 0, 0]}
            background="none"
            mt={5}
            _hover={{ background: 'none' }}
            _focus={false}
            icon={
              menuState == 'opened' ? <RiMenuFoldLine /> : <RiMenuUnfoldLine />
            }
            onClick={() => {
              if (menuState == 'collapsed') setMenuState('opened')
              else setMenuState('collapsed')
            }}
          />
          <SidebarItem
            link="/"
            menuState={menuState}
            icon={IoHome}
            title="Principal"
            path={path}
          />{' '}
          <SidebarItem
            link="/sales"
            menuState={menuState}
            icon={MdSell}
            title="Vendas"
            description=""
            path={path}
          />
          <SidebarItem
            link="/operators"
            menuState={menuState}
            icon={IoPeopleCircle}
            title="Operadores"
            description="Registre, apague ou apenas explore a lista de operadores"
            path={path}
          />
          <SidebarItem
            link="/products"
            menuState={menuState}
            icon={RiProductHuntLine}
            title="Produtos"
            description="Você pode ver, modificar ou deletar os produtos ou adicionar e remover itens do estoque"
            path={path}
          />
          <SidebarItem
            link="/about"
            menuState={menuState}
            icon={IoCodeSlash}
            title="Sobre"
            description="Você pode ver, modificar ou deletar os produtos ou adicionar e remover itens do estoque"
            path={path}
          />
        </Flex>

        <Flex
          p="5%"
          flexDirection="column"
          w="100%"
          alignItems={menuState == 'collapsed' ? 'center' : 'flex-start'}
          mb={4}
        >
          <Divider opacity={menuState == 'collapsed' ? 0.0 : 1.0} />

          <Flex mt={4} align="center" justify="center">
            <Avatar size="sm" ml={menuState == 'collapsed' ? 0 : 2} />
            <motion.div
              animate={{
                opacity: hiddenState == 'collapsed' ? 0.0 : 1.0,
                display: menuState == 'collapsed' ? 'none' : 'flex'
              }}
            >
              <Flex
                flexDirection="column"
                ml={4}
                align="center"
                justify="center"
              >
                <Heading as="h3" size="sm" isTruncated>
                  João Silva
                </Heading>
                <Text color="gray" isTruncated>
                  Caixa
                </Text>
              </Flex>
            </motion.div>
          </Flex>
        </Flex>
      </Flex>
    </motion.div>
  )
}

export default Sidebar
