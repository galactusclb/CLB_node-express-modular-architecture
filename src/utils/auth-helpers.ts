import { AuthToken } from "types/auth-toke.model"

export const getAuthIdFromHeader = (httpResponse: any): AuthToken => {
    return httpResponse?.locals?.authUserDetails
}