import React from 'react'

// StyleSheet
import styles from './PopUp.scss'

// Assets
import { ReactComponent as Cross } from '../../../assets/images/cross.svg'

class PopUp extends React.Component {
    static instance

    constructor(props) {
        super(props)

        PopUp.instance = this

        this.state = {
            popUpHidden: true,
            content: null,
            displayQuitButton: true,
            closeCallBack: null
        }
    }

    setContent = (content, closeCallBack = null) => {
        this.setState({
            popUpHidden: false,
            content,
            closeCallBack
        })
    }

    setContentWithoutQuitButton = (content, closeCallBack = null) => {
        this.setState({
            popUpHidden: false,
            displayQuitButton: false,
            content,
            closeCallBack
        })
    }

    hide = () => {
        this.setState({
            popUpHidden: true,
            content: null,
            closeCallBack: null
        })
    }

    onCrossClicked = () => {
        if (this.state.closeCallBack) {
            this.state.closeCallBack()
        }

        this.hide()
    }

    render() {
        if (this.state.popUpHidden) return null

        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    {this.state.displayQuitButton ? (
                        <Cross
                            className={styles.cross}
                            onClick={this.onCrossClicked}
                        />
                    ) : null}
                    {this.state.content}
                </div>
            </div>
        )
    }
}

export default PopUp
