
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

// Route => '/api/users/register'
router.post('/register', function(req, res) {

    const { errors, isValid } = validateRegisterInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({
        email: req.body.email
    }).then(user => {
        if(user) {
            return res.status(400).json({
                email: 'Email already exists'
            });
        }
        else {
            const avatar = gravatar.url(req.body.email, {
                s: '300',
                r: 'pg',
                d: 'mm'
            });
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                avatar
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                if(err) console.error('There was an error', err);
                else {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if(err) console.error('There was an error', err);
                        else {
                            newUser.password = hash;
                            newUser
                                .save()
                                .then(user => {
                                    res.json(user)
                                }); 
                        }
                    });
                }
            });
        }
    });
});

// Route => '/api/users/login'
router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body);

    if(!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            if(!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors);
            }
            bcrypt.compare(password, user.password)
            .then(isMatch => {
                if(isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        avatar: user.avatar
                    }
                    jwt.sign(payload, 'secret', {
                        expiresIn: 3600
                    }, (err, token) => {
                        if(err) console.error('There is some error in token', err);
                        else {
                            res.json({
                                success: true,
                                token: `Bearer ${token}`
                            });
                        }
                    });
                }
                else {
                    errors.password = 'Incorrect Password';
                    return res.status(400).json(errors);
                }
            });
        });
});

// GET LOGGED IN USER OBJECT
router.get('/me', passport.authenticate('jwt', { session: false }), (req, res) => {
    return res.status(200).json({
        name: req.user.name,
        email: req.user.email,
        id: req.user.id,
        avatar: req.user.avatar
    });
});

// GET ALL LISTS
// router.get('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const docs = await List
//             .find({ createdBy: req.user.id })
//             .lean()
//             .exec();

//         res.status(200).json(docs);
//     } catch (e) {
//         console.error(e);
//         res.status(400).end();
//     }
// });

// GET ALL VIOLATION LIST
router.get('/violation', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const docs = await Violation
            .find({ createdBy: req.user.id })
            .lean()
            .exec();

        res.status(200).json(docs);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

// POST VIOLATION LIST
router.post('/violation', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const doc = await Violation.create({ ...req.body, createdBy: req.user.id });
        res.status(200).json(doc);
    } catch(e) {
        console.error(e);
        res.status(400).end();
    }
});

// POST LIST
// router.post('/list', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const doc = await List.create({ ...req.body, createdBy: req.user.id });
//         res.status(200).json(doc);
//     } catch(e) {
//         console.error(e);
//         res.status(400).end();
//     }
// });

// REMOVE LIST
// router.delete('/list/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         await List.findByIdAndDelete({ _id: req.params.id });
//         res.status(200).json("List has been removed!");
//     } catch (e) {
//         console.error(e);
//         res.status(400).end();
//     }
// });


// VIOLATION DELETE
router.delete('/violation/delete/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        await Violation.findByIdAndDelete({ _id: req.params.id });
        res.status(200).json("Violation record has been removed!");
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

// GET LIST BY ID
// router.get('/list/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
//     try {
//         const doc = await List.findById({ _id: req.params.id });
//         res.status(200).json(doc);
//     } catch (e) {
//         console.error(e);
//         res.status(400).end();
//     }
// });

// GET VIOLATION BY ID
router.get('/violation/edit/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    try {
        const doc = await Violation.findById({ _id: req.params.id });
        res.status(200).json(doc);
    } catch (e) {
        console.error(e);
        res.status(400).end();
    }
});

// UPDATE LIST
// router.post('/list/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
//     List.findById(req.params.id, function(err, list) {
//         if (!list)
//             res.status(404).send("Data is not found");
//         else {

//             list.name = req.body.name;
//             list.address = req.body.address;
//             list.country = req.body.country;
//             list.city = req.body.city;
//             list.state = req.body.state;
//             list.phone = req.body.phone;
//             list.description = req.body.description;

//             list.save().then(response => {
//                 res.status(200).json({...req.body});
//             })
//             .catch(err => {
//                 res.status(400).send("Not able to update the database");
//             });
//         }
//     });
// });


// UPDATE VIOLATION
router.post('/violation/update/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Violation.findById(req.params.id, function(err, violation) {
        if (!violation)
            res.status(404).send("Data is not found");
        else {

            violation.name = req.body.name;
            violation.country = req.body.country;
            violation.registrationNumber = req.body.registrationNumber;
            violation.category = req.body.category;
            violation.violationOwner = req.body.violationOwner;
            violation.typeOfDocument = req.body.typeOfDocument;
            violation.status = req.body.status;
            violation.issuedBye = req.body.issuedBye;

            violation.save().then(response => {
                res.status(200).json({...req.body});
            })
            .catch(err => {
                res.status(400).send("Not able to update the database");
            });
        }
    });
});
  

module.exports = router;

