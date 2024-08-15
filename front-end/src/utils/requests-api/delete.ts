export const deleteUserFromDb = async () => {
    try {
        const response = await fetch("http://localhost:8080/users", {
            method: "DELETE",
            credentials: "include"
        })

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}: ${await response.text()}`)
        }

        return response;
    } catch (error) {
        console.log(error)
    }
}