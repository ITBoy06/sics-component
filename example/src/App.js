import React, { useEffect, useState } from 'react'

import { CouponSection, Spinner, storage, api } from 'sics'
import 'sics/dist/index.css'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            coupon: {}
        }
    }

    onButtonClicked = () => {
        // You should redirect the user to the CouponsPage
    }

    onToggle = (active) => {
        const { id: campaign_id, token } = this.state.coupon

        // You need to set the authorization-bearer
        api.couponServer.setToken(token)

        if (active) {
            // Increasing the number of current beneficiaries
            return api.couponServer.increaseNumberBeneficiariesForCampaign(
                campaign_id
            )
        }

        // Decreasing the number of current beneficiaries
        api.couponServer.decreaseNumberBeneficiariesForCampaign(campaign_id)
    }

    componentDidMount() {
        const campaignId = 'cc_regerg54546' // I suppose that you have this information

        // Checking if a coupon campaign exists in db for a specific item
        const couponCampaign = storage.checkCouponCampaignExistence(campaignId)

        if (couponCampaign !== null) {
            this.setState({ coupon: couponCampaign })
            return
        }

        // Querying the server to know whether or not we can display the coupon section
        const rep = api.couponsServer.canDisplayCouponSection(campaignId)

        if (rep.display) {
            const coupon = {
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
                currency: 'eur',
                coupon_val: 50
            }

            // This property is used to determine the state of the toggle
            coupon.active = true

            // This is a mandatory object for lots of communications with our different servers
            coupon.token = rep.token

            this.setState({ coupon })
        }
    }

    render() {
        if (Object.keys(this.state.coupon).length === 0) return <Spinner />

        return (
            <CouponSection
                onToggle={this.onToggle}
                onButtonClicked={this.onButtonClicked}
                coupon={this.state.coupon}
            />
        )
    }
}

// const App = () => {
//     const [items, setItems] = useState(null)
//     useEffect(() => {
//         const itemsS = {
//             cc_regerg54546: {
//                 id: 'cc_regerg54546',
//                 product: {
//                     id: 'prod_kfeezjfehg',
//                     name: 'Mozzarella',
//                     receipt_name: 'RAVIOLES DU DAUPHI',
//                     image:
//                         'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/3032567/580x580.jpg'
//                 },
//                 brand: {
//                     name: 'Galbani'
//                 },
//                 coupon_val: 50,
//                 currency: 'eur',
//                 active: true,
//                 token:
//                     'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX3JlZ2VyZzU0NTQ2In0.aWr1ghK6P_0GgW17WXKzcQh-reKlsX0J183W3m9BjI0'
//             },
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
//         window.localStorage.setItem('sics-items', JSON.stringify(itemsS))
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
