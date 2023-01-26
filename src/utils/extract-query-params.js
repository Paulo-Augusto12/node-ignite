

export function extractQueryParams(query){
    return query.substr(1).split('&').reduce((queryItems, param) => {
        const [key, value] = param.split('=')

        queryItems[key] = value

        return queryItems;
    }, {})
}