const cloudinary = require('./cloudinary');
const streamifier = require('streamifier');

/**
 * 
 * @param {Buffer} buffer req.file.buffer
 * @param {String} folder 'posts' | 'comments' | 'profiles' | 'covers'
 * @returns upload result object
 */
exports.serverlessImageUpload = (buffer, folder) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream({ folder: folder }, (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });

    streamifier.createReadStream(buffer).pipe(uploadStream);
  })
}
