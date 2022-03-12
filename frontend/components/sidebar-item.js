import NextLink from 'next/link'
import {
  Flex,
  Icon,
  Link,
  Menu,
  MenuButton,
  Text,
  Tooltip
} from '@chakra-ui/react'
import { motion } from 'framer-motion'

const SidebarItem = ({ menuState, icon, title, link, path }) => {
  const active = path === link

  return (
    <Tooltip
      hasArrow
      isDisabled={menuState == 'opened' ? true : false}
      label={
        <Flex p={2} flexDirection="column" align="center" justify="center">
          <Text fontSize="md" textColor={active ? '#000' : 'gray.600'}>
            {title}
          </Text>
        </Flex>
      }
      rounded={8}
      placement="right"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      bg={active ? '#7fe5d5' : '#CDEFEA'}
    >
      <Flex mt={30} flexDirection="column" w="100%" alignItems="flex-start">
        <Menu placement="right">
          <NextLink href={link} passHref>
            <Link
              boxShadow={active && '0 4px 12px 0 rgba(0, 0, 0, 0.05)'}
              bgGradient={active && 'linear(to-l, #02aab080, #00cdac80)'}
              //backgroundColor={active && '#AEC8CA'}
              rounded={8}
              p={[2, 3, 3]}
              _hover={
                !active && {
                  textDecoration: 'none',
                  bgGradient: 'linear(to-l, #02aab040, #00cdac40)',
                  boxShadow: '0 4px 12px 0 rgba(0, 0, 0, 0.05)'
                }
              }
              w={menuState == 'opened' && '100%'}
            >
              <MenuButton w="100%">
                <Flex justify="space-between">
                  <Icon
                    as={icon}
                    fontSize={['sm', 'xl', 'xl']}
                    color={active ? '#82AAAD' : 'gray.500'}
                    mt={1}
                  />
                  <motion.div
                    transition={{ duration: 0.25 }}
                    animate={{
                      width: menuState == 'opened' ? 100 : 0,
                      opacity: menuState == 'opened' ? 1.0 : 0.0
                    }}
                  >
                    <Text fontSize="sm" ml={5} isTruncated mt={1}>
                      {title}
                    </Text>
                  </motion.div>
                </Flex>
              </MenuButton>
            </Link>
          </NextLink>
        </Menu>
      </Flex>
    </Tooltip>
  )
}

export default SidebarItem
