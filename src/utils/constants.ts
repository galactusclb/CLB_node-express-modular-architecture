export const constants = {
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    ACCESS_TOKEN_EXPIRES_IN: process.env.ACCESS_TOKEN_EXPIRES_IN,
    REFRESH_TOKEN_EXPIRES_IN: process.env.REFRESH_TOKEN_EXPIRES_IN,
    JWT_SIGN_OPTIONS: {

    },

    AUTH_ROLES: {
        SUPER_ADMIN: "super-admin",
        ADMIN: "admin",
        MODERATOR: "moderator",
        USER: "user",
    },
    API_RESPONSE_MESSAGES: {
        create: "New __ added successfully",
        retrieve: "__ retrieved successfully",
        update: "__ updated successfully.",
        delete: "__ delete successfully.",
    }
};