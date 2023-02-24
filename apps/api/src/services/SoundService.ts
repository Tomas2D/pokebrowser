import path from "path";
import fs from "fs";

export async function retrieveSound(id: number | string) {
  const filePath = path.join(__dirname, `../../assets/sounds/${id}.mp3`);
  await fs.promises.access(filePath);

  return fs.createReadStream(filePath);
}
