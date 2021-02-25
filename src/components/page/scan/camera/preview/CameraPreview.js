import React from 'react'
import PropTypes from 'prop-types'

// Stylesheet
import styles from './CameraPreview.scss'

const CameraPreview = (props) => {
    return (
        <React.Fragment>
            <img
                className={styles.image}
                src={props.image}
                alt='picture-taken'
            />
            <div className={styles.container}>
                <span onClick={props.onCancel}>Annuler</span>
                <span onClick={props.onPictureValidated}>Valider</span>
            </div>
        </React.Fragment>
    )
}

CameraPreview.propTypes = {
    onPictureValidated: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    image: PropTypes.string.isRequired
}

export default CameraPreview
