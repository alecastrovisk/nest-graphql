export interface UserPayload {
    sub: number;
    email: string;
    name: string;
    iat?: number;
    exp?: number;
}

//exp é quando irá expirar
//iat é quando foi gerado