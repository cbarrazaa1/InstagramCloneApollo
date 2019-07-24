// @flow
import jwt, {type VerifyOptionsWithAlgorithm} from 'jsonwebtoken';
import dotenv from 'dotenv';
import EntUser from '../schemas/EntUserSchema';

require('dotenv').config();
const JWT_SECRET = process.env.JWT_SECRET ?? '';
const CLIENT_ID = process.env.CLIENT_ID ?? '';

export default {
  create: (user: EntUser): string =>
    jwt.sign({id: user.getID()}, JWT_SECRET, {
      issuer: 'InstagramCloneServer',
      subject: user.getUsername(),
      audience: CLIENT_ID,
      expiresIn: '30d',
      algorithm: 'HS256',
    }),
  verify: (user: EntUser): boolean => {
    const token = user.getAuthToken();
    try {
      return jwt.verify(token, JWT_SECRET, {
        issuer: 'InstagramCloneServer',
        subject: user.getUsername(),
        audience: CLIENT_ID,
        algorithms: ['HS256'],
      });
    } catch (e) {
      return false;
    }
  },
};
