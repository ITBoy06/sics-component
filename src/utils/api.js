import axios from 'axios'
import { base64ToBlob } from './image'

class Server {
    auth_token = null
    base_url = null

    setToken(token) {
        this.auth_token = token
    }
}

class CouponServer extends Server {
    constructor() {
        super()
        this.base_url = 'http://34a693b65be3.ngrok.io/api/campaign'
    }

    increaseNumberBeneficiariesForCampaign(campaign_id) {
        const url = `${this.base_url}/${campaign_id}/beneficiaries/?action=add`

        axios.patch(url, null, { headers: { Authorization: this.auth_token } })
    }

    decreaseNumberBeneficiariesForCampaign(campaign_id) {
        const url = `${this.base_url}/${campaign_id}/beneficiaries/?action=withdraw`

        axios.patch(url, null, { headers: { Authorization: this.auth_token } })
    }
}

class OcrServer extends Server {
    constructor() {
        super()
        this.base_url = 'https://ocr.eu.ngrok.io/api/ocr/'
    }

    async getIdentifiedItemsFromServer(items) {
        const bodyFormData = new FormData()

        for (const cp_id of Object.keys(items)) {
            const block = items[cp_id]['receipt_img'].split(';')
            const contentType = block[0].split(':')[1]
            const realData = block[1].split(',')[1]

            const blob = base64ToBlob(realData, contentType)

            bodyFormData.append(`${cp_id}-image`, blob)
            bodyFormData.append(
                `${cp_id}-name`,
                items[cp_id].receipt_product_name
            )
        }

        // Then we will query the server to retrieve identified items
        const rep = await axios.post(this.base_url, bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        return rep['data']['items_identified']
    }
}

class ReceiptsServer extends Server {
    constructor() {
        super()
        this.base_url = 'https://receipt.ngrok.io/api/receipt'
    }

    async isReceiptAlreadyScanned(receipt_id, token) {
        const rep = await axios.get(`${this.base_url}/${receipt_id}`, {
            headers: {
                Authorization: token
            }
        })

        return rep['data']['alreadyScanned']
    }
}

export const couponServer = new CouponServer()
export const ocrServer = new OcrServer()
export const receiptServer = new ReceiptsServer()
