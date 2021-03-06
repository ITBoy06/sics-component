import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Quagga from 'quagga-scanner'

// StyleSheet
import global from '../../../../assets/styles/global.scss'
import styles from './BarCodeReader.scss'

// Utils
import { image } from '../../../../utils/image'

// Assets
import { ReactComponent as Corner } from '../../../../assets/images/corner.svg'

// Hooks
import { useUserMedia } from '../../../../hooks/userMedia'

const CAPTURE_OPTIONS = {
    audio: false,
    video: {
        facingMode: 'environment',
        height: { min: window.screen.height }
    }
}

const BarCodeReader = (props) => {
    const videoRef = useRef()
    const interval = useRef()
    const mediaStream = useUserMedia(CAPTURE_OPTIONS)

    useEffect(() => {
        interval.current = setInterval(() => {
            const barCodeImg = image.getBarCode()

            Quagga.decodeSingle(
                {
                    decoder: {
                        readers: ['i2of5_reader'] // List of active readers
                    },
                    src: barCodeImg
                },
                function (result) {
                    if (result?.codeResult?.code) {
                        const code = result.codeResult.code

                        if (code.length === 24) {
                            props.onBarCodeFound(result.codeResult.code)
                        }
                    }
                }
            )
        }, [1000])

        return () => {
            clearInterval(interval.current)
        }
    }, [])

    const handleCanPlay = () => {
        videoRef.current.play()
    }

    const renderCorners = () => {
        let arr = []

        for (let i = 1; i <= 4; i++) {
            arr.push(<Corner key={i} className={styles.corner} />)
        }

        return arr
    }

    if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = mediaStream
    }

    return (
        <div className={styles.container}>
            <video
                id='camera-video'
                className={global.camera}
                ref={videoRef}
                onCanPlay={handleCanPlay}
                playsInline
            />
            {renderCorners()}
        </div>
    )
}

BarCodeReader.propTypes = {
    onBarCodeFound: PropTypes.func.isRequired
}

export default BarCodeReader
