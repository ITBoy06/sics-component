import React, { useReducer, useEffect } from 'react'
import PropTypes from 'prop-types'
import * as _ from 'lodash'

// StyleSheet
import global from '../../../assets/styles/global.scss'

// Utils
import { api } from '../../../utils/api'

// Hooks
import { useStorage } from '../../../hooks/storage'

// Assets
import { ReactComponent as SadFace } from '../../../assets/images/sad.svg'

// Components
import PopUp from '../../generic/pop-up/PopUp'
import Header from '../../generic/header/Header'
import PageContent from '../../generic/page/content/PageContent'
import CameraList from './camera/list/CameraList'
import Camera from './camera/Camera'
import Spacer from '../../generic/spacer/Spacer'
import Button from '../../generic/button/Button'
import Spinner from '../../generic/spinner/Spinner'

// Reducer
const initialState = {
    initialisation: true,
    showSpinner: false,
    showCamera: false,
    coupons: {},
    itemsNotIdentified: [],
    boxSelected: -1
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'init':
            return {
                ...state,
                initialisation: false,
                coupons: action.payload,
                itemsNotIdentified: Object.keys(action.payload)
            }
        case 'boxClicked':
            return { ...state, showCamera: true, boxSelected: action.payload }
        case 'closeCamera':
            return { ...state, showCamera: false }
        case 'hideSpinner':
            return { ...state, showSpinner: false }
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
        case 'queryingServer':
            return { ...state, showSpinner: true }

        case 'updateItemsNotIdentified':
            let newCouponsObj = { ...state.coupons }

            for (let id of action.payload) {
                newCouponsObj[id].receipt_img = null
            }

            return {
                ...state,
                itemsNotIdentified: action.payload,
                coupons: newCouponsObj
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

    const handleMisidentifiedItems = () => {
        PopUp.instance.setContent(
            <React.Fragment>
                <SadFace className='illustration' />
                <p>
                    Nous avons eu du mal à identifier certains articles...
                    Assurez vous de ne pas avoir oublié de retirer un coupon
                    pour un article que vous n'auriez pas acheté. Si ce n'est
                    pas le cas, il se peut que la photo prise contienne un léger
                    flou qui ne nous permet pas de la traiter.
                    <br />
                    <br />
                    Pourriez vous reprendre en photo les articles concernés s'il
                    vous plait ?
                </p>
                <Button onClick={() => PopUp.instance.hide()}>D'accord</Button>
            </React.Fragment>
        )
    }

    const handleButtonClicked = async () => {
        // Displaying spinner
        dispatch({ type: 'queryingServer' })

        // Get data identified
        const dataIdentified = await api.ocrServer.getIdentifiedItemsFromServer(
            state.coupons
        )

        const newItemsNotIdentified = _.difference(
            state.itemsNotIdentified,
            dataIdentified
        )

        // Hiding spinner
        dispatch({ type: 'hideSpinner' })

        console.log('test items')
        console.log(newItemsNotIdentified)

        // Checking if we found all the items
        if (newItemsNotIdentified.length === 0) {
            props.onReceiptValidated()
            return
        }

        // Displaying error message to the user
        handleMisidentifiedItems()

        // Checking if there was no change
        if (newItemsNotIdentified.length === state.itemsNotIdentified.length) {
            return
        }

        // Updating the state
        dispatch({
            type: 'updateItemsNotIdentified',
            payload: newItemsNotIdentified
        })
    }

    if (state.initialisation) return null

    if (state.showCamera)
        return (
            <Camera
                onPictureTaken={(image) =>
                    dispatch({ type: 'addPicture', payload: image })
                }
            />
        )

    return (
        <div className={global.page}>
            {state.showSpinner ? <Spinner /> : null}
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
                    items={state.coupons}
                    itemsNotIdentified={state.itemsNotIdentified}
                />
                <Spacer />
                <Button
                    onClick={handleButtonClicked}
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
