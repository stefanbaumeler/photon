import { DetectLabelsCommand, RekognitionClient } from '@aws-sdk/client-rekognition'
import type { CVDriver } from '@photon/cv'

export default class CVRekognitionDriver implements CVDriver {
    labels = async (buffer: Buffer) => {
        const client = new RekognitionClient({
            region: process.env.CV_REKOGNITION_REGION,
            credentials: {
                accessKeyId: process.env.CV_REKOGNITION_ACCESS_KEY_ID as string,
                secretAccessKey: process.env.CV_REKOGNITION_SECRET_ACCESS_KEY as string
            }
        })

        const command = new DetectLabelsCommand({
            Image: {
                Bytes: buffer
            },
            MinConfidence: 80
        })

        const rekognitionResponse = await client.send(command)
        const tags = rekognitionResponse.Labels?.map((label) => label.Name)

        if (tags) {
            return tags.filter((tag) => typeof tag !== 'undefined') as string[]
        }

        return []
    }
}
