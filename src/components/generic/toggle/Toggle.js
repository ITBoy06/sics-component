import React, { useState } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './Toggle.scss'

const Toggle = (props) => {
  const [active, setActive] = useState(!!props.defaultChecked)

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
  onStatusChanged: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool
}

export default Toggle
