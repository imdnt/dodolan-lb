'use strict';

const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

module.exports = function(Product) {
    Product.getMyItem = async (req, res, cb) => {
        try {
            if (req.accessToken == null) {
            throw errorHelper.badAuthorization();
            }
            
          const product = await Product.find({
              where:{accountId:req.accessToken.userId}
          });
          return Promise.resolve({
            message: "success",
            status: "success",
            product
          });
        } catch (error) {
            throw error;
        }
    }

    Product.upload = (id, req, res, cb) => {
        AWS.config.update({
          accessKeyId: "6COMAQEGJJOIMAVW5APH",
          secretAccessKey: "yuETrH/XDEf5ipQh3tX3Qg731gzK+n0VR2K1EaL2Vc8",
          endpoint  : 'sfo2.digitaloceanspaces.com',
        });
        Product.findById(id).then(recipe => {
          if (!recipe) {
            const err = new Error('Product\'s not found.');
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
};
