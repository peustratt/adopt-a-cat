const router = require("express").Router();
const createError = require("http-errors");
const { Cat } = require("../models");

router
  .route("/")
  .get((req, res, next) =>
    Promise.resolve()
      .then(() => {
        return Cat.find(req.query.tag ? { tags: req.query.tag } : {})
          .populate("tags")
          .limit(20)
          .sort(
            req.query.name
              ? { name: req.query.name }
              : { createdAt: req.query.date }
          )
          .skip((req.query.page || 0) * 20);
      })
      .then((data) => res.status(200).json(data))
      .catch((err) => next(err))
  )
  .post((req, res, next) =>
    Promise.resolve()
      .then(() => new Cat(req.body).save())
      .then((data) => res.status(201).json(data))
      .then((err) => next(err))
  );

router
  .route("/:id")
  .get((req, res, next) =>
    Promise.resolve()
      .then(() => Cat.findById(req.params.id))
      .then((data) =>
        data ? res.status(200).json(data) : next(createError(404))
      )
      .catch((err) => next(err))
  )
  .delete((req, res, next) =>
    Promise.resolve()
      .then(() => Cat.findByIdAndDelete(req.params.id))
      .then((data) => res.status(200).json({ message: "Deleted" }))
      .then((err) => next(err))
  );

router.route("/favorite/:id").get((req, res, next) =>
  Promise.resolve()
    .then(() => Cat.findByIdAndUpdate(req.params.id, { favorited: true }))
    .then((data) => res.status(200).json({ message: "favorited" }))
    .catch((err) => next(err))
);

router.route("/unfavorite/:id").get((req, res, next) =>
  Promise.resolve()
    .then(() => Cat.findByIdAndUpdate(req.params.id, { favorited: false }))
    .then((data) => res.status(200).json({ message: "unfavorited" }))
    .catch((err) => next(err))
);
module.exports = router;
