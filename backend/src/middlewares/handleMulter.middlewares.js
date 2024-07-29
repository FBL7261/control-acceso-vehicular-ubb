import multer from "multer";
import fs from "fs/promises";
import user from "../models/user.model.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try {
      const email = req.email;
      const userFound = await user.findOne({ email }).exec();
      if (!userFound) {
        return cb(new Error("No se encontro la persona"), null);
      }
      const dir = "./src/uploads/" + userFound.username.toString().replace(" ", "_");
      try {
        await fs.access(dir);
      } catch (err) {
        await fs.mkdir(dir, { recursive: true });
      }
      cb(null, dir);
    } catch (err) {
      cb(err, null);
    }
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /pdf/;
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype) {
      return cb(null, true);
    }
    cb("Error: El archivo debe ser un pdf");
  },
  limits: {
    fileSize: 1024 * 1024 * 10,
  }
});

export default upload;
