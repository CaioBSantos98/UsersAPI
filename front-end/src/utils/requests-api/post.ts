// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const post = async (url: string, body: any): Promise<Response> => {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            credentials: "include"
        })
        
        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro ${response.status}: ${errorMessage}`);
        }
        return response
    } catch (error) {
        throw new Error("Requisição falhou!" + error);
    }
}