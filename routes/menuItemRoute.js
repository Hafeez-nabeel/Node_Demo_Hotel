import express from "express";
import { MenuItem } from "../models/menuItem.Schema.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const response = await MenuItem.find();
    console.log("fetched successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching" });
  }
});
router.post("/", async (req, res) => {
  try {
    const data = req.body;

    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("fetched successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching" });
  }
});
router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;

    if (taste === "spicy" || taste === "sour" || taste === "sweet") {
      const response = await MenuItem.find({ taste: taste });
      if(response.length> 0){
        console.log("fetched successfully", response);
        return res.status(200).json(response);
      }else{
        return res.status(404).json({ error: "its getting ready please wait" });
      }
    } else {
      return res.status(404).json({ error: "invalid taste" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedMenuItem) {
      return res.status(404).json({ error: "menuItem not found" });
    }
    console.log("update success", updatedMenuItem);
    return res.status(200).json(updatedMenuItem);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching by id" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedMenuItem = await MenuItem.findByIdAndDelete(id);
    if(!deletedMenuItem){
      return res.status(404).json({ error: "menuItem not found" });
    }
    console.log(deletedMenuItem)
    return res.status(200).json(deletedMenuItem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error while deleting " });
  }
})
export const menuItemRout = router;
