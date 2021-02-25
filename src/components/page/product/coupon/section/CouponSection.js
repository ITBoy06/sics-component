import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from './CouponSection.scss'

// Utils
import { storage } from '../../../../../utils/storage'

// Components
import Button from '../../../../generic/button/Button'
import Toggle from '../../../../generic/toggle/Toggle'

class CouponSection extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      actif: true
    }
    this.componentDidMount = this.componentDidMount.bind(this)
    this.couponActivationChange = this.couponActivationChange.bind(this)
  }

  componentDidMount() {
    const { coupon } = this.props

    storage.getCouponsFromStorage()

    storage.addCouponInStorage(coupon.id, coupon)
  }

  couponActivationChange(status) {
    const { coupon } = this.props

    this.setState({ actif: status })
    this.props.onToggle(status)

    if (status) {
      storage.addCouponInStorage(coupon.id, coupon)
    } else {
      storage.removeCouponFromStorage(coupon.id)
    }
  }

  render() {
    const { actif } = this.state
    const { coupon } = this.props
    const somme = coupon.coupon_val / 100

    return (
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.text}>
            <p>
              Remise de {somme}€ pour l'achat de ce produit. Pour bénéficier,
              activez le coupon ci-contre, puis rendez-vous sur "Mes avantages"
              après votre passage en caisse.
            </p>
          </div>
          <div className={styles.toggleZone}>
            <Toggle
              defaultChecked={this.state.actif}
              onStatusChanged={this.couponActivationChange}
            />
            <span>Coupon {somme}€</span>
          </div>
        </div>
        {actif && (
          <div>
            <Button onClick={this.props.onButtonClicked}>
              Me faire rembourser {somme}€
            </Button>
          </div>
        )}
      </div>
    )
  }
}

CouponSection.propTypes = {
  onToggle: PropTypes.func.isRequired,
  onButtonClicked: PropTypes.func.isRequired,
  coupon: PropTypes.object.isRequired
}

export default CouponSection
