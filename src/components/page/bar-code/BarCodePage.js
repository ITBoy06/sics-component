import React, { useState } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import global from '../../../assets/styles/global.scss'

// Utils
import { api } from '../../../utils/api'
import { storage } from '../../../utils/storage'

// Assets
import { ReactComponent as RedCross } from '../../../assets/images/cross.svg'

// Components
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import BarCodeReader from './reader/BarCodeReader'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'
import PopUp from '../../generic/pop-up/PopUp'
import Spinner from '../../generic/spinner/Spinner'

const BarCodePage = (props) => {
    const [showCamera, setShowCamera] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false)

    const handleBarCodeFound = async (receipt_id) => {
        setShowCamera(false)
        setShowSpinner(true)

        const receiptAlreadyScanned = await api.receiptServer.isReceiptAlreadyScanned(
            receipt_id,
            storage.getTokenFromCoupon()
        )

        setShowSpinner(false)

        if (receiptAlreadyScanned) {
            PopUp.instance.setContentWithoutQuitButton(
                <React.Fragment>
                    <RedCross className='illustration red' />
                    <p>
                        Désolé, il semblerait que ce ticket de caisse a déjà été
                        utilisé auparavant. Il est donc impossible de continuer
                        le processus de remboursement. Nous allons vous
                        rédiriger vers la page d'acceuil
                    </p>
                </React.Fragment>
            )

            setTimeout(() => {
                // Deleting all coupons in local storage
                storage.deleteAllCouponsInStorage()

                props.onReceiptNumberInvalidated()
            }, 1200)
            return
        }

        props.onReceiptNumberValidated()
    }

    if (showCamera) return <BarCodeReader onBarCodeFound={handleBarCodeFound} />

    return (
        <div className={global.page}>
            {showSpinner ? <Spinner /> : null}
            <Header title='Vérification code barre' />
            <PageContent>
                <p>
                    Pour des raisons de sécurité, nous allons avoir besoin
                    d'identifier votre ticket de caisse.
                    <br />
                    <br />
                    Veuillez donc scanner le dernier code barre se trouvant en
                    bas de votre ticket de caisse s'il vous plait.
                </p>
                <Spacer />
                <Button onClick={() => setShowCamera(true)}>
                    Scanner le code barre
                </Button>
            </PageContent>
        </div>
    )
}

BarCodePage.propTypes = {
    onReceiptNumberValidated: PropTypes.func.isRequired,
    onReceiptNumberInvalidated: PropTypes.func.isRequired
}

export default BarCodePage
