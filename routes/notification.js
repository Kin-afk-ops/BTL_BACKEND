const router = require("express").Router();
const Notification = require("../models/Notification");
const { verifyTokenAnhAuthorizationStaff } = require("../jwt/verifyTokenStaff");
const { verifyTokenUser } = require("../jwt/verifyTokenUser");

//CREATE
router.post("/:userId", async (req, res) => {
  const newNotification = new Notification({
    userId: req.params.userId,
    notify: [
      {
        title:
          "Chào mừng bạn đến với Tôi đọc sách - Trang web mua bán sách trực tuyến",
        path: "/setting/:userId",
        content: "Hãy cập nhật thông tin cá nhân để nhận ngay ưu đãi!",
      },
    ],
  });

  try {
    const saveNotification = await newNotification.save();
    res.status(200).json(saveNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET
router.get("/:userId", verifyTokenUser, async (req, res) => {
  try {
    const notification = await Notification.findOne({
      userId: req.params.userId,
    });

    res.status(200).json(notification.notify);
  } catch (error) {
    res.status(500).json(error);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
  try {
    const newNotify = req.body;
    const updateNotification = await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $push: { notify: newNotify },
      },
      { new: true }
    );
    res.status(200).json(updateNotification);
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE
router.put("/delete/:id", async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { notify: { _id: req.body.id } },
      },
      { new: true }
    );
    res.status(200).json("Thông báo đã được xoá!");
  } catch (error) {
    res.status(500).json(error);
  }
});

//DELETE ALL
router.put(
  "/deleteAll/:id",
  verifyTokenAnhAuthorizationStaff,
  async (req, res) => {
    try {
      await Notification.findByIdAndUpdate(
        req.params.id,
        {
          notify: [],
        },
        { new: true }
      );
      res.status(200).json("Đã xoá toàn bộ thông báo!");
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

//DELETE USER
router.delete("/:id", verifyTokenAnhAuthorizationStaff, async (req, res) => {
  try {
    await Notification.delete(req.params.id);
    res.status(200).json("Đã xoá toàn bộ thông báo");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
