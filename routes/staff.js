const router = require("express").Router();
const CryptoJS = require("crypto-js");
const Staffs = require("../models/Staffs");
const Users = require("../models/Users");
const Cart = require("../models/Cart");
const {
  verifyTokenStaff,
  verifyTokenAnhAuthorizationBoss,
  verifyTokenAndAdminStaff,
  verifyTokenAndBoss,
} = require("../jwt/verifyTokenStaff");

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationBoss, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateStaff = await Staffs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE USERS
router.put("/updateUser/:id", verifyTokenAndAdminStaff, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }
  try {
    const updateUser = await Users.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    const { password, ...others } = updateUser._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE

router.delete("/:id", verifyTokenAnhAuthorizationBoss, async (req, res) => {
  try {
    await Staffs.findByIdAndDelete(req.params.id);
    res.status(200).json("Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndBoss, async (req, res) => {
  try {
    const user = await Staffs.findById(req.params.id);
    const { password, ...others } = user._doc;

    res.status(200).json({ ...others });
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL STAFF
router.get("/", verifyTokenAndBoss, async (req, res) => {
  const query = req.query.new;
  try {
    const staffs = query
      ? await Staffs.find().sort({ _id: -1 }).limit(5)
      : await Staffs.find();

    res.status(200).json(staffs);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USERS STATS
router.get("/stats", verifyTokenAndBoss, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await Users.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//CART
//GET USER CART
router.get(
  "/cartUser/find/:userId",
  verifyTokenAndAdminStaff,
  async (req, res) => {
    try {
      const cart = await Cart.findOne({ UserId: req.params.userId });

      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

router.get("/cartUser", verifyTokenAndAdminStaff, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
