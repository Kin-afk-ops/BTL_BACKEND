const router = require("express").Router();
const InfoBooks = require("../models/InfoBooks");
const { verifyTokenAnhAuthorizationStaff } = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  const newInfoBook = new InfoBooks({
    _id: req.params.id,
    name: req.body.name,
    image: req.body.image,
    price: req.body.price,
    discount: req.body.discount,
    quantity: req.body.quantity,
    infoBook: req.body.infoBook,
    star: req.body.star,
  });
  try {
    const saveInfoBook = await newInfoBook.save();
    res.status(200).json(saveInfoBook);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    const updateInfoBook = await InfoBooks.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET
router.get("/:id", async (req, res) => {
  try {
    const infoBook = await InfoBooks.findById(req.params.id);
    res.status(200).json(infoBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    await InfoBooks.findByIdAndDelete(req.params.id);
    res.status(200).json("Info books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
