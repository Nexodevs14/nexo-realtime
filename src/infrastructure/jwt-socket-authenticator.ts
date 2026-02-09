import jwt, { JwtPayload } from 'jsonwebtoken';
import { SocketAuthenticator } from '@/interfaces/socket-authenticator';
import { env } from '@/config/env';
import { UnauthorizedError } from '@/errors/api.errors';

/**
 * JWT-based Socket.IO authenticator (Passport / RS256).
 *
 * Responsibilities:
 * - Validate JWT signature using public key
 * - Extract authenticated user identity (sub)
 */
export class JwtSocketAuthenticator implements SocketAuthenticator {
  /**
   * Authenticates a socket connection using JWT.
   *
   * @param authPayload - Socket handshake auth payload
   * @returns Authenticated user ID
   * @throws UnauthorizedError
   */
  async authenticate(authPayload: unknown): Promise<string | number> {
    if (!authPayload || typeof authPayload !== 'object') {
      throw new UnauthorizedError('Missing auth payload');
    }

    const token = (authPayload as { token?: string }).token;

    if (!token) {
      throw new UnauthorizedError('Missing auth token');
    }

    let decoded: JwtPayload;

    try {
      decoded = jwt.verify(token, env.jwtPublicKey, {
        algorithms: ['RS256'],
      }) as JwtPayload;
    } catch {
      throw new UnauthorizedError('Invalid or expired token');
    }

    const userId = decoded.sub;

    if (typeof userId !== 'string' && typeof userId !== 'number') {
      throw new UnauthorizedError('Token subject (sub) is invalid');
    }

    return userId;
  }
}
