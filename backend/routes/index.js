const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');
const User = require('../models/User');
const List = require('../models/List');
const Violation = require('../models/Violation');
const nodemailer = require('nodemailer');

//
// Route => '/v1/api/signup'
//
router.post('/signup', (req, res) => {
   try {
      const { errors, isValid } = validateRegisterInput(req.body);
      const { email } = req.body;
      if (!isValid) {
         return res.status(400).json(errors);
      }
      User.findOne({
         email,
      }).then(user => {
         // If the user already exists in the data base show a message return 400
         if (user) {
            return res.status(400).json({
               email: 'Email already exists, please enter a valid email!',
            });
         } else {
            // Create transport object config for SMTP server
            var transporter = nodemailer.createTransport({
               service: 'gmail',
               auth: {
                  user: process.env.GMAIL_LOGIN,
                  pass: process.env.GMAIL_PASS,
               },
            });
            // Setup mail options
            var mailOptions = {
               from: process.env.GMAIL_LOGIN,
               to: req.body.email,
               subject: '2FA dummy verification',
               text: `Your verification code for signup/login is ${process.env.SUPER_SECRET_RECOVERY_CODE}`,
            };
            // Send verification code
            transporter.sendMail(mailOptions, function (error, info) {
               if (error) {
                  console.log(error);
               } else {
                  console.log('Email sent: ' + info.response);
               }
            });

            return res.status(200).json({
               success: true,
               successMessage:
                  'The sign up was complete please check your email for verification code',
            });
         }
      });
   } catch (error) {
      return res
         .status(404)
         .json({ errorMessage: 'An error occured while trying to signup' });
   }
});

//
// Route => '/v1/api/signup-verification'
//
router.post('/signup-verification', function (req, res) {
   const { errors, isValid } = validateRegisterInput(req.body);

   if (!isValid) {
      return res.status(400).json(errors);
   }
   User.findOne({
      email: req.body.email,
   }).then(user => {
      if (user) {
         return res.status(400).json({
            email: 'Email already exists, please enter a valid email!',
         });
      }
      // Check if the recovery code provided from the request body is empty if so return 404
      else if (!recoveryCode || 0 === recoveryCode.length) {
         return res
            .status(404)
            .json({ errorMessage: 'The recovery code is empty or invalid!' });
      }
      // This is extreamly hacky but essentially the request body should provide a recovery code which was recieved in their email and this
      // would be a simple check to see if the recovery code from the body input matches the variable.
      else if (recoveryCode !== process.env.SUPER_SECRET_RECOVERY_CODE) {
         console.log(recoveryCode);
         return res.status(404).json({
            errorMessage: 'The recovery code does not match our records!',
         });
      } else {
         const profilePicture = gravatar.url(req.body.email, {
            s: '300',
            r: 'pg',
            d: 'mm',
         });
         const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            profilePicture,
            roleName: !req.body.roleName ? 'GUEST' : req.body.roleName,
            status: !req.body.status ? 'INACTIVE' : req.body.status,
         });

         bcrypt.genSalt(10, (err, salt) => {
            if (err) console.error('There was an error', err);
            else {
               bcrypt.hash(newUser.password, salt, (err, hash) => {
                  if (err) console.error('There was an error', err);
                  else {
                     newUser.password = hash;
                     newUser.save().then(user => {
                        res.json(user);
                     });
                  }
               });
            }
         });
      }
   });
});

//
// Route => '/v1/api/login'
//

router.post('/login', (req, res) => {
   try {
      const { errors, isValid } = validateLoginInput(req.body);
      if (!isValid) return res.status(400).json(errors);

      const { email, password } = req.body;

      // Check that the user exists and compared the password from body to the hashed password in database
      User.findOne({ email }).then(user => {
         // Check if there is a user found in the database
         if (!user) {
            errors.email = 'User not found';
            return res
               .status(404)
               .json({ errorMessage: 'User cannot be found in our records!' });
         }
         bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
               // Create transport object config for SMTP server
               var transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                     user: process.env.GMAIL_LOGIN,
                     pass: process.env.GMAIL_PASS,
                  },
               });
               // Setup mail options
               var mailOptions = {
                  from: process.env.GMAIL_LOGIN,
                  to: req.body.email,
                  subject: '2FA dummy verification',
                  text: `Your verification code for signup/login is ${process.env.SUPER_SECRET_RECOVERY_CODE}`,
               };
               // Send verification code
               transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                     console.log(error);
                  } else {
                     console.log('Email sent: ' + info.response);
                  }
               });
               return res.status(200).json({
                  success: true,
                  message: 'Successfully sent 2FA verification code to email!',
               });
            } else {
               return res.status(400).json({
                  errorMessage:
                     'An error occured either incorrect password or something else happened!',
               });
            }
         });
      });
   } catch (error) {
      return res.status(400);
   }
});

//
// Route => 'v1/api/login-verification'
//

