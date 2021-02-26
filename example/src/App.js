import React, { useEffect, useState } from 'react'

import { BarCodePage, PopUp } from 'sics'
import 'sics/dist/index.css'

const App = () => {
    const [items, setItems] = useState(null)
    useEffect(() => {
        const itemsS = {
            cc_regerg54546: {
                id: 'cc_regerg54546',
                product_name: 'Mozzarella',
                receipt_product_name: 'RAVIOLES DU DAUPHI',
                brand_name: 'Galbani',
                image_src:
                    'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/3032567/580x580.jpg',
                coupon_val: 50,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX3JlZ2VyZzU0NTQ2In0.aWr1ghK6P_0GgW17WXKzcQh-reKlsX0J183W3m9BjI0'
            },
            cc_grzgre4545454: {
                id: 'cc_grzgre4545454',
                product_name: 'Spécialité de saucisson sec',
                receipt_product_name: 'POMELO CHINOIS',
                brand_name: 'Monoprix',
                image_src:
                    'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/2223027/580x580.jpg',
                coupon_val: 50,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX2dyemdyZTQ1NDU0NTQifQ.w2AU4LjPaXCSAllBDDSeHZkO1OMiw4DpJF2ngSAbi4w'
            }
        }

        setItems(itemsS)

        window.localStorage.setItem('sics-items', JSON.stringify(itemsS))
    }, [])

    if (!items) return null

    return (
        <React.Fragment>
            <PopUp />
            <BarCodePage
                onReceiptNumberInvalidated={() => console.log('')}
                onReceiptNumberValidated={() => console.log('')}
            />
            {/*<ScanPage*/}
            {/*    onLeftArrowClicked={() => console.log('left arrow')}*/}
            {/*    onReceiptValidated={() => console.log('receipt validated')}*/}
            {/*/>*/}
        </React.Fragment>
    )
}

export default App
