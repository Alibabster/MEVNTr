import { Router } from "express";
import Empl from "../../models/Empl.js";

const router = Router();

router
  .route("/")

// Get all empls in the database
  .get(async (_req, res) => {
    try {
      const emplList = await Empl.find();
      if (!emplList) throw new Error("No Empl List found");
      res.status(200).json(emplList);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  //Post request creates a new empl in the database
  .post(async (req, res) => {
    const emplList = new Empl(req.body); // create a new instance of the Empl model
    try {
      const empl = await emplList.save(); // Save created empl
      if (!empl) throw new Error("Something went wrong saving the Empl");
      res.status(200).json(empl);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

router
  .route("/:id")

  // Update the empl with the given id
  .put(async (req, res) => {
    const { id } = req.params;
    try {
      const updated = await Empl.findByIdAndUpdate(id, { ...req.body });
      if (!updated) throw Error("Something went wrong ");
      res.status(200).json(updated);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  // Delete the empl with the given id
  .delete(async (req, res) => {
    const { id } = req.params;
    try {
      const removed = await Empl.findByIdAndDelete(id);
      if (!removed) throw Error("Something went wrong ");
      res.status(200).json(removed);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  // Get the empl with the given id
  .get(async (req, res) => {
    const { id } = req.params;
    try {
      const empl = await Empl.findById(id);
      if (!empl) throw new Error("No Empl found");
      res.status(200).json(empl);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

export default router;