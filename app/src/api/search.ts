import TypesenseInstantsearchAdapter from 'typesense-instantsearch-adapter'

export const typesenseAdapter = new TypesenseInstantsearchAdapter({
    server: {
        apiKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY,
        nodes: [
            {
                host: process.env.NEXT_PUBLIC_TYPESENSE_HOST,
                port: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_PORT, 10),
                protocol: parseInt(process.env.NEXT_PUBLIC_TYPESENSE_SECURE || '1', 10) ? 'https' : 'http'
            }
        ]
    },
    additionalSearchParameters: {
        query_by: 'dateTaken,title,generatedTags',
        facet_by: 'favorite'
    }
})

export const searchClient = typesenseAdapter.searchClient
