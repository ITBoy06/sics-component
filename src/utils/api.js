import axios from 'axios'
import { image } from './image'

class Server {
    authToken = null
    baseUrl = null

    setToken(token) {
        this.authToken = token
    }

    setBaseUrl(url) {
        this.baseUrl = url
    }
}

class CouponsServer extends Server {
    async canDisplayCouponSection(campaignId) {
        const url = `${this.baseUrl}/api/campaign${campaignId}`
        const rep = await axios.get(url)

        return rep.data
    }

    increaseNumberBeneficiariesForCampaign(campaignId) {
        const url = `${this.baseUrl}/api/campaign${campaignId}/beneficiaries/?action=add`

        axios.patch(url, null, { headers: { Authorization: this.authToken } })
    }

    decreaseNumberBeneficiariesForCampaign(campaignId) {
        const url = `${this.baseUrl}/api/campaign/${campaignId}/beneficiaries/?action=withdraw`

        axios.patch(url, null, { headers: { Authorization: this.authToken } })
    }
}

class OcrServer extends Server {
    async getIdentifiedItemsFromServer(items) {
        // eslint-disable-next-line no-undef
        const bodyFormData = new FormData()

        for (const cpId of Object.keys(items)) {
            const block = items[cpId].receipt_img.split(';')
            const contentType = block[0].split(':')[1]
            const realData = block[1].split(',')[1]

            const blob = image.base64ToBlob(realData, contentType)

            bodyFormData.append(`${cpId}-image`, blob)
            bodyFormData.append(
                `${cpId}-name`,
                items[cpId].receipt_product_name
            )
        }

        // Then we will query the server to retrieve identified items
        const rep = await axios
            .post(this.baseUrl, bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .catch(() => {
                return null
            })

        if (!rep) return []

        return rep.data.items_identified
    }
}

class ReceiptsServer extends Server {
    async isReceiptAlreadyScanned(receiptId, token) {
        const rep = await axios.get(
            `${this.baseUrl}/api/receipt/rcpt_${receiptId}`,
            {
                headers: {
                    Authorization: token
                }
            }
        )

        return rep.data.alreadyScanned
    }
}

class StripeServer extends Server {
    async receivePaymentIntent(campaignItems) {
        const jsonObject = JSON.stringify({
            campaign_items: campaignItems
        })
        const rep = await axios.post(
            `${this.baseUrl}/api/reimbursement/client`,
            jsonObject,
            {
                headers: {
                    Authorization: this.authToken,
                    'Content-Type': 'application/json'
                }
            }
        )

        return rep.data.client_secret
    }
}

export const api = {
    couponsServer: new CouponsServer(),
    ocrServer: new OcrServer(),
    receiptsServer: new ReceiptsServer(),
    stripeServer: new StripeServer()
}
