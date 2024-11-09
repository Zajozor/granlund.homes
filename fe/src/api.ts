import ky from 'ky'

export const BACKEND_BASE_URL = process.env.NODE_ENV === 'development' ?
    "http://localhost:4001/" : "https://granlund.homes/api/"

const kyInstance = ky.create({
    prefixUrl: BACKEND_BASE_URL,
})

export const api = {

    zajoTest: async (/** api request params would go here **/) => {
        return await kyInstance.get('zajotest').json()
        
    }
}