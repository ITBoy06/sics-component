import React, { useState } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CouponList.scss'

// Assets
import { ReactComponent as LeftArrow } from '../../../../../assets/images/left-arrow.svg'
import { ReactComponent as RightArrow } from '../../../../../assets/images/right-arrow.svg'

// Components
import PopUp from '../../../../generic/pop-up/PopUp'
import CouponCard from '../card/CouponCard'
import Button from '../../../../generic/button/Button'

const CouponList = (props) => {
    const [indexItem, setIndexItem] = useState(0)

    const handleDeleteEvent = (index) => {
        const campaign = props.items[index]
        const prodName = campaign.product_name
        const brandName = campaign.brand_name

        PopUp.instance.setContent(
            <React.Fragment>
                <p>
                    Etes-vous sûr de vouloir supprimer le coupon du produit "
                    {prodName} - {brandName}" ?
                    <br />
                    <br />
                    <strong>
                        Si vous achetez ce produit, vous ne pourrez pas
                        bénéficier de l'offre de remboursement associée.
                    </strong>
                </p>
                <div className='buttons'>
                    <Button
                        onClick={() => {
                            PopUp.instance.hide()
                            setIndexItem(
                                indexItem !== 0 ? indexItem - 1 : indexItem
                            )
                            props.onRemoveItem(props.items[indexItem].id)
                        }}
                    >
                        Oui
                    </Button>
                    <Button
                        onClick={() => {
                            PopUp.instance.hide()
                        }}
                    >
                        Non
                    </Button>
                </div>
            </React.Fragment>
        )
    }

    const onLeftArrowClicked = () => {
        if (indexItem === 0) return null

        setIndexItem(indexItem - 1)
    }

    const onRightArrowClicked = () => {
        if (indexItem === props.items.length - 1) return null

        setIndexItem(indexItem + 1)
    }

    return (
        <div className={styles.list}>
            <LeftArrow
                className={
                    indexItem === 0 ? styles.disabledArrow : styles.arrow
                }
                onClick={onLeftArrowClicked}
            />
            <CouponCard
                onDelete={() => handleDeleteEvent(indexItem)}
                couponObj={props.items[indexItem]}
            />
            <RightArrow
                className={
                    indexItem === props.items.length - 1
                        ? styles.disabledArrow
                        : styles.arrow
                }
                onClick={onRightArrowClicked}
            />
        </div>
    )
}

CouponList.propTypes = {
    onRemoveItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired
}

export default CouponList
