import * as jwksClient from 'jwks-rsa'
import {verify as jwtVerify} from 'jsonwebtoken'
 
export interface JwtPayload {
    iss: string,
    sub: string,
    aud: string | string[]
    iat: number,
    exp: number,
    azp: string,
    scope: string,
}


const client = jwksClient({
    jwksUri: `https://msz13.eu.auth0.com/.well-known/jwks.json`,
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
  });
  
const getKey = (header, cb) => {
    client.getSigningKey(header.kid, (err, key) => {
        var signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
  }

const options = {
    audience: [
        'https://gu-dash.herokuapp.com/',
        "https://msz13.eu.auth0.com/userinfo"
      ],
    issuer: 'https://msz13.eu.auth0.com/',
    algorithms: ['RS256']
  };

export const verifyToken = (authHeader: string) => {

    

    if (!authHeader.startsWith('Bearer ')) {
      throw Error('Invalid Authentication header format')
    }
      
      const token = authHeader.substring(7)
    
    return new Promise((resolve, reject) => {
        jwtVerify(token, getKey as any, options, (err, decoded: JwtPayload) => {
          if(err) {
            return reject(err);
          }
          resolve(decoded);
        });
      });

    
}  
