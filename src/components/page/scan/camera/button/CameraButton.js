import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CameraButton.scss'

// Assets
import { ReactComponent as Camera } from '../../../../../assets/images/camera.svg'

const CameraButton = (props) => {
    return (
        <div className={styles.container} onClick={props.onButtonClicked}>
            <Camera />
        </div>
    )
}

CameraButton.propTypes = {
    onButtonClicked: PropTypes.func.isRequired
}

export default CameraButton
