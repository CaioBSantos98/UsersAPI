import { atom } from "recoil";

export const authState = atom({
    key: 'authState',
    default: {
        isAuthenticated: false,
        userId: 0,
        userEmail: "null"
    }
})