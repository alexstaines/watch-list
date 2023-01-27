const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const List = require("../../models/list");
const User = require("../../models/user");
const { default: mongoose } = require("mongoose");

// @route Get API/list/me
// @desc get current users list
// @access Public
router.get("/me", auth, async (req, res) => {
  try {
    const lists = await List.find({ user: req.user.id }).populate("user", ["username"]);

    if (!lists) {
      return res.status(400).json({ msg: "No list by this user" });
    }
    res.json(lists);
  } catch (err) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Post API/list
// @desc create user list item
// @access Private
router.post("/", [[auth, check("title", "Title must be provided").not().isEmpty()]], async (req, res) => {
  console.log(res.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    averageRating,
    synopsis,
    numberOfEps,
    subtype,
    posterImage,
    watched,
    dateStarted,
    dateFinished,
    watchedEps,
    personalRating,
    notes,
    position,
  } = req.body;

  // Build list object
  const listFields = {};
  listFields.user = req.user.id;
  if (title) listFields.title = title;
  if (averageRating) listFields.averageRating = averageRating;
  if (synopsis) listFields.synopsis = synopsis;
  if (numberOfEps) listFields.numberOfEps = numberOfEps;
  if (subtype) listFields.subtype = subtype;
  if (posterImage) listFields.posterImage = posterImage;
  if (watched) listFields.watched = watched;
  if (dateStarted) listFields.dateStarted = dateStarted;
  if (dateFinished) listFields.dateFinished = dateFinished;
  if (watchedEps) listFields.watchedEps = watchedEps;
  if (personalRating) listFields.personalRating = personalRating;
  if (notes) listFields.notes = notes;
  listFields.dateAdded = Date.now();
  listFields.modified = Date.now();
  if (position) listFields.position = position;

  try {
    //create
    const list = new List(listFields);

    //let list = await List.findOneAndUpdate({ user: req.user.id }, { $set: listFields }, { upsert: true, new: true });
    await list.save();

    return res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Post API/list/id
// @desc update user list item
// @access Private
router.post("/edit/:id", [[auth]], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    title,
    averageRating,
    synopsis,
    numberOfEps,
    subtype,
    posterImage,
    watched,
    dateStarted,
    dateFinished,
    watchedEps,
    personalRating,
    notes,
    position,
  } = req.body;
  
  // Build list object
  const listFields = {};
  listFields.user = req.user.id;
  if (title) listFields.title = title;
  if (averageRating) listFields.averageRating = averageRating;
  if (synopsis) listFields.synopsis = synopsis;
  if (numberOfEps) listFields.numberOfEps = numberOfEps;
  if (subtype) listFields.subtype = subtype;
  if (posterImage) listFields.posterImage = posterImage;
  if (watched) listFields.watched = watched;
  if (dateStarted) listFields.dateStarted = dateStarted;
  if (dateFinished) listFields.dateFinished = dateFinished;
  if (watchedEps) listFields.watchedEps = watchedEps;
  if (personalRating) listFields.personalRating = personalRating;
  if (notes) listFields.notes = notes;
  listFields.modified = Date.now();
  if (position) listFields.position = position;

  try {
    let list = await List.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { $set: listFields }, { new: true });

    return res.json(list);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route Get API/list
// @desc get all lists
// @access Public
router.get("/", async (req, res) => {
  try {
    //const lists = await List.find({ visibility: true }).populate("user", { password: 0 });

    const lists = await List.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $match: { "user.visibility": false } },
      { $project: { "user.password": 0 } },
    ]);

    if (!lists || lists.length === 0) return res.status(400).json({ msg: "No lists to display." });

    res.json(lists);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// @route Get API/list/user/user_id
// @desc get list by user_id
// @access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    // const list = await List.find({ user: req.params.user_id }).populate({
    //   path: "user",
    //   select: { password: 0 },
    // });

    const list = await List.aggregate([
      { $match: { user: mongoose.Types.ObjectId(req.params.user_id) } },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "user",
        },
      },
      { $match: { "user.visibility": false } },
      { $project: { "user.password": 0 } },
    ]);

    if (!list || list.length === 0) return res.status(400).json({ msg: "No list under this user." });

    res.json(list);
  } catch (error) {
    console.error(error.message);
    if (error.kind == "ObjectId") {
      return res.status(400).json({ msg: "No list under this user." });
    }
    res.status(500).send("Server Error");
  }
});

// @route DELETE API/list/_id
// @desc delete list by id
// @access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const list = await List.findOneAndDelete({ _id: req.params.id, user: req.user.id });

    if (!list) return res.status(400).json({ msg: "This item does not exist or lacking permissions." });

    res.json({ msg: `List item for '${list.title}' deleted.` });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
