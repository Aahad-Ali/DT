
const ConditionalFilter = (obj) => {
    let conditional = (a, obj) => a ? obj : {}
    let FilterObjects = {}
    for (let [key, value] of Object.entries(obj)) {
        FilterObjects = { ...FilterObjects, ...conditional(value, Object.fromEntries([[key, value]])) }
    }

    let filters = check => Object.entries(check).map(([a, b]) => `${a}=${b}`).join('&')

    return {
        filters,
        FilterObjects
    }
}

export default ConditionalFilter
