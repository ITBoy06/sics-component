# sics | User Manual

This document aims to explain how to use the components that have been developed by Hugo PEYRON and Freddy PHUNG and their usefulness in the coupon reimbursement process. To be more precise, this document will enter into the details of  the following components:

- PopUp
- SectionCoupon
- CouponsPage
- ScanPage
- BarCodePage






## Components

### PopUp

This component is used in our library simply to display pop-up message to users as it's shown on the figure below.







<img src="images/popup.png" alt="Screenshot 2021-02-27 at 18.05.30" style="zoom:50%;" />

#### Warning

As a great majority of our components rely on this component, you will have to declare an instance of the latter in the `render` method of your App component.

```jsx
import {PopUp} from 'sics'

class App extends React.Component {
    render() {
        return (
            <>
                <PopUp />
            </>
        )
    }
}
```



## CouponSection

This component should be displayed in the product page of a specific product every time the client receives a positive answer from the **CouponsServer** (that is to say when a coupon campaign exists for the scanned product at the moment of querying the server).



#### Illustration

<img src="images/couponsection.png" alt="Screenshot 2021-02-27 at 19.03.20" style="zoom:40%;" />



As you can observe, this component contains two main sub-components: a **button** and a **toggle**. It's important to notice that the button will be displayed only if the toggle is active. When a user clicks on the button, he or she will have to be redirected to the **CouponsPage**. Concerning the toggle, we provide a props that will allow you to be noticed every time the state of this component changes. Remember that **you must decrease the number of current beneficiaries for a specific coupon campaign if the state of the toggle changes from on to off and increase it otherwise. ** To do so, you will have to use our **api** object.



#### Code

```jsx
import { CouponSection, api } from 'sics'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            coupon: {
                id: 'cc_regerg54546',
                product_name: 'Mozzarella',
                receipt_product_name: 'RAVIOLES DU DAUPHI',
                brand_name: 'Galbani',
                currency: 'eur',
                image_src:
                    'https://cdn.monoprix.fr/cdn-cgi/image/width=580,quality=75,format=auto,metadata=none/assets/images/grocery/3032567/580x580.jpg',
                coupon_val: 50,
                token:
                    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJjY19pZCI6ImNjX3JlZ2VyZzU0NTQ2In0.aWr1ghK6P_0GgW17WXKzcQh-reKlsX0J183W3m9BjI0'
            }
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

    render() {
        return (
            <>
                <CouponSection
                    onToggle={this.onToggle}
                    onButtonClicked={this.onButtonClicked}
                    coupon={this.state.coupon}
                />
            </>
        )
    }
}
```



*Note: You will have to furnish the coupon object with all the properties mentioned above as our components will use them. Furthermore, the token that is contained in the coupon object will be returned by the couponsServer if and only if the server answers positively to our api request (our request to find out whether or not there is a coupon campaign for a specific product at the present time and whether we can benefit from it)*



### CouponsPage

This component sums up the total amount a user can be reimbursed for having purchased specific products displayed on the screen. In case, the consumer did not buy some products, he or she will be able to remove them by clicking on the red button located on the top-right corner of the product card.



#### Illustration

This component can display two content to the user based on the coupons that are stored in the local storage.





<img src="images/image-20210227200651702.png" alt="image-20210227200651702" style="zoom:50%;" />





<img src="images/image-20210227200719236.png" alt="image-20210227200719236" style="zoom:50%;" />



#### Code

```jsx
import { CouponsPage, PopUp } from 'sics'

class App extends React.Component {
    onLeftArrowClicked = () => {
        // You should redirect the user to the previous page (ie: HomePage)
    }

    onGoBackHomeClicked = () => {
        // You should redirect the user to the previous page (ie: HomePage)
    }

    onNextClicked = () => {
        // You should redirect the user to ScanPage
    }

    render() {
        return (
            <>
                <PopUp />
                <CouponsPage
                    onLeftArrowClicked={this.onLeftArrowClicked}
                    onGoBackHomeClicked={this.onGoBackHomeClicked}
                    onNextClicked={this.onNextClicked}
                />
            </>
        )
    }
}
```



### ScanPage

