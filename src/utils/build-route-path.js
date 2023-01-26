// /users/:id

export function buildRoutePath(path){
    const routeParamsRegex = /:([a-zA-z]+)/g

    console.log(Array.from(path.matchAll(routeParamsRegex)))
}