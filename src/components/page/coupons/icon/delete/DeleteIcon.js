import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './DeleteIcon.scss'

// Assets
import { ReactComponent as Cross } from '../../../../../assets/images/cross.svg'

const DeleteIcon = (props) => {
    return (
        <div className={styles.container}>
            <Cross onClick={props.onClick} />
        </div>
    )
}

DeleteIcon.propTypes = {
    onClick: PropTypes.func.isRequired
}

export default DeleteIcon
