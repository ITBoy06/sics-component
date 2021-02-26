import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CameraList.scss'

// Components
import CameraBox from '../box/CameraBox'

const CameraList = (props) => {
    const renderBoxes = () => {
        return props.itemsNotIdentified.map((id) => {
            return (
                <CameraBox
                    key={id}
                    onTakePictureClicked={() => props.onBoxClicked(id)}
                    image={props.items[id].receipt_img}
                    product_image={props.items[id].image_src}
                />
            )
        })
    }
    return <div className={styles.container}>{renderBoxes()}</div>
}

CameraList.propTypes = {
    onBoxClicked: PropTypes.func.isRequired,
    items: PropTypes.object.isRequired,
    itemsNotIdentified: PropTypes.array.isRequired
}

export default CameraList
