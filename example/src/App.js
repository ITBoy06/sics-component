import React, { useEffect } from 'react'

import { BarCodePage, PopUp } from 'sics'
import 'sics/dist/index.css'

const App = () => {
    useEffect(() => {
        const items = {
            'cc_62ec294d-5fa8-454d-ac78-1e83cca06c93': {
                id: 'cc_62ec294d-5fa8-454d-ac78-1e83cca06c93',
                product_name: 'Mozzarella',
                receipt_product_name: 'RAVIOLES DU DAUPHI',
                brand_name: 'Galbani',
                image_src:
                    'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/3032567/580x580.jpg',
                coupon_value: 50,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiZGF0YSJ9.KAxu7OyOPNANLNQBl0mq2Un_0QY3dYw3H4yV2CYzZDM'
            },
            'cc_62ec294d-5fa8-454d-ac78-1e83cca0994328': {
                id: 'cc_62ec294d-5fa8-454d-ac78-1e83cca0994328',
                product_name: 'Spécialité de saucisson sec',
                receipt_product_name: 'POMELO CHINOIS',
                brand_name: 'Monoprix',
                image_src:
                    'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/2223027/580x580.jpg',
                coupon_value: 50,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJkYXRhIjoiZGF0YSJ9.KAxu7OyOPNANLNQBl0mq2Un_0QY3dYw3H4yV2CYzZDM'
            }
        }

        window.localStorage.setItem('sics-items', JSON.stringify(items))
    }, [])

    return (
        <React.Fragment>
            <PopUp />
            <BarCodePage
                onReceiptNumberValidated={() =>
                    console.log('receipt validated')
                }
                onReceiptNumberInvalidated={() =>
                    console.log('receipt invalidated')
                }
            />
        </React.Fragment>
    )
}

export default App
