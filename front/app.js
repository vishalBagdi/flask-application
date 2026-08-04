const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 9000;
const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
    try {
        // Fetch data from backend API
        const response = await axios.get(`${BACKEND_URL}/api/get`);

        const data = response.data;

        console.log(data, typeof data);

        // Get all environment variables
        const env = process.env;

        res.render("index", {
            env,
            data: data.data
        });

    } catch (error) {
        console.error("Error fetching backend data:", error.message);

        res.status(500).send("Unable to fetch data from backend.");
    }
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});