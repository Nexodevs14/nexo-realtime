/**
 * Environment variable types
 */
export type NodeEnv = "development" | "production" | "test";

/**
 * Environment configuration interface
 */
export interface EnvConfig {
    appName: string;
    appUrl: string;
    nodeEnv: NodeEnv;
    port: number;
    corsOrigin: string;
    jwtPublicKey: string;
    serviceToken: string;
    redisUrl: string;
}
