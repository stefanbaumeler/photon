const getTauri = async () => {
    if (typeof window !== 'undefined' && window.__TAURI_IPC__ !== undefined) {
        return await import('@tauri-apps/api')
    }

    return undefined
}

const enableDragAndDrop = async (upload: (payload: string[]) => void) => {
    const tauri = await getTauri()

    if (!tauri) {
        return
    }

    return tauri.event.listen<string[]>(tauri.event.TauriEvent.WINDOW_FILE_DROP, (event) => {
        if (upload) {
            upload(event.payload)
        }
    })
}

const upload = async (files: File[]) => {
    const tauri = await getTauri()

    if (!tauri) {
        return
    }

    const file = files[0]

    const bin = await file.arrayBuffer()

    await tauri.fs.writeBinaryFile('test.jpg', bin, {
        dir: tauri.fs.BaseDirectory.AppData
    })

    await tauri.invoke('upload')
}

const read = async (filePaths: string[]) => {
    const tauri = await getTauri()

    if (!tauri) {
        return
    }

    const filePromises: Promise<Uint8Array>[] = []

    filePaths.forEach((filePath) => {
        filePromises.push(tauri.fs.readBinaryFile(filePath))
    })

    return await Promise.all(filePromises).then((results) => {
        return results.map((result) => {
            const blob = new Blob([result])
            return new File([blob], '', {
                type: 'image/jpeg'
            })
        })
    })
}

const createBaseDir = async () => {
    const tauri = await getTauri()

    if (!tauri) {
        return
    }
    tauri.fs.exists('', {
        dir: tauri.fs.BaseDirectory.AppData
    }).then((exists) => {
        if (!exists) {
            tauri.fs.createDir('', {
                dir: tauri.fs.BaseDirectory.AppData
            })
        }
    })
}

export default {
    getTauri,
    enableDragAndDrop,
    upload,
    read,
    createBaseDir
}
