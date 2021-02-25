import React, { useState } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './Toggle.scss'

const Toggle = (props) => {
  const [active, setActive] = useState(false)

  const handleCircleClicked = () => {
    props.onStatusChanged(!active)
    setActive(!active)
  }

  return (
    <div className={active ? styles.containerActive : styles.container}>
      <div className={styles.circle} onClick={handleCircleClicked} />
    </div>
  )
}

Toggle.propTypes = {
  onStatusChanged: PropTypes.func.isRequired
}

export default Toggle
