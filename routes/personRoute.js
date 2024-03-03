import express from "express";
import { Person } from "../models/personSchema.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();

    console.log("save success", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while saving" });
  }
});
router.get("/", async (req, res) => {
  try {
    const response = await Person.find();
    console.log("fetched successfully", response);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching" });
  }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (
      workType === "chef" ||
      workType === "waiter" ||
      workType === "manager"
    ) {
      const response = await Person.find({ work: workType });
      console.log("fetched successfully", response);
      return res.status(200).json(response);
    } else {
      return res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: "internal server error while fetching workType" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const updatedPerson = await Person.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedPerson) {
      return res.status(404).json({ error: "person not found" });
    }
    console.log("update success", updatedPerson);
    return res.status(200).json(updatedPerson);
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
    const deletedPerson = await Person.findByIdAndDelete(id);
    if(!deletedPerson){
      return res.status(404).json({ error: "person not found" });
    }
    console.log(deletedPerson)
    return res.status(200).json(deletedPerson);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "internal server error while deleting " });
  }
})

export const personRoute = router;
