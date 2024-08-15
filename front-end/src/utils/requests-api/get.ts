import IUserDetails from "../../interfaces/IUserDetails";

export const getUserDetails = async ():Promise<IUserDetails | undefined> => {
    try {
        const response = await fetch("http://localhost:8080/token/user", {
            method: "GET",
            credentials: "include"
        })
        const responseJson:IUserDetails = await response.json();
        return responseJson;
    } catch (error) {
        console.log()
    }
}