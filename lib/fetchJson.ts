class MyError extends Error {
    public response: Response;
    public data: any;

    constructor(statusText: string, response: Response, data: any) {
        super(statusText);

        this.response = response;
        this.data = data;
    }
}

export async function fetcher(url: RequestInfo, options?: RequestInit) {
    try {
        const response = await fetch(url, options);

        // if the server replies, there's always some data in json
        // if there's a network error, it will throw at the previous line
        const data = await response.json();

        if (response.ok) {
            return data;
        }

        console.log(response)
        throw new MyError(response.statusText, response, data);
    } catch (error) {
        console.log(error)
        if (!error.data) {
            error.data = { message: error.message }
        }
        throw error
    }
}
