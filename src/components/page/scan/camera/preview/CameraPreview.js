import React from 'react'
import PropTypes from 'prop-types'

// Stylesheet
import styles from './CameraPreview.scss'

const CameraPreview = (props) => {
    return (
        <React.Fragment>
            <div className={styles.container}>
                <img
                    className={styles.image}
                    src={props.image}
                    alt='picture-taken'
                />
                <div className={styles.bottomContainer}>
                    <span onClick={props.onRetake}>Reprendre</span>
                    <span onClick={props.onPictureValidated}>Valider</span>
                </div>
            </div>
        </React.Fragment>
    )
}

CameraPreview.propTypes = {
    onPictureValidated: PropTypes.func.isRequired,
    onRetake: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired
}

export default CameraPreview
