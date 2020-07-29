import jwt from "jsonwebtoken";
import config from "../config";
import { EventEmitter } from "events";
import ChannelProvider from "./channelProvider";
import { isMatch } from "lodash";

/*
import jwks from "jwks-rsa";
var rsaExchange = jwks({
  jwksUri: config.RSA_URL,
});

function getKey(header: any, callback: Function) {
  rsaExchange.getSigningKey(header.kid, function (err: any, key: any) {
    if (err) {
      callback(err, null);
    } else {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    }
  });
}

const jwtHeader = {
  audience: config.AUDIENCE,
  issuer: config.ISSUER,
};
*/
const invalid_tokens: { [token: string]: boolean } = {};

export const InvalidateToken: EventEmitter = new EventEmitter();

export function getExpRemaining(exp: number) {
  return Math.floor((new Date(exp * 1000).getTime() - Date.now()) / 1000);
}

export function getJwtToken(token: string | undefined): string | null {
  if (!token) return null;

  var res = null;
  const args = token.split(" ");
  if (args.length == 2 && args[0] === "Bearer") {
    const jwtToken = args[1].split(".");
    if (jwtToken.length === 3) {
      res = args[1];
    }
  }
  return res;
}

export async function verify(token: string, secret: string) {
  return await new Promise((resolve, reject) => {
    if (invalid_tokens[token]) {
      reject({
        name: "JsonWebTokenError",
        message: "jwt invalidated",
      });
    } else {
      jwt.verify(token, secret, (error: any, decoded: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(decoded);
        }
      });
    }
  });
}

export async function sign(payload: any, JWT_SECRET: string, options?: any) {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      JWT_SECRET,
      options,
      (error: Error | null, token: string | undefined) => {
        if (error) {
          reject(error);
        } else {
          resolve(token);
        }
      }
    );
  });
}

export function verifyPermissions(
  token: string,
  requiredPermissions: string[]
) {
  return new Promise(async (resolve, error) => {
    //Check if it is a valid JWT structure
    const payload = <any>decode(token);
    if (payload && payload.channel) {
      //Check if the signature is valid
      const secret = await ChannelProvider.getChannelSecret(payload.channel);
      if (secret) {
        verify(token, secret)
          .then(() => {
            let permissions = payload.permissions;
            if (!Array.isArray(permissions)) {
              permissions = [];
            }
            const missingPermissions = findMissingPermissions(
              requiredPermissions,
              permissions
            );

            if (missingPermissions.length != 0) {
              error({
                message: "Forbidden access to resource",
                missingPermissions,
              });
            } else {
              resolve(payload);
            }
          })
          .catch(error);
      } else {
        error("Channel does not exist");
      }
    } else {
      error("Valid JWT not provided");
    }
  });
}

export function decode(payload: any) {
  return jwt.decode(payload);
}

export function invalidate(token: string) {
  invalid_tokens[token] = true;
  InvalidateToken.emit("invalidated", token);
}

export function findMissingPermissions(required: any[], available: any[]) {
  var permissions = [];
  //Retrieve all required permissions that are not inside our available permissions
  for (let permission of required) {
    if (available.indexOf(permission) < 0) {
      permissions.push(permission);
    }
  }
  return permissions;
}
