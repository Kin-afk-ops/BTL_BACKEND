const router = require("express").Router();
const {
  verifyTokenUser,
  verifyTokenAnhAuthorizationUser,
} = require("../jwt/verifyTokenUser");
const Cart = require("../models/Cart");

//CREATE
router.post("/", verifyTokenUser, async (req, res) => {
  const newCart = await Cart(req.body);
  try {
    const saveCart = await newCart.save();
    res.status(200).json(saveCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    const updateCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateCart);
  } catch (error) {
    res.status(500).json(error);
  }
});

// DELETE

router.delete("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART
router.get("/find/:userId", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ UserId: req.params.userId });

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET ALL
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;