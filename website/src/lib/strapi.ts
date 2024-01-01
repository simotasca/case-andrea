import { stringify } from "qs";
import axios from "axios";
import dotenv from "dotenv";
import process from "process";
dotenv.config();

export function getStrapiUrl(
  path: string | string[],
  qs?: any,
  isServer = true
) {
  const strapiUrl = isServer
    ? process.env["STRAPI_SERVER_URL"]
    : process.env["STRAPI_CLIENT_URL"];

  console.log("IS SERVER", isServer, process.env);

  // normalize path
  const pathOk = typeof path == "string" ? [path] : path;
  if (pathOk[0].startsWith("/")) {
    pathOk[0] = pathOk[0].slice(1);
  }
  console.log("/" + pathOk.join("/").replaceAll("//", "/"), strapiUrl);
  return (
    new URL(
      "/" + pathOk.join("/").replaceAll("//", "/"),
      strapiUrl
    ).toString() +
    (qs
      ? "?" + stringify(qs, { encodeValuesOnly: true /* prettify URL */ })
      : "")
  );
}

export async function fetchStrapiAPI(path: string, qs?: any) {
  const url = getStrapiUrl(["api", path], qs);
  console.log(`Fetching from "${url}"`);
  const result = await axios.get(url).catch(() => {});
  return result && result.data;
}

export async function postStrapiAPI(path: string, data: any, qs?: any) {
  const url = getStrapiUrl(["api", path], qs);
  console.log(`Posting data to "${url}"`);
  return await axios.post(url, data).then((res) => res.data);
}
