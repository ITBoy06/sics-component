import React from 'react'
import * as _ from 'lodash'

// StyleSheet
import global from '../../../assets/styles/global.scss'

// Utils
import { api } from '../../../utils/api'
import { storage } from '../../../utils/storage'

// Components
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import Spinner from '../../generic/spinner/Spinner'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'

class StripePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            campaigns: {}
        }
    }

    onButtonClicked = async () => {
        // Defining the token needed for the request
        api.stripeServer.setToken(storage.getTokenFromCampaign())

        // TODO: Tu vas devoir remplir ce tableau pour qu'il soit de la forme [{id: cc_elfeggergerge, coupon_val: 50}, {id:cc_lefezfzg, coupon_val:60}]
        const campaignItems = []
        const clientSecret = await api.stripeServer.receivePaymentIntent()

        // TODO: À partir du client secret tu vas devoir appeler une certaine fonction stripe pour valider le paiement
    }

    componentDidMount() {
        // TODO: Tu dois charger les campagnes qui sont dans le local storage sert toi de mon objet storage et place ces derniers dans le state
    }

    render() {
        const totalAmount = 50 / 100 // Tu devras calculer toi même le montant total à partir du champ campaigns présent dans le state

        if (_.isEmpty(this.state.campaigns)) return <Spinner />

        return (
            <div className={global.page}>
                <Header title='Remboursement' />
                <PageContent>
                    <p>
                        Tu devrais mettre un texte ici pour expliquer pourquoi
                        on a besoin de prendre leur numéro de carte bleue
                    </p>
                    <div>
                        Ici tu devras mettre le bloc un bloc avec des champs
                        pour remplir les coordonnées bancaires
                    </div>
                    <Spacer />
                    <Button onClick={this.onButtonClicked}>
                        Me faire rembourser {totalAmount.toPrecision(2)} €
                    </Button>
                </PageContent>
            </div>
        )
    }
}

export default StripePage
