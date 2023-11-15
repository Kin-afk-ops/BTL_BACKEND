const router = require("express").Router();
const InfoUsers = require("../models/InfoUsers");
const { verifyTokenAnhAuthorizationUser } = require("../jwt/verifyTokenUser");

//CREATE
router.post("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  const newInfoUser = new InfoUsers({
    _id: req.params.id,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    phone: req.body.phone,
    sex: req.body.sex,
    birthday: req.body.birthday,
    address: req.body.address,
  });
  try {
    const saveInfoUser = await newInfoUser.save();
    res.status(200).json(saveInfoUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:id", async (req, res) => {
  try {
    const infoUser = await InfoUsers.findById(req.params.id);
    res.status(200).json(infoUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    const updateInfoUser = await InfoUsers.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAnhAuthorizationUser, async (req, res) => {
  try {
    await InfoUsers.findByIdAndDelete(req.params.id);
    res.status(200).json("Info User has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;