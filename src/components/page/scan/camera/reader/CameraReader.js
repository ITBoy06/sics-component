import React, { useRef } from 'react'
import PropTypes from 'prop-types'

// Stylesheet
import global from '../../../../../assets/styles/global.scss'
import styles from './CameraReader.scss'

// Hooks
import { useUserMedia } from '../../../../../hooks/userMedia'

// Utils
import { image } from '../../../../../utils/image'

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
        props.onPictureCaptured(image.getImageFromVideoTag())
    }

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream
    }

    return (
        <React.Fragment>
            <div className={styles.container}>
                <video
                    id='camera-video'
                    ref={videoRef}
                    className={global.camera}
                    onCanPlay={handleCanPlay}
                    playsInline
                />
                <div className={styles.bottomContainer}>
                    <CameraButton onButtonClicked={handleButtonClicked} />
                </div>
            </div>
        </React.Fragment>
    )
}

CameraReader.propTypes = {
    onPictureCaptured: PropTypes.func.isRequired
}

export default CameraReader
