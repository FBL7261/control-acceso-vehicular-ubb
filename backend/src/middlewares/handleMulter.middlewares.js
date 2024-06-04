import multer from "multer";
import fs from "fs/promises";
import user from "../models/user.model.js";

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    try{
    const { id } = req.params;
    const userFound = await user.findById(id).exec();
      if (!userFound) {
        return Promise.reject(new Error("No se encontro la persona"));
      }
      const dir = "./src/uploads/" + userFound.username.toString().replace(" ", "_");
      try{
        await fs.access(dir);
      }catch(err){
        await fs.mkdir(dir, { recursive: true });
      }
      cb(null, dir);
    }catch(err){
      return Promise.reject(err);
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