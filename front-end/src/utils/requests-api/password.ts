import { IUpdateUserPassword } from "../../interfaces/IUpdateUserPassword";

export const updatePassword = async (requestBody: IUpdateUserPassword) => {
    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(requestBody),
            credentials: "include"
        })

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ${response.status}: ${errorMessage}`);
        }

        return response;
    } catch (error) {
        alert(error)
    }
}