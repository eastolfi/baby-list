export type CallbackData = { [key: string]: string };

export type ServiceCallback = (error: Error | null, data?: CallbackData) => void;
