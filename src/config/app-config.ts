/**
 * Application configurations
 */
export namespace AppConfig {
  export const LISTEN_PORT = process.env.LISTEN_PORT || 8999;
  export const NODE_ENV = process.env.NODE_ENV || "production";
  export const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "Admin";
}
