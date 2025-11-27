import fs from "node:fs";
import { open } from 'node:fs/promises';
import sharp from "sharp";

const main = async () => {
  const files = await new Promise((resolve, reject) => {
    fs.readdir('webp', undefined, (err, files) => {
      if (err) return reject(err);

      resolve(files);
    })
  });

  // console.log(files)

  let fileHandle;

  files.forEach(async file => {
    try {
      // fileHandle = await open(`webp/${ file }`, 'r');
      const name = trimExtension(file);
      await sharp(`webp/${ file }`).toFile(`png/${ name }.png`);
    } catch (e) {
      console.log(`error reading file ${ file }: ${ e }`);
    }
  });
}

const trimExtension = (fileName) => {
  return fileName.replace(/\.[^/.]+$/, "");
}

if (process.argv[1] === import.meta.filename) {
  main();
}