The purpose of this component is to ensure that the consumer has actually purchased the products that were displayed on the previous page (**Coupons Page**). Thus, in order to proceed to the next step in the coupon reimbursement process, the user will have to confirm the purchase step by taking several pictures. To be more precise, the user will have to click on a few rounded boxes and each of them will ask him/her to take a picture of the line of his/her receipt mentioning the name of a specific product. Then, all the photos will be sent to our **ocrServer** for verification. If the server answers positively, you will have to redirect the consumer to the **ocrServer**, otherwise a pop-up message will be displayed asking the user to take a picture for each product that has not been identified by the server.



#### Illustration



<img src="images/image-20210227212115698.png" alt="image-20210227212115698" style="zoom:50%;" />



<img src="images/image-20210227212304116.png" alt="image-20210227212304116" style="zoom:50%;" />

<img src="images/IMG_67105E1D6F40-1.jpeg" alt="IMG_67105E1D6F40-1" style="zoom:33%;" />

<img src="images/IMG_B0BB8D2E0810-1.jpeg" alt="IMG_B0BB8D2E0810-1" style="zoom:33%;" />

<img src="images/IMG_3FFC9A035775-1.jpeg" alt="IMG_3FFC9A035775-1" style="zoom:33%;" />



<img src="images/IMG_62AF16AC8F5D-1.jpeg" alt="IMG_62AF16AC8F5D-1" style="zoom:33%;" />

<img src="images/IMG_B849A4D7B8C0-1.jpeg" alt="IMG_B849A4D7B8C0-1" style="zoom:33%;" />



#### Code

```jsx
import { ScanPage, PopUp } from 'sics'

class App extends React.Component {
    onLeftArrowClicked = () => {
        // You should redirect the user to the previous page (ie: HomePage)
    }

    onReceiptItemsValidated = () => {
        // You should redirect the user to the next page (ie: BarCodePage)
    }

    render() {
        return (
            <>
                <PopUp />
                <ScanPage
                    onLeftArrowClicked={this.onLeftArrowClicked}
                    onReceiptItemsValidated={this.onReceiptItemsValidated}
                />
            </>
        )
    }
}
```



### BarCodePage

In one of our previous discussions, we raised the problem that a user could scan a receipt multiple times to earn money thanks to our project. To circumvent this problem, we have agreed to ask a user to scan the bar code of the receipt to verify that the latter has never been scanned. This is where the component **BarCodePage** comes in. As a matter of fact, the latter will ask a user to take the bar code of the receipt in picture. After that a request will be sent to the **receiptsServer** to determine if the receipt has already been registered in database. If this is the case, our component will display an error message followed by removing all coupons in storage and triggering an

*Note: As mentioned by Jonathan, this solution will need to be reinforced as a user could generate a random barcode. Nonetheless, if my memory serves me right, the number returned by the bar-code reader (which is the same as the one displayed just below the bar-code) contains some patterns that we could use like the date and the time the ticket was generated and that an attacker should be not aware of*.

<img src="images/image002.png" alt="image002" style="zoom:50%;" />

#### Illustration

<img src="images/image-20210227220753254.png" alt="image-20210227220753254" style="zoom:50%;" />



<img src="images/IMG_C3B45F89A293-1.jpeg" alt="IMG_C3B45F89A293-1" style="zoom:33%;" />

<img src="images/IMG_2358EE67DAC9-1.jpeg" alt="IMG_2358EE67DAC9-1" style="zoom:33%;" />



#### Code

```jsx
import { BarCodePage, PopUp } from 'sics'

class App extends React.Component {
    onReceiptNumberValidated = () => {
        // You should redirect the user to the next page (ie: StripePage)
    }

    onReceiptNumberInvalidated = () => {
        // You should redirect the user to the HomePage
    }

    render() {
        return (
            <>
                <PopUp />
                <BarCodePage
                    onReceiptNumberValidated={this.onReceiptNumberValidated()}
                    onReceiptNumberInvalidated={this.onReceiptNumberInvalidated()}
                />
            </>
        )
    }
}
```



That's all folks 😙



## License

This  library is released under the MIT licence  ©

---

This file was written with ❤️ by [FrenchHackCoeur](https://github.com/FrenchHackCoeur).
