import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './Header.scss'

// Assets
import { ReactComponent as LeftArrow } from '../../../assets/images/left-arrow.svg'

const Header = (props) => {
    const renderIcon = () => {
        if (props.onLeftIconClicked !== undefined) {
            return (
                <div className={styles.iconContainer}>
                    <LeftArrow
                        className={styles.arrow}
                        onClick={props.onLeftIconClicked}
                    />
                </div>
            )
        }

        return null
    }
    return (
        <div className={styles.container}>
            {renderIcon()}
            <div className={styles.title}>{props.title}</div>
        </div>
    )
}

Header.propTypes = {
    onLeftIconClicked: PropTypes.func,
    leftIcon: PropTypes.string,
    title: PropTypes.string.isRequired
}

export default Header
