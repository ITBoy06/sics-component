import React from 'react'

import { CouponSection } from 'sics'
import 'sics/dist/index.css'

const App = () => {
  return (
    <CouponSection
      onToggle={() => console.log('toggle status changed')}
      onButtonClicked={() => console.log('button was clicked')}
      coupon={{
        id: 'cp_20983557445',
        coupon_val: 50
      }}
    />
  )
}

export default App
