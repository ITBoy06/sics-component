import React from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import styles from '../../../assets/styles/global.scss'

// Hooks
import { useStorage } from '../../../hooks/storage'

// Components
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'

const CouponsPage = (props) => {
  const [fetching, items, updateItems] = useStorage('sics-items')

  if (fetching) return null

  console.log(fetching)
  console.log(items)

  return (
    <div className={styles.page}>
      <Header
        onLeftIconClicked={props.onLeftArrowClicked}
        title='Mes Coupons'
      />
      <PageContent>
        <Spacer />
        <Button onClick={() => console.log('i was clicked')}>Hello</Button>
      </PageContent>
    </div>
  )
}

CouponsPage.propTypes = {
  onLeftArrowClicked: PropTypes.func.isRequired
}

export default CouponsPage
