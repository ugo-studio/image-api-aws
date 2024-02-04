//import sharp from "sharp";
import Jimp from "jimp";

export async function imageResize(url, width, height, quality, fit) {
  const img = await Jimp.read(decodeURIComponent(url));
  switch (fit) {
    case "contain":
      img.contain(Math.floor(width), Math.floor(height));
      break;
    case "cover":
      img.cover(Math.floor(width), Math.floor(height));
      break;
    case "outside":
      img.resize(Math.floor(width), Jimp.AUTO);
      break;
    case "inside":
      img.resize(Jimp.AUTO, Math.floor(height));
      break;
    default:
      img.resize(Math.floor(width), Math.floor(height));
      break;
  }
  img.quality(quality);
  return await img.getBase64Async(Jimp.MIME_JPEG);
}

export function parseToFitEnum(str) {
  switch (str) {
    case "contain":
      return sharp.fit.contain;
    case "cover":
      return sharp.fit.cover;
    case "fill":
      return sharp.fit.fill;
    case "outside":
      return sharp.fit.outside;
    default:
      return sharp.fit.inside;
  }
}
