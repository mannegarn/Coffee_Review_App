import express from "express";
const reviews = express.Router();
import db from "../db.js";

reviews.post("/", async (req, res) => {
  try {
    const {
      roaster = "",
      country_id,
      process = "",
      score = 1,
      comments = "",
    } = req.body;
    const result = await db.query(
      "INSERT INTO coffee_bean_reviews (roaster, country_id, process, score, comments) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [roaster, country_id, process, score, comments]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

reviews.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM coffee_bean_reviews");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

reviews.get("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "SELECT * FROM coffee_bean_reviews WHERE id = $1",
      [req.params.id]
    );
    if (result.rows.length === 0) {
      res
        .status(404)
        .json({ error: "Review with ID ${req.params.id} not found" });
    } else {
      res.json(result.rows[0]);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

reviews.delete("/:id", async (req, res) => {
  try {
    const result = await db.query(
      "DELETE FROM coffee_bean_reviews WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (result.rowCount === 0) {
      res
        .status(404)
        .json({ error: "Review with ID ${req.params.id} not found" });
    } else {
      res.json({
        message: `Review with ID ${req.params.id} deleted successfully`,
      });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default reviews;
