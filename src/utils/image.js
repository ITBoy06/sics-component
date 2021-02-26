const getCanvas = () => {
    const video = document.getElementById('camera-video')
    const canvas = document.createElement('canvas')

    canvas.width = window.screen.width
    canvas.height = 0.7 * window.screen.height

    const context = canvas.getContext('2d')
    context.drawImage(video, 0, 0)

    return canvas
}

const getImageFromVideoTag = () => {
    return getCanvas().toDataURL()
}

const getBarCode = () => {
    const video = document.getElementById('camera-video')
    const canvas = document.createElement('canvas')

    // Get screen size
    const screenHeight = window.screen.height
    const screenWidth = window.screen.width

    // Computing offsets
    let topOffset = (42 / 100) * screenHeight
    let leftOffset = (3 / 100) * screenWidth

    // Computing image size
    const width = video.videoWidth - leftOffset * 2
    const height = video.videoHeight - topOffset * 2

    // Getting canvas context
    const ctx = canvas.getContext('2d')

    // Defining canvas size
    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    // Drawing entire screen
    ctx.drawImage(video, 0, 0)

    // Getting image from within the corners
    const imageData = ctx.getImageData(leftOffset, topOffset, width, height)

    // Redifining canvas size
    canvas.width = width
    canvas.height = height

    // Putting desired image in canvas
    ctx.putImageData(imageData, 0, 0)

    // Returning image
    return canvas.toDataURL('image/jpeg')
}

const base64ToBlob = (b64Data, contentType, sliceSize) => {
    contentType = contentType || ''
    sliceSize = sliceSize || 512

    var byteCharacters = atob(b64Data)
    var byteArrays = []

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize)

        var byteNumbers = new Array(slice.length)
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i)
        }

        var byteArray = new Uint8Array(byteNumbers)

        byteArrays.push(byteArray)
    }

    return new Blob(byteArrays, { type: contentType })
}

export const image = {
    getImageFromVideoTag,
    getBarCode,
    base64ToBlob
}
