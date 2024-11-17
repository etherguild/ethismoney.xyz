export const IS_DEVELOPMENT =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "development";
export const IS_PRODUCTION =
  process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

export const BASE_URLS = {
  development: `http://${process.env.NEXT_PUBLIC_VERCEL_URL}`,
  production: `https://www.ethismoney.xyz`,
};

export const BASE_URL =
  BASE_URLS[IS_DEVELOPMENT ? "development" : "production"];
