import React, { useEffect, useState } from 'react'

import { StripePage } from 'sics'
import 'sics/dist/index.css'

const App = () => {
    const [items, setItems] = useState(null)
    useEffect(() => {
        const itemsS = {
            cc_grzgre4545454: {
                id: 'cc_grzgre4545454',
                product: {
                    id: 'prod_kfeslsgh',
                    name: 'Spécialité de saucisson sec',
                    receipt_name: 'POMELO CHINOIS',
                    image:
                        'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/2223027/580x580.jpg'
                },
                brand: {
                    name: 'Monoprix'
                },
                coupon_val: 50,
                currency: 'eur',
                active: true,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX2dyemdyZTQ1NDU0NTQifQ.w2AU4LjPaXCSAllBDDSeHZkO1OMiw4DpJF2ngSAbi4w'
            }
        }

        setItems(itemsS)

        window.localStorage.setItem('sics-campaigns', JSON.stringify(itemsS))
    }, [])

    if (!items) return null

    return (
        <React.Fragment>
            <StripePage />
        </React.Fragment>
    )
}

export default App
