import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CouponCard.scss'

// Components
import DeleteIcon from '../../icon/delete/DeleteIcon'

const CouponCard = (props) => {
    return (
        <div className={styles.card}>
            <DeleteIcon onClick={props.onDelete} />
            <img src={props.couponObj.image_src} alt='product-item' />
            <div className={styles.textContent}>
                <span>coupon</span>
                <span className='coupon_value'>
                    {(props.couponObj.coupon_val / 100).toPrecision(2)} €
                </span>
                <span className='product_name'>
                    {props.couponObj.product_name}
                </span>
                <span className='brand_name'>{props.couponObj.brand_name}</span>
            </div>
        </div>
    )
}

CouponCard.propTypes = {
    onDelete: PropTypes.func.isRequired,
    couponObj: PropTypes.object.isRequired
}

export default CouponCard
