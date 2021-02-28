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
            active: this.props.campaign.active
        }
        this.componentDidMount = this.componentDidMount.bind(this)
        this.couponActivationChange = this.couponActivationChange.bind(this)
    }

    componentDidMount() {
        const { campaign } = this.props

        // Adding coupon campaign in storage
        storage.addCampaignInStorage(campaign.id, campaign)
    }

    couponActivationChange(status) {
        const { campaign } = this.props

        // Saving changes in storage
        storage.updateCampaignObject(campaign.id, 'active', status)

        // Updating state
        this.setState({ active: status })
    }

    render() {
        const { active } = this.state
        const { campaign } = this.props
        const somme = campaign.coupon_val / 100

        return (
            <div className={styles.container}>
                <div className={styles.section}>
                    <div className={styles.text}>
                        <p>
                            Remise de {somme.toPrecision(2)}€ pour l'achat de ce
                            produit. Pour bénéficier, activez le coupon
                            ci-contre, puis rendez-vous sur "Mes avantages"
                            après votre passage en caisse.
                        </p>
                    </div>
                    <div className={styles.toggleZone}>
                        <Toggle
                            defaultChecked={active}
                            onStatusChanged={this.couponActivationChange}
                        />
                        <span>Coupon {somme.toPrecision(2)}€</span>
                    </div>
                </div>
                {active ? (
                    <Button onClick={this.props.onButtonClicked}>
                        Me faire rembourser {somme.toPrecision(2)}€
                    </Button>
                ) : null}
            </div>
        )
    }
}

CouponSection.propTypes = {
    onToggle: PropTypes.func.isRequired,
    onButtonClicked: PropTypes.func.isRequired,
    campaign: PropTypes.object.isRequired
}

export default CouponSection
