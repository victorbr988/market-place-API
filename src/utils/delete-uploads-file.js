const path = require('path');
const fs = require('fs');

class DeleteUploadFiles {
  static handler({ filename }) {
    const uploadPath = path.resolve(__dirname, '..', '..', 'uploads')
    const fileWithExtension = fs.readdirSync(uploadPath).find((file) => file.startsWith(filename))
    const pathComplete = path.resolve(__dirname, '..', '..', 'uploads', fileWithExtension)

    fs.rmSync(pathComplete)
  }
}

module.exports = {
  DeleteUploadFiles
}