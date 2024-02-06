import { PhotonImage, resize } from "@silvia-odwyer/photon-node";
import Jimp from "jimp";

export async function imageResize(url, width, height, quality, fit) {
  console.log(url);
  const data = new Uint8Array(
    await (await fetch(decodeURIComponent(url))).arrayBuffer()
  );
  const filter = Number(fit);

  const img = PhotonImage.new_from_byteslice(data);
  const resized = resize(
    img,
    Math.floor(width),
    Math.floor(height),
    Math.floor(isNaN(filter) ? 2 : filter)
  );
  img.free();
  const bytes = resized.get_bytes_jpeg(Number(quality));
  resized.free();
  return "data:image/jpeg;base64," + Buffer.from(bytes).toString("base64");
}

export async function imageResizeJimp(url, width, height, quality, fit) {
  console.log(url);
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
  img.quality(Number(quality));
  return await img.getBase64Async(Jimp.MIME_JPEG);
}
