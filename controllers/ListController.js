const List = require("../models/ListModel")

exports.createPost = async (req, res) => {
  const list = req.body;
  const newList = new List(list);
  try {
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.createDate = async (req, res) => {
  const list = req.body;
  const { id: userId } = req.params;
  try {
    await List.updateOne(
      { _id: userId },
      { $push: { markedDates: list } }, { new: true, upsert: true }).exec();
    const newList = await List.find({ _id: userId })
    res.status(201).json(newList);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.getList = async (req, res) => {
  console.log("REQ", req.params)
  try {
    const { id: userId } = req.params;
    const post = await List.find({ userId: userId });
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.getSingleList = async (req, res) => {
  try {
    const { id: _id } = req.params;
    const post = await List.findById(_id);
    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
};

exports.updateList = async (req, res) => {
  const { id: _id } = req.params;
  const post = req.body;
  try {
    const updatedPost = await List.findByIdAndUpdate(_id, post, { new: true });
    res.json(updatedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};

exports.deleteList = async (req, res) => {
  const { id: _id } = req.params;
  try {
    const deletedPost = await List.findByIdAndRemove(_id);
    res.json(deletedPost);
  } catch (error) {
    res.status(409).json({
      message: error.message,
    });
  }
};