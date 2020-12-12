// routes/auth.routes.js

const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const authorSchema = require("../models/Author");
const blogSchema = require("../models/Blog");
const authorize = require("../middlewares/auth");
const { check, validationResult } = require("express-validator");
const { populate } = require("../models/Author");


// Sign-up
router.post(
  "/register-author",
  [
    check("name")
      .not()
      .isEmpty()
      .isLength({ min: 3 })
      .withMessage("Name must be atleast 3 characters long"),
    check("email", "Email is required").not().isEmpty(),
    check("password", "Password should be between 5 to 8 characters long")
      .not()
      .isEmpty()
      .isLength({ min: 5, max: 15 }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        authorSchema
          .findOne({
            email: req.body.email,
          })
          .then((author) => {
            if (author != null) {
              return res.status(401).json({
                message: "Email not available Authentication failed",
              });
            } else {
              let saveAuthor = {};
              saveAuthor.name = req.body.name;
              saveAuthor.email =  req.body.email;
              saveAuthor.password = hash;
              let author = new authorSchema(saveAuthor)
              author
                .save()
                .then((response) => {
                  res.status(201).json({
                    message: "information updated successfully  ",
                    result: response,
                  });
                })
                .catch((error) => {
                  res.status(500).json({
                    error: error.message,
                  });
                });
            }
          })
          .catch((error) => {
            res.status(500).json({
              error: error,
            });
          });
      });
    }
  }
);

 
// Sign-in
router.post("/signin", (req, res, next) => {
  let getUser;
  authorSchema
    .findOne({
      email: req.body.email,
    })
    .then((user) => {
      if (!user) {
        return res.status(200).json({
          status: 401,
          message: "Authentication failed",
        });
      } else {
        getAuthor = user;
        return bcrypt.compare(req.body.password, user.password);
      }
    })
    .then((response) => {
      if (!response) {
        return res.status(200).json({
          status: 401,
          message: "Authentication failed",
        });
      } else {
        if (getAuthor) {
          let jwtToken = jwt.sign(
            {
              email: getAuthor.email,
              userId: getAuthor._id,
              author: true,
            },
            "YOUR_UNIQUE_JWT_TOKEN_SECRET",
            {
              expiresIn: "1h",
            }
          );

          getAuthor.lastlogin = Date.now();
          getAuthor.save();

          res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            _id: getAuthor._id,
            prifile: getAuthor,
          });
        }
      }
    });
});


router.route("/getBloglist").get((req, res) => {
  blogSchema.
  aggregate([{ $match:  {} }, { $sort: { "createdAt": -1 } }, ])
  .allowDiskUse(true).
  exec(function(err,logs){ 

    if (!logs || logs.length === 0) {
      return res.status(404).json({
        err: "no files exist",
      });
    }
    return res.status(200).json(logs)

  });
});

router.route("/getBlogCategory").get((req, res) => {
  blogSchema.find({category: req.query.category}).populate('author','name').exec((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

router.route("/getBlogId").get((req, res) => {
  blogSchema.find({_id: req.query.id}).populate('author','name').exec((error, response) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json(response);
    }
  });
});

router.route("/addBlog").post(authorize,(req, res) => {
  let blog = {};
  blog.title = req.body.title;
  blog.description = req.body.description;
  blog.category = req.body.category;
  blog.author = req.body.author;
  blog.image = req.body.image;

  let obj = new blogSchema(blog)
  obj.save();
  return res.status(200).json({
    status: 200,
    message: "Blog added",
  });
});


module.exports = router;
