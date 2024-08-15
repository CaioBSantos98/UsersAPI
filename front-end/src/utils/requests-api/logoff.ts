export const logoff = async () => {
    try {
        const response = await fetch("http://localhost:8080/custom-logout", {
            method: "POST",
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