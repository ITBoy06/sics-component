import React, { useRef } from 'react'
import PropTypes from 'prop-types'

// Stylesheet
import styles from './CameraReader.scss'

// Hooks
import { useUserMedia } from '../../../../../hooks/userMedia'

// Utils
import { getImageFromVideoTag } from '../../../../../utils/image'

// Components
import CameraButton from '../button/CameraButton'

const CAPTURE_OPTIONS = {
    audio: false,
    video: {
        facingMode: 'environment'
    }
}

const CameraReader = (props) => {
    const videoRef = useRef()
    const mediaStream = useUserMedia(CAPTURE_OPTIONS)

    const handleCanPlay = () => {
        videoRef.current.play()
    }

    const handleButtonClicked = () => {
        props.onPictureCaptured(getImageFromVideoTag())
    }

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream
    }

    return (
        <React.Fragment>
            <video
                id='camera-video'
                className={styles.cameraReader}
                ref={videoRef}
                onCanPlay={handleCanPlay}
            />
            <div className={styles.container}>
                <CameraButton onButtonClicked={handleButtonClicked} />
            </div>
        </React.Fragment>
    )
}

CameraReader.propTypes = {
    onPictureCaptured: PropTypes.func.isRequired
}

export default CameraReader
