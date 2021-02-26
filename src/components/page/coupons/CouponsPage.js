import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import global from '../../../assets/styles/global.scss'
import styles from './CouponsPage.scss'

// Utils
import { api } from '../../../utils/api'

// Hooks
import { useStorage } from '../../../hooks/storage'

// Components
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import CouponList from './coupon/list/CouponList'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'

const CouponsPage = (props) => {
    const [fetching, coupons, actions] = useStorage()

    const handleRemoveCampaign = (campaign_id) => {
        const newCouponObjects = { ...coupons }
        delete newCouponObjects[campaign_id]

        // Removing this coupon campaign from storage
        actions.removeCoupon(campaign_id)

        // Calling coupon-server to reduce the number of current beneficiaries for a specific coupon campaign
        api.couponServer.setToken(newCouponObjects[campaign_id].token)
        api.couponServer.decreaseNumberBeneficiariesForCampaign(campaign_id)
    }

    const renderTotalReimbursement = () => {
        let total = 0

        for (let object of Object.values(coupons)) {
            total += object.coupon_value
        }

        return (
            <div className={styles.totalReimbursement}>
                <div className='text-content'>
                    <span>
                        Montant total de <br /> mes remboursements:
                    </span>
                </div>
                <span>{(total / 100).toPrecision(3)} €</span>
            </div>
        )
    }

    const renderContent = () => {
        if (Object.keys(coupons).length === 0) {
            return (
                <p>
                    Il semblerait que vous n'ayez activé aucun coupon.
                    <br />
                    <br />
                    Pour bénéficier d'un remboursement dû à une offre
                    commerciale, il vous suffit de scanner le QR code d'un
                    produit et d'activer le toggle de remboursement.
                    <br />
                    <br />
                    Une fois ce toggle activé, revenez sur cette page pour
                    continuer le processus de remboursement.
                </p>
            )
        }

        return (
            <React.Fragment>
                <p className='text-content'>
                    Vous trouverez ci-dessous la liste des produits pour
                    lesquels vous avez activé le toggle de réduction.
                    <br />
                    <br />
                    <strong>
                        Après votre passage en caisse, vous pourrez effectuer la
                        procédure de remboursement en appuyant sur le bouton en
                        bas de l'écran.
                    </strong>
                </p>
                <CouponList
                    onRemoveItem={handleRemoveCampaign}
                    items={Object.values(coupons)}
                />
                {renderTotalReimbursement()}
            </React.Fragment>
        )
    }

    const renderButtonContent = () => {
        if (Object.keys(coupons).length === 0) {
            return (
                <Button onClick={props.onGoBackHomeClicked}>
                    Retour acceuil
                </Button>
            )
        }

        return <Button onClick={props.onNextClicked}>Suivant</Button>
    }

    if (fetching) return null

    return (
        <div className={global.page}>
            <Header
                onLeftIconClicked={props.onLeftArrowClicked}
                title='Mes Coupons'
            />
            <PageContent>
                {renderContent()}
                <Spacer />
                {renderButtonContent()}
            </PageContent>
        </div>
    )
}

CouponsPage.propTypes = {
    onLeftArrowClicked: PropTypes.func.isRequired,
    onGoBackHomeClicked: PropTypes.func.isRequired,
    onNextClicked: PropTypes.func.isRequired
}

export default CouponsPage
