import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CameraList.scss'

// Components
import CameraBox from '../box/CameraBox'

const CameraList = (props) => {
    const renderBoxes = () => {
        return props.items.map((item, index) => {
            return (
                <CameraBox
                    key={item.id}
                    onBoxClicked={() => props.onBoxClicked(item.id)}
                    image={item.receipt_img}
                />
            )
        })
    }
    return <div className={styles.container}>{renderBoxes()}</div>
}

CameraList.propTypes = {
    onBoxClicked: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}

export default CameraList
