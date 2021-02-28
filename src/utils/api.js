import axios from 'axios'
import { image } from './image'

class Server {
    authToken = null
    baseUrl = null

    setToken(token) {
        this.auth_token = token
    }
}

class CouponsServer extends Server {
    constructor() {
        super()
        this.baseUrl = 'https://coupons.eu.ngrok.io/api/campaign'
    }

    canDisplayCouponSection(campaignId) {
        const url = `${this.baseUrl}/${campaignId}`
        const rep = axios.get(url)

        console.log(rep)
    }

    increaseNumberBeneficiariesForCampaign(campaignId) {
        const url = `${this.baseUrl}/${campaignId}/beneficiaries/?action=add`

        axios.patch(url, null, { headers: { Authorization: this.authToken } })
    }

    decreaseNumberBeneficiariesForCampaign(campaignId) {
        const url = `${this.baseUrl}/${campaignId}/beneficiaries/?action=withdraw`

        axios.patch(url, null, { headers: { Authorization: this.authToken } })
    }
}

class OcrServer extends Server {
    constructor() {
        super()
        this.baseUrl = 'https://ocr.eu.ngrok.io/api/ocr/'
    }

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
            .post(this.base_url, bodyFormData, {
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
    constructor() {
        super()
        this.baseUrl = 'https://receipt.ngrok.io/api/receipt'
    }

    async isReceiptAlreadyScanned(receiptId, token) {
        const rep = await axios.get(`${this.baseUrl}/rcpt_${receiptId}`, {
            headers: {
                Authorization: token
            }
        })

        return rep.data.alreadyScanned
    }
}

export const api = {
    couponsServer: new CouponsServer(),
    ocrServer: new OcrServer(),
    receiptsServer: new ReceiptsServer()
}
