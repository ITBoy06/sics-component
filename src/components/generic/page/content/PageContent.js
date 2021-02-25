import React from 'react'

// StyleSheet
import styles from './PageContent.scss'

const PageContent = (props) => {
  return <div className={styles.container}>{props.children}</div>
}

export default PageContent
