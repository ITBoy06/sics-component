import React, { useState } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './Camera.scss'

// Components
import CameraReader from './reader/CameraReader'
import CameraPreview from './preview/CameraPreview'

const Camera = (props) => {
    const [imageContent, setImageContent] = useState(null)

    const handlePictureCaptured = (image) => {
        setImageContent(image)
    }

    const renderComponent = () => {
        if (!imageContent) {
            return <CameraReader onPictureCaptured={handlePictureCaptured} />
        } else {
            return (
                <CameraPreview
                    onPictureValidated={() =>
                        props.onPictureTaken(imageContent)
                    }
                    onCancel={props.onCancel}
                    image={imageContent}
                />
            )
        }
    }

    return renderComponent()
}

Camera.propTypes = {
    onCancel: PropTypes.func.isRequired,
    onPictureTaken: PropTypes.func.isRequired
}

export default Camera
