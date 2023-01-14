import { DetectLabelsCommand, DetectTextCommand, DetectFacesCommand, RekognitionClient } from '@aws-sdk/client-rekognition'
import type { CVDriver } from '@photon/cv'

export default class CVRekognitionDriver implements CVDriver {
    client: RekognitionClient

    constructor () {
        this.client = new RekognitionClient({
            region: process.env.CV_REKOGNITION_REGION,
            credentials: {
                accessKeyId: process.env.CV_REKOGNITION_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.CV_REKOGNITION_SECRET_ACCESS_KEY as string
            }
        })
    }
    labels = async (buffer: Buffer) => {
        const command = new DetectLabelsCommand({
            Image: {
                Bytes: buffer
            },
            MinConfidence: 80
        })

        const rekognitionResponse = await this.client.send(command)
        const tags = rekognitionResponse.Labels?.map((label) => label.Name)

        if (tags) {
            return tags.filter((tag) => typeof tag !== 'undefined') as string[]
        }

        return []
    }

    text = async (buffer: Buffer) => {
        const command = new DetectTextCommand({
            Image: {
                Bytes: buffer
            }
        })

        const rekognitionResponse = await this.client.send(command)
        const tags = rekognitionResponse.TextDetections?.map((label) => label.DetectedText)

        if (tags) {
            return [...new Set(tags.filter((tag) => typeof tag !== 'undefined').map((tag) => `${tag}`.toLowerCase()))] as string[]
        }

        return []
    }

    faces = async (buffer: Buffer) => {
        const command = new DetectFacesCommand({
            Image: {
                Bytes: buffer
            }
        })

        const rekognitionResponse = await this.client.send(command)
        const tags = rekognitionResponse.FaceDetails?.map((label) => label)

        if (tags) {
            return tags.filter((tag) => typeof tag !== 'undefined') as string[]
        }

        return []
    }
}
