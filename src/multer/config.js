const { createId } = require("@paralleldrive/cuid2");
const multer = require("multer")
const path  = require("path")

module.exports = {
  storage: multer.diskStorage({
    destination: (_request, _file, callback) => {
      const pathComplete = path.resolve(__dirname, '..', '..', 'uploads')
      callback(null, pathComplete)
    },
    filename: (_request, file, callback) => {
      const filename = `${createId()}${path.extname(file.originalname)}`
      callback(null, filename)
    },
  }), 
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
};