router.post('/login-verification', (req, res) => {
   try {
      const { errors, isValid } = validateLoginInput(req.body);

      if (!isValid) {
         return res.status(400).json(errors);
      }

      const { email, password, recoveryCode } = req.body;

      User.findOne({ email }).then(user => {
         if (!user) {
            errors.email = 'User not found';
            return res.status(404).json(errors);
         }
         // Check if the recovery code provided from the request body is empty if so return 404
         if (!recoveryCode || 0 === recoveryCode.length) {
            return res.status(404).json({
               errorMessage: 'The recovery code is empty or invalid!',
            });
         }
         // This is extreamly hacky but essentially the request body should provide a recovery code which was recieved in their email and this
         // would be a simple check to see if the recovery code from the body input matches the variable.
         if (recoveryCode !== process.env.SUPER_SECRET_RECOVERY_CODE) {
            return res.status(403).json({
               errorMessage: 'The recovery code not valid!',
            });
         }
         bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
               const payload = {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  username: user.username,
                  profilePicture: user.profilePicture,
                  roleName: user.roleName,
               };
               jwt.sign(
                  payload,
                  'secret',
                  {
                     expiresIn: 3600,
                  },
                  (err, token) => {
                     if (err)
                        console.error('There is some error in token', err);
                     else {
                        res.json({
                           success: true,
                           token: `Bearer ${token}`,
                        });
                     }
                  },
               );
            } else {
               errors.password = 'Incorrect Password';
               return res.status(400).json(errors);
            }
         });
      });
   } catch (error) {
      return res
         .status(404)
         .json({ errorMessage: 'Something went wrong when verifying login' });
   }
});

//
// GET LOGGED IN USER OBJECT
//
router.get(
   '/me',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      return res.status(200).json({
         id: req.user.id,
         name: req.user.name,
         email: req.user.email,
         roleName: req.user.roleName,
         profilePicture: req.user.profilePicture,
      });
   },
);

// GET ALL LISTS
router.get(
   '/list',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const docs = await List.find({ createdBy: req.user.id }).lean().exec();
         res.status(200).json(docs);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// GET ALL USERS
router.get(
   '/usersList',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const docs = await User.find({}).lean().exec();

         res.status(200).json(docs);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

router.post('/usersList', async (req, res) => {
   try {
      const docs = await User.find({
         createdAt: {
            $gte: new Date(req.body.startDate),
            $lte: new Date(req.body.endDate),
         },
      })
         .sort({ firstName: 'asc' })
         .lean()
         .exec();
      res.status(200).json(docs);
   } catch (e) {
      console.error(e);
      res.status(400).end();
   }
});

// GET ALL VIOLATION LIST
router.get(
   '/violation',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         if (req.user.roleName === 'OPERATOR') {
            const docs = await Violation.find({}).lean().exec();
            res.status(200).json(docs);
         } else {
            console.error('Unauthorized!');
            res.status(401).end();
         }
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

router.get(
   '/violation/:status',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const docs = await Violation.find({ status: req.params.status })
            .lean()
            .exec();

         res.status(200).json(docs);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// POST VIOLATION LIST
router.post(
   '/violation',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const doc = await Violation.create({
            ...req.body,
            createdBy: req.user.id,
         });
         res.status(200).json(doc);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// POST LIST
router.post(
   '/list',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const doc = await List.create({ ...req.body, createdBy: req.user.id });
         res.status(200).json(doc);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// REMOVE LIST
router.delete(
   '/list/delete/:id',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         await List.findByIdAndDelete({ _id: req.params.id });
         res.status(200).json('List has been removed!');
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// VIOLATION DELETE
router.delete(
   '/violation/delete/:id',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         await Violation.findByIdAndDelete({ _id: req.params.id });
         res.status(200).json('Violation record has been removed!');
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// GET LIST BY ID
router.get(
   '/list/edit/:id',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const doc = await List.findById({ _id: req.params.id });
         res.status(200).json(doc);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// GET VIOLATION BY ID
router.get(
   '/violation/edit/:id',
   passport.authenticate('jwt', { session: false }),
   async (req, res) => {
      try {
         const doc = await Violation.findById({ _id: req.params.id });
         res.status(200).json(doc);
      } catch (e) {
         console.error(e);
         res.status(400).end();
      }
   },
);

// UPDATE VIOLATION
router.post(
   '/violation/update/:id',
   passport.authenticate('jwt', { session: false }),
   (req, res) => {
      Violation.findById(req.params.id, function (err, violation) {
         if (!violation) res.status(404).send('Data is not found');
         else {
            violation.name = req.body.name;
            violation.country = req.body.country;
            violation.registrationNumber = req.body.registrationNumber;
            violation.category = req.body.category;
            violation.violationOwner = req.body.violationOwner;
            violation.typeOfDocument = req.body.typeOfDocument;
            violation.status = req.body.status;
            violation.issuedBye = req.body.issuedBye;

            violation
               .save()
               .then(response => {
                  res.status(200).json({ ...req.body });
               })
               .catch(err => {
                  res.status(400).send('Not able to update the database');
               });
         }
      });
   },
);

module.exports = router;
