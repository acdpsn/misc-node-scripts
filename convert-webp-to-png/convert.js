import fs from "node:fs";
import sharp from "sharp";

const main = async () => {
  const files = await new Promise((resolve, reject) => {
    fs.readdir('webp', undefined, (err, files) => {
      if (err) return reject(err);

      resolve(files);
    })
  });

  await fs.promises.mkdir("png");

  files.forEach(async file => {
    try {
      const name = trim(file);
      await sharp(`webp/${ file }`).toFile(`png/${ name }.png`);
    } catch (e) {
      console.log(`error reading file ${ file }: ${ e }`);
    }
  });
}

const trim = (fileName) => {
  const name = fileName.replace(/\.[^/.]+$/, ""); // trim extension
  return name.slice(3);
}

if (process.argv[1] === import.meta.filename) {
  main();
}