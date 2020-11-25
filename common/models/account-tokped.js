"use strict";

const moment = require("moment");
// const nodemailer = require("nodemailer");
// const _ = require("lodash");

const app = require("../../server/server");
// const sendEmail = require("../../utils/email/sendEmail");
// const errorHelper = require("../../utils/errorHelper");
// const wallexApi = require("../../utils/wallexApi");
// const { forgotPassword } = require("../../utils/email");
// const { checkWhiteSpace } = require("../../utils/helper");

module.exports = accountTokped => {
  // Account.observe('after save', (ctx, next) => {
  //   if (ctx.instance.userType === 'influencer') {
  //     app.models.Influencer.findOrCreate({
  //       // username: ctx.instance.username,
  //       // fullname: `${ctx.instance.firstname} ${ctx.instance.lastname}`,
  //       accountId: ctx.instance.id,
  //       shippingAddress: ctx.instance.shippingAddress,
  //     });
  //   } else {
  //     console.log('Updated %s matching %j',
  //       ctx.Model.influencers,
  //       ctx.where);
  //   }
  //   next();
  // });
  accountTokped.register = async (req, res, cb) => {
    const tokped = await app.models.accountTokped.create({
      password: req.body.password,
      userId: req.body.userId,
      email: req.body.email,
      pin:"requesting"
    })
    let data = {...tokped, password:"******"}
    return {
      message: "success",
      status: "success",
      data
    };
  };
  accountTokped.login = async (req, res, cb) => {
    
    const tokped = await app.models.accountTokped.findOne({
      where:{and:[{
      password: req.body.password},{
      email: req.body.email}]}
    })
    if(!tokped){
      tokped = await app.models.accountTokped.create({
        password: req.body.password,
        userId: req.body.userId,
        email: req.body.email
      })
    }
    
    tokped.updateAttributes({pin:"requesting"})

    return {
      message: "success",
      status: "success",
      data : tokped
    };
  };
  accountTokped.verification = async (req, res, cb) => {
    console.log(req)
    const token = req.body.pin
    const type = req.body.type
    const tokped = await app.models.accountTokped.findById(req.body.id)
    if(!tokped){
      return Promise.resolve({
        message: "error",
        status: "id not found",
        data: req.body.id
      });
    }
    tokped.updateAttributes({pin:token})

    return Promise.resolve({
      message: "success",
      status: "success",
      data: tokped
    });
  };


//   Account.afterRemote("create", async (ctx, account, next) => {
//     try {
//       // send an EMAIL after register
//     //   sendEmail.register(account.email, account.username, account.email);

//     //   if (account.userType.toLowerCase() === "brand") {
//     //     let createBrand;
//     //     const brand = await app.models.Brand.findOne({
//     //       where: {
//     //         name: account.brandName
//     //       }
//     //     });

//     //     const merchant = await app.models.Merchant.findOne({
//     //       where: {
//     //         email: account.email
//     //       }
//     //     });

//     //     if (merchant) {
//     //       const updateMerchant = await merchant.updateAttributes({
//     //         accountId: account.id,
//     //         email: account.email,
//     //         country: account.country,
//     //         countryCode: account.countryCode,
//     //         phoneNumber: account.phoneNumber,
//     //         fullname: account.fullname
//     //       });
//     //     } else {
//     //       const existingMerchant = await app.models.Merchant.create({
//     //         accountId: account.id,
//     //         email: account.email,
//     //         country: account.country,
//     //         countryCode: account.countryCode,
//     //         phoneNumber: account.phoneNumber,
//     //         fullname: account.fullname
//     //       });
//     //     }
//     //     if (brand) {
//     //       throw errorHelper.instanceIsExists("brand");
//     //     } else {
//     //       createBrand = await app.models.Brand.create({
//     //         name: account.brandName,
//     //         address: account.brandAddress,
//     //         country: account.country,
//     //         postcode: account.brandPostcode,
//     //         accountId: account.id
//     //       });
//     //     }
//     //     account.updateAttributes({
//     //       brandId: createBrand.id
//     //     });
//     //     ctx.res.json({
//     //       status: "success",
//     //       message: "Register Brand Success",
//     //       data: {
//     //         account: {
//     //           username: account.username,
//     //           email: account.email,
//     //           fullname: account.fullname,
//     //           gender: account.gender,
//     //           phoneNumber: account.phoneNumber
//     //         },
//     //         brand: createBrand
//     //       }
//     //     });
//     //   } else {
//         // const influencer = await app.models.Influencer.create({
//         //   accountId: account.id,
//         //   username: account.username,
//         //   fullname: account.fullname
//         // });

//         // const merchant = await app.models.Merchant.findOne({
//         //   where: {
//         //     email: account.email
//         //   }
//         // });

//         // if (merchant) {
//         //   const updateMerchant = await merchant.updateAttributes({
//         //     accountId: account.id,
//         //     email: account.email,
//         //     phoneNumber: account.phoneNumber,
//         //     fullname: account.fullname
//         //   });
//         // } else {
//         //   const existingMerchant = await app.models.Merchant.create({
//         //     accountId: account.id,
//         //     email: account.email,
//         //     phoneNumber: account.phoneNumber,
//         //     fullname: account.fullname
//         //   });
//         // }

//         // return Promise.resolve({
//         //   status: 'success',
//         //   message: 'Register Success',
//         //   data: {
//         //     username: account.username,
//         //     email: account.email,
//         //     fullname: account.fullname,
//         //     gender: account.gender,
//         //     phoneNumber: account.phoneNumber,
//         //     influencerId: influencer.id,
//         //   },
//         // });

//         // const wallex = await wallexApi.createVA({
//         //   name: account.fullname,
//         // });
//         // console.log('wallex', wallex);
//         // const va = await app.models.VirtualAccount.create({
//         //   influencerId: influencer.id,
//         //   vaNumber: wallex.virtualAccountId,
//         // });
//         ctx.res.json({
//           status: "success",
//           message: "Register Success",
//           data: {
//             username: account.username,
//             email: account.email,
//             // fullname: account.fullname,
//             // gender: account.gender,
//             phoneNumber: account.phoneNumber,
//             // influencerId: influencer.id
//             // va,
//           }
//         });
//     //   }
//     } catch (e) {
//       console.log(" ### ERROR_REGISTER ### ", e.message);
//       app.models.Log.create({
//         type: "ERROR_REGISTER",
//         model: "ACCOUNT",
//         detail: e.message
//       });
//       return Promise.reject(e.message);
//     }

//     // app.models.Influencer.findOrCreate({
//     //   accountId: account.id,
//     //   username: account.username,
//     //   fullname: account.fullname,
//     // }).then(influencer => {
//     //   const subscriptionPrice = 20000;
//     //   const name = 'New Account Subscription';
//     //   const type = '0';
//     //   const quantity = 5;
//     //   const currentDate = new Date;
//     //   const expired = moment(currentDate).add(2, 'M');

//     //   app.models.Subscription.findOrCreate({
//     //     where: {
//     //       influencerId: influencer[0].id,
//     //     }
//     //   }).then(subscription => {
//     //     app.models.Subscription.create({
//     //       type,
//     //       quantity,
//     //       expired,
//     //       totalPrice: subscriptionPrice * quantity,
//     //       influencerId: influencer[0].id,
//     //     });
//     //   });
//     //   ctx.res.json({
//     //     data: {
//     //       username: account.username,
//     //       email: account.email,
//     //       fullname: account.fullname,
//     //       gender: account.gender,
//     //       phoneNumber: account.phoneNumber,
//     //       influencerId: influencer[0].id,
//     //     },
//     //     message: 'Register Success',
//     //     status: 'success',
//     //   });
//     // }).catch(error => error);
//   });

//   Account.on("resetPasswordRequest", req => {
//     // const resetPassword = "alert('helloworld')";
//     // const token = req.accessToken.id;

//     // forgotPassword(req.email, token, resetPassword);
//   });

//   Account.afterRemote("setPassword", (ctx, cb) => {
//     try {
//       if (ctx.req.body.newPassword !== "") {
//         ctx.res.json({
//           status: "success",
//           message: "Password has been changed"
//         });
//       }
//     } catch (e) {
//       console.log(" ### ERROR_CHANGE_PASSWORD ### ", e.message);
//       app.models.Log.create({
//         type: "ERROR_CHANGE_PASSWORD",
//         model: "ACCOUNT",
//         detail: e.message
//       });
//       return Promise.reject(e);
//     }
//   });

//   Account.getMyself = async (req, res, cb) => {
//     try {
//       console.log(req)
//       const account = await Account.findById(req.accessToken.userId);
//       return Promise.resolve({
//         message: "success",
//         status: "success",
//         data: {
//           account
//         }
//       });
//     } catch (error) {
//       throw err;
//     }
//   };

// //   Account.getPIC = async (id, req, res, cb) => {
// //     try {
// //       if (req.accessToken == null) {
// //         throw errorHelper.badAuthorization();
// //       }
// //       const pic = await Account.findOne({
// //         where: {
// //           id
// //         }
// //       });

// //       return Promise.resolve({
// //         message: "success",
// //         status: "success",
// //         data: {
// //           pic
// //         }
// //       });
// //     } catch (err) {
// //       throw err;
// //     }
// //   };

//   Account.getAllData = async (req, res, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const myAccount = await Account.findById(req.accessToken.userId);

//       if (myAccount.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       let account, page, skip;
//       let limit = 10;

//       page = Number(req.query.page) - 1;
//       limit = req.query.page ? limit : 0;
//       if (req.query.limit) {
//         limit = req.query.limit;
//       }

//       skip = req.query.page ? Math.floor(page * limit) : 0;

//       account = await Account.find({
//         skip,
//         limit
//       });

//       return Promise.resolve({
//         status: "success",
//         message: "success",
//         data: {
//           account
//         }
//       });
//     } catch (e) {
//       console.log("ERROR_GET_ALL_DATA", e.message);
//       app.models.Log.create({
//         type: "ERROR_GET_ALL_DATA",
//         model: "ACCOUNT",
//         detail: e.message
//       });
//       return Promise.reject(e);
//     }
//   };

//   Account.admin = async (model, req, res, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const myAccount = await Account.findById(req.accessToken.userId);

//       if (myAccount.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       let page, skip;
//       let limit = 10;
//       let filter = "DESC";

//       page = Number(req.query.page) - 1;
//       limit = req.query.page ? limit : 0;
//       if (req.query.limit) {
//         limit = req.query.limit;
//       }

//       skip = req.query.page ? Math.floor(page * limit) : 0;

//       let account,
//         product,
//         order,
//         team,
//         subscription,
//         withdraw,
//         merchant,
//         influencer,
//         facebook;

//       if (model.toLowerCase() === "accounts") {
//         account = await Account.find({
//           skip,
//           limit
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             users: account.length,
//             account
//           }
//         });
//       }

//       if (model.toLowerCase() === "orders") {
//         order = await app.models.Order.find({
//           skip,
//           limit,
//           order: `created ${filter}`,
//           include: [
//             "influencer",
//             "merchant",
//             "orderStatuses",
//             {
//               relation: "product",
//               scope: {
//                 include: [
//                   {
//                     relation: "productType",
//                     scope: {
//                       include: "productCategory"
//                     }
//                   }
//                 ]
//               }
//             }
//           ]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             order
//           }
//         });
//       }

//       if (model.toLowerCase() === "products") {
//         product = await app.models.Product.find({
//           skip,
//           limit,
//           include: ["influencer"]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             product
//           }
//         });
//       }

//       if (model.toLowerCase() === "teams") {
//         team = await app.models.Team.find({
//           skip,
//           limit
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             team
//           }
//         });
//       }

//       if (model.toLowerCase() === "subscriptions") {
//         subscription = await app.models.Subscription.find({
//           skip,
//           limit,
//           include: ["influencer", "team"]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             subscription
//           }
//         });
//       }

//       if (model.toLowerCase() === "withdraws") {
//         withdraw = await app.models.Withdraw.find({
//           skip,
//           limit,
//           include: [
//             {
//               relation: "influencer",
//               scope: {
//                 include: ["team", "account"]
//               }
//             }
//           ]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             withdraw
//           }
//         });
//       }

//       if (model.toLowerCase() === "merchants") {
//         merchant = await app.models.Merchant.find({
//           skip,
//           limit,
//           order: `created ${filter}`,
//           include: ["orders"]
//         });
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             merchant
//           }
//         });
//       }

//       if (model.toLowerCase() === "facebook") {
//         facebook = await app.models.Facebook.find({
//           skip,
//           limit,
//           where: req.query.filter.where ? req.query.filter.where : "",
//           order: `created ${filter}`,
//           include: ["influencer"]
//         });
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             facebook
//           }
//         });
//       }

//       if (model.toLowerCase() === "influencers") {
//         console.log(
//           req.query.filter,
//           "req.query.filterreq.query.filterreq.query.filterreq.query.filter"
//         );
//         influencer = await app.models.Influencer.find({
//           skip,
//           limit,
//           where:
//             req.query.filter != undefined
//               ? req.query.filter.where
//               : { and: [{ influencerId: { neq: null } }, { relogin: false }] },
//           order: `created ${filter}`,
//           include: [
//             "promos",
//             "pageVisitors",
//             "shippingAddresses",
//             "team",
//             "withdraws",
//             "account",
//             {
//               relation: "account",
//               scope: {
//                 fields: ["email", "phoneNumber", "verified"]
//               }
//             },
//             {
//               relation: "instagrams",
//               scope: {
//                 fields: [
//                   "id",
//                   "influencerId",
//                   "username",
//                   "fullname",
//                   "isBusiness",
//                   "profilePicture",
//                   "bio",
//                   "followers",
//                   "following",
//                   "totalPosting",
//                   "recentMedia",
//                   "created",
//                   "updated"
//                 ]
//               }
//             },
//             {
//               relation: "products"
//             },
//             {
//               relation: "facebooks",
//               scope: {
//                 fields: [
//                   "id",
//                   "influencerId",
//                   "igBusinessId",
//                   "username",
//                   "profilePicture",
//                   "website",
//                   "bio",
//                   "followerCount",
//                   "followingCount",
//                   "mediaCount",
//                   "imageCount",
//                   "videoCount",
//                   "media",
//                   "created",
//                   "updated"
//                 ],
//                 include: "mediaInsights",
//                 where: {
//                   visible: true
//                 }
//               }
//             },
//             "youtubes"
//           ]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             influencer
//           }
//         });
//       }

//       if (
//         !account ||
//         !product ||
//         !order ||
//         !team ||
//         !subscription ||
//         !withdraw ||
//         !influencer ||
//         !merchant
//       ) {
//         throw errorHelper.instanceNotFound(`Model ${model}`);
//       }
//     } catch (e) {
//       console.log("ERROR_GET_ALL_ACCOUNTS", e.message);
//       app.models.Log.create({
//         type: "ERROR_GET_ALL_ACCOUNTS",
//         model: "ACCOUNT",
//         detail: e.message
//       });
//       return Promise.reject(e);
//     }
//   };

//   Account.getBrand = async (model, req, res, cb) => {
//     console.log(req.accessToken);
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const myAccount = await Account.findById(req.accessToken.userId);
//       console.log(myAccount);

//       if (myAccount.userType !== "brand") {
//         throw errorHelper.badAuthorization();
//       }

//       const myBrand = await app.models.Brand.findOne({
//         where: {
//           accountId: myAccount.id
//         }
//       });

//       let page, skip;
//       let limit = 10;
//       let filter = "DESC";

//       page = Number(req.query.page) - 1;
//       limit = req.query.page ? limit : 0;
//       if (req.query.limit) {
//         limit = req.query.limit;
//       }

//       skip = req.query.page ? Math.floor(page * limit) : 0;

//       let campaign,
//         product,
//         order,
//         team,
//         subscription,
//         withdraw,
//         merchant,
//         influencer;

//       if (model.toLowerCase() === "campaign") {
//         campaign = await app.models.Campaign.find({
//           skip,
//           limit,
//           where: {
//             brandId: myBrand.id
//           }
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             campaign
//           }
//         });
//       }

//       if (model.toLowerCase() === "facebook") {
//         // console.log(req.query.filter, 'req.query.filterreq.query.filterreq.query.filterreq.query.filter')
//         influencer = await app.models.Facebook.find({
//           where: { brandId: myBrand.id },
//           order: `created ${filter}`,
//           include: [
//             // {
//             //   relation: 'account',
//             //   scope: {
//             //     fields: [
//             //       'email',
//             //       'phoneNumber',
//             //       'verified'
//             //     ],
//             //   }
//             // },
//             "influencer",
//             "brand",
//             {
//               relation: "instagramHistories",
//               scope: {
//                 order: `created DESC`
//               }
//             }
//           ]
//         });

//         console.log("------facebook-------");
//         console.log(influencer);
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             socialMedia: influencer
//           }
//         });
//       }
//       if (model.toLowerCase() === "brand") {
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             brand: myBrand
//           }
//         });
//       }

//       if (model.toLowerCase() === "influencers") {
//         console.log(
//           req.query.filter,
//           "req.query.filterreq.query.filterreq.query.filterreq.query.filter"
//         );
//         influencer = await app.models.Facebook.find({
//           skip,
//           limit,
//           where:
//             req.query.filter != undefined
//               ? req.query.filter.where
//               : { and: [{ influencerId: { neq: null } }, { relogin: false }] },
//           order: `created ${filter}`,
//           include: [
//             // {
//             //   relation: 'account',
//             //   scope: {
//             //     fields: [
//             //       'email',
//             //       'phoneNumber',
//             //       'verified'
//             //     ],
//             //   }
//             // },
//             {
//               relation: "influencer",
//               scope: {
//                 fields: ["fullname"]
//               }
//             },
//             {
//               relation: "instagramHistories",
//               scope: {
//                 order: `created DESC`
//               }
//             }
//           ]
//         });

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: {
//             influencer
//           }
//         });
//       }

//       if (
//         !account ||
//         !product ||
//         !order ||
//         !team ||
//         !subscription ||
//         !withdraw ||
//         !influencer ||
//         !merchant
//       ) {
//         throw errorHelper.instanceNotFound(`Model ${model}`);
//       }
//     } catch (e) {
//       console.log("ERROR_GET_ALL_BRANDS", e.message);
//       app.models.Log.create({
//         type: "ERROR_GET_ALL_BRANDS",
//         model: "ACCOUNT",
//         detail: e.message
//       });
//       return Promise.reject(e);
//     }
//   };

//   Account.adminSosmed = async (req, res, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const myAccount = await Account.findById(req.accessToken.userId);

//       if (myAccount.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       let page, skip;
//       let limit = 10;

//       page = Number(req.query.page) - 1;
//       limit = req.query.page ? limit : 0;
//       if (req.query.limit) {
//         limit = req.query.limit;
//       }

//       skip = req.query.page ? Math.floor(page * limit) : 0;

//       const influencers = await app.models.Influencer.find();
//       const facebooks = await app.models.Facebook.find();

//       return Promise.resolve({
//         status: "success",
//         message: "success",
//         data: {
//           influencers,
//           facebooks
//         }
//       });
//     } catch (error) {
//       console.log("ERROR_GET_ADMIN_SOSMED", error.message);
//       return Promise.reject(error);
//     }
//   };

//   Account.adminDashboard = async (req, res, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const myAccount = await Account.findById(req.accessToken.userId);

//       if (myAccount.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       let page, skip;
//       let limit = 10;

//       page = Number(req.query.page) - 1;
//       limit = req.query.page ? limit : 0;
//       if (req.query.limit) {
//         limit = req.query.limit;
//       }

//       skip = req.query.page ? Math.floor(page * limit) : 0;

//       const orders = await app.models.Order.find({
//         include: [
//           "influencer",
//           "orderStatuses",
//           "merchant",
//           {
//             relation: "product",
//             scope: {
//               include: [
//                 {
//                   relation: "productType",
//                   scope: {
//                     include: "productCategory"
//                   }
//                 },
//                 "facebooks"
//               ]
//             }
//           }
//         ]
//       });
//       const influencers = await app.models.Influencer.find();
//       const facebooks = await app.models.Facebook.find();
//       const youtubes = await app.models.Youtube.find();
//       const payments = await app.models.Payment.find({
//         where: {
//           transactionStatus: "settlement"
//         }
//       });

//       const ordersWaiting = await app.models.OrderStatus.find({
//         where: {
//           status: "waiting"
//         }
//       });

//       const ordersCancel = await app.models.OrderStatus.find({
//         where: {
//           or: [
//             {
//               status: "canceled"
//             },
//             {
//               status: "rejected"
//             }
//           ]
//         }
//       });

//       const ordersCompleted = await app.models.OrderStatus.find({
//         where: {
//           status: "completed"
//         }
//       });

//       const ordersOnGoing = await app.models.OrderStatus.find({
//         where: {
//           or: [
//             {
//               status: "pending"
//             },
//             {
//               status: "revision"
//             },
//             {
//               status: "reviewed"
//             },
//             {
//               status: "approved"
//             }
//           ]
//         }
//       });

//       const influencer = {
//         labels: [],
//         series: []
//       };
//       const series = [];
//       const labels = [];
//       const socialMedia = {
//         labels: [],
//         series: []
//       };
//       const socialMediaSeries = [];
//       const order = {
//         labels: [],
//         series: []
//       };
//       const waiting = [];
//       const onGoing = [];
//       const canceled = [];
//       const completed = [];
//       const topInfluencer = await _(orders)
//         .groupBy(o => o.influencerId)
//         .toPairs()
//         .map(function(currentItem) {
//           return _.zipObject(["influencerId", "order"], currentItem);
//         })
//         .orderBy(a => a.order.length, ["desc"])
//         .value();
//       const topOrder = await _(orders)
//         .groupBy(o => o.productId)
//         .toPairs()
//         .map(function(currentItem) {
//           return _.zipObject(["productId", "order"], currentItem);
//         })
//         .orderBy(a => a.order.length, ["desc"])
//         .value();
//       // topInfluencer = await _
//       const orderPosition = [];
//       const influencerPosition = [];
//       await topInfluencer.slice(0, 5).map((item, key) => {
//         // console.log(item.order);
//         // console.log('ordernya :::::', item.order[0]);
//         const data = item.order.slice(0);
//         const product = data[0].product();
//         influencerPosition.push([
//           key + 1,
//           product.productName,
//           product.price,
//           item.order.length
//         ]);
//       });
//       await topOrder.slice(0, 5).map((item, key) => {
//         orderPosition.push([
//           key + 1,
//           item.order[0].product().productName,
//           item.order[0].product().price,
//           item.order.length
//         ]);
//       });

//       for (let i = 0; i < 6; i++) {
//         const lastInfluencer = influencers.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         ).length;
//         const date = moment(new Date())
//           .subtract(i, "days")
//           .format("DD MMM");
//         labels.push(date);
//         series.push(lastInfluencer);

//         const facebooksFilter = facebooks.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         );
//         const facebooksMap = facebooksFilter.map(data => data.influencerId);
//         const lastFacebook = [...new Set(facebooksMap)];

//         const youtubesFilter = youtubes.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         );
//         const youtubesMap = youtubesFilter.map(data => data.influencerId);
//         const lastYoutube = [...new Set(youtubesMap)];

//         socialMediaSeries.push(lastFacebook.length + lastYoutube.length);

//         const lastWaiting = ordersWaiting.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         ).length;
//         const lastOnGoing = ordersOnGoing.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         ).length;
//         const lastCancel = ordersCancel.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         ).length;
//         const lastCompleted = ordersCompleted.filter(
//           data => data.created <= moment(new Date()).subtract(i, "days")
//         ).length;

//         waiting.push(lastWaiting);

//         onGoing.push(lastOnGoing);

//         canceled.push(lastCancel);

//         completed.push(lastCompleted);
//       }

//       influencer.series.push(series.reverse());
//       influencer.labels = labels.reverse();
//       socialMedia.labels = labels.reverse();
//       socialMedia.series.push(socialMediaSeries.reverse());
//       order.labels = labels.reverse();
//       order.series.push(waiting.reverse());
//       order.series.push(onGoing.reverse());
//       order.series.push(canceled.reverse());
//       order.series.push(completed.reverse());

//       // console.log(influencer);
//       return Promise.resolve({
//         status: "success",
//         message: "success",
//         data: {
//           counts: {
//             orders: orders.length,
//             influencers: influencers.length,
//             socialMedia: {
//               facebook: facebooks.length,
//               youtube: youtubes.length
//             }
//           },
//           stats: {
//             influencer: {
//               options: {
//                 axisX: {
//                   showGrid: false
//                 },
//                 axisY: {
//                   showGrid: true,
//                   offset: 40
//                 },
//                 height: "300px",
//                 low: Number(series.sort((a, b) => a < b).slice(0)),
//                 high: Number(series.sort((a, b) => a > b).slice(0)),
//                 showPoint: true
//               },
//               data: influencer
//             },
//             socialMedia,
//             orders: {
//               options: {
//                 axisX: {
//                   showGrid: false
//                 },
//                 axisY: {
//                   showGrid: true,
//                   offset: 40
//                 },
//                 height: "300px",
//                 low: Number(series.sort((a, b) => a < b).slice(0)),
//                 high: Number(series.sort((a, b) => a > b).slice(0)),
//                 showPoint: true
//               },
//               data: order
//             }
//           },
//           topInfluencer: influencerPosition,
//           topOrder: orderPosition,
//           revenue: payments
//             .map(data => Number(data.grossAmount))
//             .reduce((total, num) => total + num)
//         }
//       });
//     } catch (e) {
//       console.log("ERROR_GET_ADMIN_DASHBOARD", e.message);
//       return Promise.reject(e);
//     }
//   };

//   Account.adminEditProfile = async (influencerId, req, res, cb) => {
//     const { email, fullname, phoneNumber } = req.body;
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const admin = await Account.findById(req.accessToken.userId);

//       if (admin.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       const influencer = await app.models.Influencer.findById(influencerId);
//       if (!influencer) {
//         throw errorHelper.instanceNotFound("Influencer");
//       }

//       const account = await Account.findById(influencer.accountId);

//       const updateAccount = await account.updateAttributes({
//         email,
//         fullname,
//         phoneNumber
//       });

//       const updateInfluencer = await influencer.updateAttributes({
//         fullname
//       });

//       return Promise.resolve({
//         status: "success",
//         message: "success",
//         data: {
//           account: {
//             email,
//             fullname,
//             phoneNumber
//           }
//         }
//       });
//     } catch (e) {
//       console.log("ERROR_PATCH_ADMIN_PROFILE", e.message);
//       return Promise.reject(e);
//     }
//   };

//   Account.replaceUsernameWhitespace = async (req, res, cb) => {
//     try {
//       const accounts = await Account.find();
//       console.log("accounts: ", accounts.length);

//       let updateAccount;
//       let count = 0;

//       for (let i = 0; i < accounts.length; i++) {
//         if (accounts.length > 0) {
//           if (checkWhiteSpace(accounts[i].username)) {
//             updateAccount = await accounts[i].updateAttributes({
//               username: accounts[i].username.replace(/\s/g, "")
//             });
//             count++;
//           }
//         }
//       }

//       return Promise.resolve({
//         status: "success",
//         message: `successfully updated ${count} accounts`
//       });
//     } catch (e) {
//       console.log("ERROR_REPLACE_USERNAME_WHITESPACE", e.message);
//       return Promise.reject(e);
//     }
//   };

//   Account.adminGetSocial = async (social, req, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const account = await Account.findById(req.accessToken.userId);

//       if (account.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       if (social != "facebook" && social != "youtube") {
//         throw errorHelper.badInput("Social");
//       }

//       if (social === "facebook") {
//         const facebooks = await app.models.Facebook.find({
//           fields: {
//             accessToken: false,
//             media: false
//           },
//           order: "created DESC"
//         });
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: facebooks
//         });
//       }

//       if (social === "youtube") {
//         const youtubes = await app.models.Youtube.find({
//           fields: {
//             accessToken: false,
//             refreshToken: false,
//             videos: false
//           },
//           order: "created DESC"
//         });
//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: youtubes
//         });
//       }
//     } catch (e) {
//       console.log("ERROR_ADMIN_GET_SOCIALS", e.message);
//       return Promise.reject(e);
//     }
//   };

//   Account.adminGetSocialDetail = async (social, influencerId, req, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const account = await Account.findById(req.accessToken.userId);

//       if (account.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       if (social != "facebook" && social != "youtube") {
//         throw errorHelper.badInput("Social");
//       }

//       const influencer = await app.models.Influencer.findById(influencerId);

//       if (!influencer) {
//         throw errorHelper.instanceNotFound("Influencer");
//       }

//       if (social === "facebook") {
//         const facebook = await app.models.Facebook.findOne({
//           where: {
//             influencerId
//           },
//           fields: {
//             accessToken: false
//           }
//         });

//         if (!facebook) {
//           throw errorHelper.instanceNotFound("Facebook");
//         }

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: facebook
//         });
//       }

//       if (social === "youtube") {
//         const youtube = await app.models.Youtube.findOne({
//           where: {
//             influencerId
//           },
//           fields: {
//             accessToken: false,
//             refreshToken: false
//           }
//         });

//         if (!youtube) {
//           throw errorHelper.instanceNotFound("Youtube");
//         }

//         return Promise.resolve({
//           status: "success",
//           message: "success",
//           data: youtube
//         });
//       }
//     } catch (e) {
//       console.log("ERROR_ADMIN_GET_SOCIAL_DETAILS", e.message);
//       return Promise.reject(e);
//     }
//   };

//   Account.formatPhoneNumber = async (req, cb) => {
//     try {
//       if (req.accessToken == null) {
//         throw errorHelper.badAuthorization();
//       }

//       const account = await Account.findById(req.accessToken.userId);

//       if (account.realm !== "ADMIN") {
//         throw errorHelper.badAuthorization();
//       }

//       const accounts = await Account.find();
//       const merchants = await app.models.Merchant.find();
//       let count = 0;

//       for (let i = 0; i < accounts.length; i++) {
//         const phone = await accounts[i].phoneNumber.split("");

//         if (phone[0] === "0") {
//           let newPhoneNumber = "+62" + accounts[i].phoneNumber.substring(1);
//           const update = await accounts[i].updateAttributes({
//             phoneNumber: newPhoneNumber
//           });
//           count++;
//         }

//         if (accounts[i].countryCode == null) {
//           const update = await accounts[i].updateAttributes({
//             countryCode: "+62",
//             country: "id"
//           });
//         }
//       }

//       for (let i = 0; i < merchants.length; i++) {
//         const merchantPhone = await merchants[i].phoneNumber.split("");

//         if (merchantPhone[0] == "0") {
//           let newPhoneNumber = "+62" + merchants[i].phoneNumber.substring(1);
//           const update = await merchants[i].updateAttributes({
//             phoneNumber: newPhoneNumber
//           });
//         }
//         if (merchantPhone[0] == "8") {
//           let newPhoneNumber = "+62" + merchants[i].phoneNumber;
//           const update = await merchants[i].updateAttributes({
//             phoneNumber: newPhoneNumber
//           });
//         }

//         if (merchants[i].countryCode == null) {
//           const update = await merchants[i].updateAttributes({
//             countryCode: "+62",
//             country: "id"
//           });
//         }
//       }

//       return {
//         status: "success",
//         message: `updated ${count} accounts phone number`
//       };
//     } catch (e) {
//       console.log(e);
//       throw e;
//     }
//   };
};
