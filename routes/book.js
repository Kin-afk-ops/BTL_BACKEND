const router = require("express").Router();
const { verifyTokenAndAdminStaff } = require("../jwt/verifyTokenStaff");
const Books = require("../models/Books");

//CREATE
router.post("/", verifyTokenAndAdminStaff, async (req, res) => {
  const newBook = await Books(req.body);
  try {
    const saveBook = await newBook.save();
    res.status(200).json(saveBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const updateBook = await Books.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateBook);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    await Books.findByIdAndDelete(req.params.id);
    res.status(200).json("Books has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET BOOK
router.get("/find/:id", async (req, res) => {
  try {
    const book = await Books.findById(req.params.id);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL BOOK
router.get("/", verifyTokenAndAdminStaff, async (req, res) => {
  const qNew = req.query.qNew;
  const qCategory = req.query.qCategory;
  try {
    let books;
    if (qNew) {
      books = await Books.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      books = await Books.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      books = await Books.find().sort({ createdAt: -1 });
    }

    res.status(200).json(books);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
