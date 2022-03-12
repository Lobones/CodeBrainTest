import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent
} from '@chakra-ui/react'

const CustomDrawer = ({ header, body, footer, isOpen, onClose, buttonRef }) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={buttonRef}
        orientation="vertical"
        align="center"
        size="md"
      >
        <DrawerOverlay backdropFilter="blur(2px)" />
        <DrawerContent borderTopLeftRadius={15} borderBottomLeftRadius={15}>
          <DrawerHeader
            boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
            borderBottom="1px solid #00000010"
            ml="3px"
            mt="5px"
          >
            {header}
          </DrawerHeader>
          <DrawerBody>{body}</DrawerBody>
          <DrawerFooter
            boxShadow="0px 0px 14px 0px rgba(0, 0, 0, 0.06)"
            borderTop="1px solid #00000010"
          >
            {footer}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CustomDrawer
