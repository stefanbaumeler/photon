export const columns: { [key: string]: { width: string } } = {
    selectable: {
        width: '36px'
    },
    favorite: {
        width: '64px'
    },
    archive: {
        width: ''
    },
    preview: {
        width: '80px'
    },
    title: {
        width: ''
    },
    camera: {
        width: '80px'
    },
    filenameDownload: {
        width: ''
    },
    description: {
        width: ''
    },
    tags: {
        width: ''
    },
    mediaCount: {
        width: ''
    },
    dateCreated: {
        width: '120px'
    },
    dateTaken: {
        width: '120px'
    },
    location: {
        width: ''
    },
    country: {
        width: ''
    },
    mimetype: {
        width: '150px'
    },
    owner: {
        width: '56px'
    },
    uploader: {
        width: '56px'
    },
    favoredBy: {
        width: ''
    },
    cameraMake: {
        width: ''
    },
    cameraModel: {
        width: ''
    },
    fNumber: {
        width: ''
    },
    flash: {
        width: ''
    },
    focalLength: {
        width: ''
    },
    height: {
        width: ''
    },
    width: {
        width: ''
    },
    iso: {
        width: ''
    },
    controls: {
        width: '112px'
    },
}

export const order = (key: string) => {
    return Object.keys(columns).indexOf(key)
}
