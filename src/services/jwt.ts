import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
const invalid_tokens: { [token: string]: boolean } = {};
export function getExpRemaining(exp: number) {
    return Math.floor((new Date(exp * 1000).getTime() - Date.now()) / 1000);
}

export function getToken(token: string | undefined): string {
    var res = "";
    if (token) {
        const args = token.split(' ');
        if (args.length == 2) {
            if (args[0] === 'Bearer') {
                const jwtToken = args[1].split('.');
                if (jwtToken.length === 3) {
                    res = args[1];
                }
            }
        }
    }
    return res;
}

export async function verify(token: string, JWT_SECRET: string) {
    return await new Promise((resolve, reject) => {
        if (invalid_tokens[token]) {
            reject({
                name: "JsonWebTokenError",
                message: "jwt invalidated"
            })
        }
        else {
            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(decoded);
                }
            });
        }

    });
}

export async function sign(payload: any, JWT_SECRET: string, options?: any) {
    return await new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, options, (error: Error | null, token: string | undefined) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
    });
}

export function decode(payload: any) {
    return jwt.decode(payload);
}

export function invalidate(token: string) {
    invalid_tokens[token] = true;
}