import React from 'react'

// StyleSheet
import styles from './Spinner.scss'

// Assets
import { ReactComponent as SpinnerGif } from '../../../assets/images/Spinner-1s-200px.svg'

const Spinner = () => {
    return (
        <div className={styles.container}>
            <SpinnerGif className={styles.image} />
        </div>
    )
}

export default Spinner
