import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalContent
} from '@chakra-ui/react'

const CustomModal = ({ header, body, footer, isOpen, onClose, buttonRef }) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        finalFocusRef={buttonRef}
        orientation="vertical"
        align="center"
        isCentered
      >
        <ModalOverlay backdropFilter="blur(2px)" />
        <ModalContent rounded={15}>
          <ModalHeader>{header}</ModalHeader>
          <ModalBody>{body}</ModalBody>
          <ModalFooter>{footer}</ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CustomModal
