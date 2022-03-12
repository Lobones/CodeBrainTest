import { motion } from 'framer-motion'
import Head from 'next/head'

const variants = {
  initial: { opacity: 0, x: 0, y: 20 },
  animate: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: -0, y: 20 }
}

const Body = ({ children, title }) => (
  <motion.article
    initial="initial"
    animate="animate"
    exit="exit"
    variants={variants}
    transition={{ duration: 0.6, type: 'easeInOut' }}
    style={{ position: 'relative' }}
  >
    <>
      {title && (
        <Head>
          <title>{title}</title>
        </Head>
      )}
      {children}
    </>
  </motion.article>
)

export default Body
