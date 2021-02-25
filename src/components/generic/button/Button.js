import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './Button.scss'

const Button = (props) => {
  const style = props.disabled ? styles.containerDisabled : styles.container

  const handleOnClick = () => {
    if (props.disabled) return null

    props.onClick()
  }

  return (
    <div className={style} onClick={handleOnClick}>
      <span>{props.children}</span>
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool
}

export default Button
