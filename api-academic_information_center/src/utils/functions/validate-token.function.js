import jwt from 'jsonwebtoken';
import { environment } from '../../environments/environment.js';

export function validateToken(token) {
    return jwt.verify(token, environment.secretTokenKey);
}