const router = require("express").Router();
const InfoStaffs = require("../models/InfoStaffs");
const { verifyTokenAnhAuthorizationStaff } = require("../jwt/verifyTokenStaff");

//CREATE
router.post("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  const newInfoStaff = new InfoStaffs({
    _id: req.params.id,
    lastName: req.body.lastName,
    firstName: req.body.firstName,
    phone: req.body.phone,
    sex: req.body.sex,
    birthday: req.body.birthday,
    address: req.body.address,
  });
  try {
    const saveInfoStaff = await newInfoStaff.save();
    res.status(200).json(saveInfoStaff);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    const infoStaff = await InfoStaffs.findById(req.params.id);
    res.status(200).json(infoStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    const updateInfoStaff = await InfoStaffs.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updateInfoStaff);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.delete("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    await InfoStaffs.findByIdAndDelete(req.params.id);
    res.status(200).json("Info Staff has been deleted...");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
