'use strict';

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');


module.exports = function(Recipe) {
    Recipe.upload = (id, req, res, cb) => {
          AWS.config.update({
            accessKeyId: "JX5P3TMWV4JHPCJTTPPR",
            secretAccessKey: "zIEVtLWtcy+s1n2osmmbz1yLoD1OihAarHtHmdQ50PU",
            endpoint  : 'sgp1.digitaloceanspaces.com',
          });
          Recipe.findById(id).then(recipe => {
            if (!recipe) {
              const err = new Error('Recipe\'s not found.');
              err.statusCode = 400;
              cb(err);
            } else {
              const s3 = new AWS.S3();
              const bucket = 'verikool/dante';
              const storage = multerS3({
                s3,
                bucket,
                acl: 'public-read',
                contentType: multerS3.AUTO_CONTENT_TYPE,
                metadata: (req, file, cb) => {
                  const mimeType = file.mimetype.split('/');
                  const fileType = mimeType[0];
                  if (fileType !== 'image') {
                    const err = new Error('Please make sure the file will be uploaded is image format');
                    err.statusCode = 400;
                    cb(err);
                  }
                  cb(null, { fieldName: file.fieldname });
                },
                key: (req, file, cb) => {
                  const extension = file.originalname.split('.').pop();
                  const randomString = Date.now().toString();
                  const recipe_name = recipe.recipe_name;
                  const fileName = `${recipe_name}-${randomString}.${extension}`;
                  console.log('fileName: ', fileName);
      
                  cb(null, fileName);
                },
              });
      
              const upload = multer({
                storage: storage,
                // limits: {fileSize: 3000000}, // max file size 3MB
              }).single('image');
      
              upload(req, res, (error) => {
                if (error) {
                  console.log('error upload', error)
                  const err = new Error('File too large');
                  err.statusCode = 400;
                  cb(err);
                }
                else{
                  recipe.updateAttributes({
                    recipe_image: req.file.location,
                  });
        
                  cb(null, {
                    status: 'success',
                    message: 'recipe image uploaded successfully',
                    data: { recipe },
                  });
                }
              });
            }
          });
        };
    // Recipe.home = (req)
};
