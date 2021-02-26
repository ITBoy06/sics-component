import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CameraBox.scss'

// Assets
import { ReactComponent as Camera } from '../../../../../assets/images/camera.svg'

// Components
import PopUp from '../../../../generic/pop-up/PopUp'
import Button from '../../../../generic/button/Button'

const CameraBox = (props) => {
    const handleButtonClicked = () => {
        PopUp.instance.setContent(
            <React.Fragment>
                <img src={props.product_image} alt='product-image' />
                <p>
                    Veuillez prendre en photo s'il vous plait la ligne du ticket
                    de caisse associé au produit affiché ci-dessus.
                </p>
                <Button
                    onClick={() => {
                        PopUp.instance.hide()
                        props.onTakePictureClicked()
                    }}
                >
                    Prendre une photo
                </Button>
            </React.Fragment>
        )
    }

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
        <div className={styles.container} onClick={handleButtonClicked}>
            {renderContent()}
        </div>
    )
}

CameraBox.propTypes = {
    onTakePictureClicked: PropTypes.func.isRequired,
    product_image: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired
}

export default CameraBox
