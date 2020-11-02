'use strict';

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
};
