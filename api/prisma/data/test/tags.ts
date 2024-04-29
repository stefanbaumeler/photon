import { mediumToTag, tag } from '../../../src/drizzle/schema'
import { createTags, defaultUser } from '../helpers'
import { randomUUID } from 'crypto'
import { mediaData } from './media'

const tagLabels = [
    'Hut',
    'Nature',
    'Outdoors',
    'Countryside',
    'Building',
    'Rural',
    'Architecture',
    'Shelter',
    'Housing',
    'Shack',
    'Scenery',
    'Rubble',
    'Gravel',
    'Road',
    'Rock',
    'Wilderness',
    'Landscape',
    'Person',
    'Slope',
    'Mountain Range',
    'Mountain',
    'Boat',
    'Vehicle',
    'Transportation',
    'Railing',
    'Handrail',
    'Bridge',
    'Summer',
    'Water',
    'Bird',
    'Animal',
    'Grassland',
    'Field',
    'Meadow',
    'Plateau',
    'Pasture',
    'Farm',
    'Grass',
    'Plant',
    'Ground',
    'Reservoir',
    'Promontory',
    'Sea',
    'Land',
    'Car',
    'Pickup Truck',
    'Truck',
    'Beach',
    'Shoreline',
    'Coast'
]

export const tagsData: typeof tag.$inferInsert[] = tagLabels.map((label) => ({
    id: randomUUID(),
    label,
    idUser: defaultUser
}))

export const mediumToTagsData: typeof mediumToTag.$inferInsert[] = [
    ...createTags(mediaData[0].id, tagsData, ['Hut', 'Nature', 'Outdoors', 'Countryside', 'Building', 'Rural', 'Architecture', 'Shelter', 'Housing', 'Shack']),
    ...createTags(mediaData[1].id, tagsData, ['Scenery', 'Nature', 'Outdoors', 'Rubble', 'Gravel', 'Road', 'Rock', 'Wilderness', 'Landscape', 'Person', 'Slope', 'Mountain Range', 'Mountain']),
    ...createTags(mediaData[2].id, tagsData, ['Scenery', 'Outdoors', 'Nature', 'Boat', 'Vehicle', 'Transportation', 'Railing', 'Handrail', 'Bridge', 'Summer', 'Water', 'Bird', 'Animal']),
    ...createTags(mediaData[3].id, tagsData, ['Grassland', 'Nature', 'Outdoors', 'Field', 'Meadow', 'Countryside', 'Rural', 'Plateau', 'Pasture', 'Farm', 'Grass', 'Plant', 'Ground', 'Scenery']),
    ...createTags(mediaData[4].id, tagsData, ['Reservoir', 'Outdoors', 'Nature', 'Water', 'Promontory', 'Scenery', 'Sea', 'Land']),
    ...createTags(mediaData[5].id, tagsData, ['Shelter', 'Outdoors', 'Building', 'Architecture', 'Hut', 'Nature', 'Countryside', 'Rural', 'Scenery', 'Car', 'Vehicle', 'Transportation', 'Pickup Truck', 'Truck', 'Person']),
    ...createTags(mediaData[6].id, tagsData, ['Scenery', 'Outdoors', 'Nature', 'Promontory', 'Water', 'Beach', 'Shoreline', 'Sea', 'Coast'])
]
