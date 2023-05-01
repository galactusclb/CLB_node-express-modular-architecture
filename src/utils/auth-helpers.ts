export const getAuthIdFromHeader = (httpResponse: any): string => {

    return httpResponse?.locals?.authUserDetails
}