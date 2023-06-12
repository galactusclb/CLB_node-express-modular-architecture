import { constants } from "./constants"

export const ApiResponseMessage = (
    crudType: 'create' | 'update' | 'retrieve' | 'delete',
    noun: string = "item"
) => {
    let message = constants.API_RESPONSE_MESSAGES?.[crudType]
    message = message?.split("__")?.join(`${noun}`)
    return message?.[0]?.toUpperCase() + message?.substring(1);
}