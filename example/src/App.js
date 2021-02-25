import React, { useEffect } from 'react'

import { ScanPage, PopUp } from 'sics'
import 'sics/dist/index.css'

const App = () => {
    useEffect(() => {
        const items = {
            'cc_62ec294d-5fa8-454d-ac78-1e83cca06c93': {
                id: 'cc_62ec294d-5fa8-454d-ac78-1e83cca06c93',
                product_name: 'Mozzarella',
                receipt_product_name: 'CFR YOPLAIT CREME',
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
                receipt_product_name: 'ACTIVIA NATURE',
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
            <ScanPage
                onLeftArrowClicked={() => console.log('LeftArrow clicked')}
                onReceiptValidated={() =>
                    console.log('The receipt was validated')
                }
            />
        </React.Fragment>
    )
}

export default App
