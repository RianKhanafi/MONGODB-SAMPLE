const sharp = require("sharp");

module.exports = {
  resizeImage = (file) =>{

      sharp(file.path)
        .resize(800, 800, {
          fit: sharp.fit.inside,
          withoutEnlargement: true,
        })
  
        .toFormat("jpeg")
        .toBuffer()
        .then(function (outputBuffer) {
          fs.writeFileSync(file.path, outputBuffer);
          return true;
          // outputBuffer contains JPEG image data
          // no wider and no higher than 200 pixels
          // and no larger than the input image
        })
        .catch((err) => {
          next(err);
        });
    
  } 
}
