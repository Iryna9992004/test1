import jwt from 'jsonwebtoken';
import { JwtPayload } from '../utils/dto/jwt';
import config from '../utils/config/config';

export class JwtService {
  generateAccessToken(payload: JwtPayload) {
    return jwt.sign({ ...payload }, config.jwt.accessSecret, {
      expiresIn: '15m',
    });
  }

  generateRefreshToken(payload: JwtPayload) {
    return jwt.sign({ ...payload }, config.jwt.refreshSecret, {
      expiresIn: '1h',
    });
  }

  generateTokens(payload: JwtPayload) {
    return {
      accessToken: this.generateAccessToken(payload),
      refreshToken: this.generateRefreshToken(payload),
    };
  }

  verifyAccessToken(token: string) {
    const decodedPayload = jwt.verify(token, config.jwt.accessSecret);
    return decodedPayload;
  }
}
