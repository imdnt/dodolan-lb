'use strict';

module.exports = function(Product) {
    Product.getMyItem = async () => {
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
            throw err;
        }
    }
};
