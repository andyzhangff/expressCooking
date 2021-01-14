const Jimp = require('jimp');
 
const receipePicResize = (req,res,next)=>{
    
    Jimp.read('lenna.png', (err, lenna) => {
        if (err) throw err;
        lenna
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write('lena-small-bw.jpg'); // save
      });
};
