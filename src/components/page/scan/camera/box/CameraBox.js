import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CameraBox.scss'

// Assets
import { ReactComponent as Camera } from '../../../../../assets/images/camera.svg'

const CameraBox = (props) => {
    const renderContent = () => {
        if (props.image) {
            return (
                <img
                    className={styles.image}
                    src={props.image}
                    alt='box-image'
                />
            )
        }

        return <Camera />
    }

    return (
        <div className={styles.container} onClick={props.onBoxClicked}>
            {renderContent()}
        </div>
    )
}

CameraBox.propTypes = {
    onBoxClicked: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired
}

export default CameraBox
