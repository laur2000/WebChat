import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;
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

export async function verify(token: string) {
    return await new Promise((resolve, reject) => {
        jwt.verify(token, secret, (error, decoded) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(decoded);
            }
        });
    });
}

export async function sign(payload: any, options?: any) {
    return await new Promise((resolve, reject) => {
        jwt.sign(payload, secret, options, (error: Error | null, token: string | undefined) => {
            if (error) {
                reject(error);
            }
            else {
                resolve(token);
            }
        });
    });
}
