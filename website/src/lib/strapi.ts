import { stringify } from "qs";
import axios from "axios";

export function getStrapiUrl(
  path: string | string[],
  qs?: any,
  isServer = true
) {
  const strapiUrl =
    (isServer
      ? import.meta.env["STRAPI_SERVER_URL"]
      : import.meta.env["STRAPI_CLIENT_URL"]) ;

  // normalize path
  const pathOk = typeof path == "string" ? [path] : path;
  if (pathOk[0].startsWith("/")) {
    pathOk[0] = pathOk[0].slice(1);
  }
  // TODO: RIMUOVERE IL TRY CATCH!!
  return (
    new URL(pathOk.join("/").replaceAll("//", "/"), strapiUrl).toString() +
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
