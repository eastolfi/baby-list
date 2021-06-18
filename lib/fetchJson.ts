class MyError extends Error {
    public response: Response;
    public data: any;

    constructor(message: string, response: Response, data: any) {
        super(message);

        this.response = response;
        this.data = data;
    }

    public static async fromResponse(response: Response): Promise<MyError> {
        let message = response.statusText?.trim();

        const data = await response.json();

        if (!message) {
            message = data.message || 'Please contact the administrator';
        }

        return new MyError(message, response, data);
    }
}

export async function fetcher(url: RequestInfo, options?: RequestInit) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw await MyError.fromResponse(response);
        }

        // if the server replies, there's always some data in json
        // if there's a network error, it will throw at the previous line
        return await response.json();
    } catch (error) {
        console.log('An error occured:');
        console.log(error)
        if (!error.data) {
            error.data = { message: error.message }
        }
        throw error
    }
}
