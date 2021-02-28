import React, { useEffect, useState } from 'react'

import { CouponSection, Spinner, storage, api } from 'sics'
import 'sics/dist/index.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            fetchingData: true,
            campaign: {}
        }
    }

    onButtonClicked = () => {
        // You should redirect the user to the CouponsPage
    }

    onToggle = (active) => {
        const { id: campaignId, token } = this.state.campaign

        // You need to set the authorization-bearer
        api.couponsServer.setToken(token)

        if (active) {
            // Increasing the number of current beneficiaries
            return api.couponsServer.increaseNumberBeneficiariesForCampaign(
                campaignId
            )
        }

        // Decreasing the number of current beneficiaries
        api.couponsServer.decreaseNumberBeneficiariesForCampaign(campaignId)
    }

    async componentDidMount() {
        const campaignId = 'cc_regerg54546' // I suppose that you have this information

        // Checking if a coupon campaign exists in db for a specific item
        const campaign = storage.checkCampaignExistence(campaignId)

        if (campaign !== null) {
            this.setState({ campaign, fetchingData: false })
            return
        }

        // Querying the server to know whether or not we can display the coupon section
        const rep = await api.couponsServer.canDisplayCouponSection(campaignId)

        if (rep.display) {
            const campaign = {
                // I suppose that you are able to construct this kind of object by your own
                id: 'cc_regerg54546',
                product: {
                    id: 'prod_kfeezjfehg',
                    name: 'Mozzarella',
                    receipt_name: 'RAVIOLES DU DAUPHI',
                    image:
                        'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/3032567/580x580.jpg'
                },
                brand: {
                    name: 'Galbani'
                },
                coupon_val: 50,
                currency: 'eur'
            }

            // This is a mandatory object for lots of communications with our different servers
            campaign.token = rep.token

            this.setState({ campaign, fetchingData: false })
        }
    }

    render() {
        if (this.fetchingData) return <Spinner />

        if (Object.keys(this.state.campaign).length === 0) return null

        return (
            <CouponSection
                onToggle={this.onToggle}
                onButtonClicked={this.onButtonClicked}
                campaign={this.state.campaign}
            />
        )
    }
}

// const App = () => {
//     const [items, setItems] = useState(null)
//     useEffect(() => {
//         const itemsS = {
//             cc_grzgre4545454: {
//                 id: 'cc_grzgre4545454',
//                 product: {
//                     id: 'prod_kfeslsgh',
//                     name: 'Spécialité de saucisson sec',
//                     receipt_name: 'POMELO CHINOIS',
//                     image:
//                         'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/2223027/580x580.jpg'
//                 },
//                 brand: {
//                     name: 'Monoprix'
//                 },
//                 coupon_val: 50,
//                 currency: 'eur',
//                 active: true,
//                 token:
//                     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX2dyemdyZTQ1NDU0NTQifQ.w2AU4LjPaXCSAllBDDSeHZkO1OMiw4DpJF2ngSAbi4w'
//             }
//         }
//
//         setItems(itemsS)
//
//         window.localStorage.setItem('sics-campaigns', JSON.stringify(itemsS))
//     }, [])
//
//     if (!items) return null
//
//     return (
//         <React.Fragment>
//             <Spinner />
//         </React.Fragment>
//     )
// }

export default App
