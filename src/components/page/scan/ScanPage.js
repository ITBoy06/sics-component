import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'

// StyleSheet
import global from '../../../assets/styles/global.scss'

// Hooks
import { useStorage } from '../../../hooks/storage'

// Components
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import CameraList from './camera/list/CameraList'
import Camera from './camera/Camera'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'

// Reducer
const initialState = {
    initialisation: true,
    showSpinner: false,
    showCamera: false,
    coupons: {},
    boxSelected: -1
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                initialisation: false,
                coupons: action.payload
            }
        case 'boxClicked':
            return { ...state, showCamera: true, boxSelected: action.payload }
        case 'closeCamera':
            return { ...state, showCamera: false }
        case 'addPicture':
            return {
                ...state,
                coupons: {
                    ...state.coupons,
                    [state.boxSelected]: {
                        ...state.coupons[state.boxSelected],
                        receipt_img: action.payload
                    }
                },
                showCamera: false,
                boxSelected: -1
            }
        default:
            throw new Error()
    }
}

const ScanPage = (props) => {
    const [fetching, coupons, actions] = useStorage()
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        if (Object.keys(coupons).length !== 0) {
            let couponsObj = {}

            for (let id in coupons) {
                couponsObj[id] = { ...coupons[id] }
                couponsObj[id]['receipt_img'] = ''
            }

            dispatch({ type: 'init', payload: couponsObj })
        }
    }, [coupons])

    const checkPicturesNumber = () => {
        for (let id in state.coupons) {
            if (!state.coupons[id].receipt_img) return false
        }

        return true
    }

    if (state.initialisation) return null

    if (state.showCamera)
        return (
            <Camera
                onPictureTaken={(image) =>
                    dispatch({ type: 'addPicture', payload: image })
                }
                onCancel={() =>
                    dispatch({ type: 'closeCamera', payload: null })
                }
            />
        )

    return (
        <div className={global.page}>
            <Header
                onLeftIconClicked={props.onLeftArrowClicked}
                title='Vérification des achats'
            />
            <PageContent>
                <p>
                    Pour valider l'achat des produits vous permettant d'être
                    remboursé, nous allons devoir vérifier votre ticket de
                    caisse.
                    <br />
                    <br />
                    Veuillez donc prendre en photo la partie du ticket de caisse
                    affichant les articles que vous avez achetés. Nous vous
                    conseillons de prendre plusieurs photos de cette section au
                    lieu de tout faire en une fois.
                </p>
                <CameraList
                    onBoxClicked={(couponId) =>
                        dispatch({ type: 'boxClicked', payload: couponId })
                    }
                    items={Object.values(state.coupons)}
                />
                <Spacer />
                <Button
                    onClick={() => console.log('Hello')}
                    disabled={!checkPicturesNumber()}
                >
                    Valider mes photos
                </Button>
            </PageContent>
        </div>
    )
}

ScanPage.propTypes = {
    onLeftArrowClicked: PropTypes.func.isRequired,
    onReceiptValidated: PropTypes.func.isRequired
}

export default ScanPage
