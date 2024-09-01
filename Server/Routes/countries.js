import express from "express";
import db from "../db.js";

const countries = express.Router();

countries.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM countries");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching countries:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

countries.get("/:id", async (req, res) => {
  const countryId = req.params.id;

  try {
    const result = await db.query("SELECT * FROM countries WHERE id = $1", [
      countryId,
    ]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Country not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching country:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default countries;
