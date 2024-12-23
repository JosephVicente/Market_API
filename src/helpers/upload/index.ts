import multer from "multer";
import { resolve, dirname } from "path";
import { v4 as uuidV4 } from "uuid";

export default {
  upload(folder: string) {
    const __dirname = dirname(process.cwd());

    return {
      storage: multer.diskStorage({
        destination: resolve(__dirname, "..", "..", folder),
        filename: (req, file, cb) => {
          const fileHash = uuidV4();
          const fileName = `${fileHash}-${file.originalname}`;
          return cb(null, fileName);
        },
      }),
    };
  },
};
