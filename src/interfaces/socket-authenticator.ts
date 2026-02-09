/**
 * Socket authentication contract.
 *
 * Responsible for validating a socket handshake
 * and returning the authenticated user id.
 */
export interface SocketAuthenticator {
  /**
   * Authenticates a socket connection.
   *
   * @param authPayload - The authentication payload from the socket handshake
   * @returns The authenticated user ID
   */
  authenticate(authPayload: unknown): Promise<number | string>;
}
