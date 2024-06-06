import AuthenticationError from '../errors/AuthenthicationError';
import jwt from 'jsonwebtoken';
function verifyToken(token: string): { userId: string } {
  try {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET as string) as { userId: string };
  } catch (error) {
    throw new AuthenticationError('Invalid or expired refresh token');
  }
}

export default verifyToken;
