import { imageResize, imageResizeJimp } from "./image.js";

export const handler = async (event) => {
  const path = event.rawPath;
  const useJimp = path.startsWith("/jimp/");
  const data = JSON.parse(
    atob(path.replace("/jimp", "").replace("/", "") || btoa("{}"))
  );
  const image = data.src;
  const fit = data.f;
  const width = data.w || 500;
  const height = data.h || 500;
  const quality = data.q || 80;
  if (!image) {
    return {
      statusCode: 400,
      body: JSON.stringify({ msg: "image src not found" }),
    };
  }
  data.res = await (useJimp ? imageResizeJimp : imageResize)(
    image,
    width,
    height,
    quality,
    fit
  );
  const response = {
    statusCode: 200,
    body: JSON.stringify(data),
  };
  return response;
};
