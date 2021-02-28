import * as _ from 'lodash'

const storageIdentifier = 'sics-campaigns'

const getCampaignsFromStorage = () => {
    const items = JSON.parse(window.localStorage.getItem(storageIdentifier))

    if (!items) return {}

    return items
}

const removeCampaignFromStorage = (campaignId) => {
    const campaigns = getCampaignsFromStorage()
    const newCampaignsObj = { ...campaigns }

    delete newCampaignsObj[campaignId]

    saveCampaignsInStorage(newCampaignsObj)
}

const addCampaignInStorage = (id, campaign) => {
    const campaigns = getCampaignsFromStorage()
    const newCampaignsObj = { ...campaigns }

    newCampaignsObj[id] = campaign

    saveCampaignsInStorage(newCampaignsObj)
}

const checkCampaignExistence = (campaignId) => {
    const campaigns = getCampaignsFromStorage()

    if (campaigns[campaignId]) return campaigns[campaignId]

    return null
}

const checkCampaignExistenceForProduct = (productId) => {
    const campaigns = getCampaignsFromStorage()

    for (const id in campaigns) {
        if (campaigns[id].product.id === productId) {
            return campaigns[id]
        }
    }

    return null
}

const updateCampaignObject = (campaignId, field, value) => {
    const campaigns = getCampaignsFromStorage()
    const campaign = campaigns[campaignId]

    if (_.isEmpty(campaign))
        throw new Error(`There is no campaign with id ${campaignId} in storage`)

    const newCampaignsObj = {
        ...campaigns,
        [campaignId]: { ...campaigns[campaignId], [field]: value }
    }

    saveCampaignsInStorage(newCampaignsObj)
}

const saveCampaignsInStorage = (campaignsObj) => {
    window.localStorage.setItem(storageIdentifier, JSON.stringify(campaignsObj))
}

const getTokenFromCampaign = () => {
    const campaigns = getCampaignsFromStorage()
    return Object.values(campaigns)[0].token
}

const deleteAllCampaignsInStorage = () => {
    window.localStorage.setItem(storageIdentifier, JSON.stringify({}))
}

export const storage = {
    getCampaignsFromStorage,
    removeCampaignFromStorage,
    addCampaignInStorage,
    getTokenFromCampaign,
    deleteAllCampaignsInStorage,
    checkCampaignExistenceForProduct,
    checkCampaignExistence,
    updateCampaignObject
}
