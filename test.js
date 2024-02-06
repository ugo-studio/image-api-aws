import { handler } from "./index.js";
import { writeFile } from "fs/promises";

const config = btoa(
  JSON.stringify({
    // src: "https://m.media-amazon.com/images/M/MV5BOGVhOGI5ZmQtZDc5MC00N2NjLTk1MGUtNDE1Mzg1NzI5ZWQ4XkEyXkFqcGdeQXVyMTA4Njk2MTM3._V1_.jpg",
    src: "https://images.unsplash.com/photo-1699354511301-ec6be76db29f?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb&w=1920",
    w: 500,
    h: 500,
    q: 80,
  })
);

const run = async (path) => {
  const before = performance.now();
  const resp = await handler({ rawPath: path });
  console.log(
    `${path.substring(0, 10)} ran for ${performance.now() - before}ms`
  );

  const base64 = JSON.parse(resp.body).res;
  // console.log(base64);
  writeFile(
    `./test${path.substring(0, 10).replaceAll("/", "_")}.jpg`,
    Buffer.from(base64.replace("data:image/jpeg;base64,", ""), "base64")
  );
};

run(`/${config}`);
run(`/jimp/${config}`);
