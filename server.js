const express = require("express");
// const sqlite3 = require("sqlite3").verbose();
const mysql = require("mysql2");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

// const dbFile = "./db.sqlite";
// const dbExists = fs.existsSync(dbFile);

// Create MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "parking"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL");
    }
});
// const db = new sqlite3.Database(dbFile);

// if (!dbExists) {
//     const schema = fs.readFileSync("./schema.sql", "utf8");
//     db.exec(schema);
// }

// // Get all slots
// app.get("/slots", (req, res) => {
//     db.all("SELECT * FROM parking_slots", (err, rows) => {
//         res.send(rows);
//     });
// });
app.get("/slots", (req, res) => {
    db.query("SELECT * FROM parking_slots", (err, rows) => {
        if (err) return res.status(500).send(err);
        res.send(rows);
    });
});

// Set to taken
// app.post("/take", (req, res) => {
//     const { slot, license } = req.body;
//     db.run(
//         "UPDATE parking_slots SET status = ?, license_plate = ? WHERE slot_number = ?",
//         ["Taken", license, slot],
//         () => res.send({ success: true })
//     );
// });
app.post("/take", (req, res) => {
    const { slot, license } = req.body;
    db.query(
        "UPDATE parking_slots SET status = ?, license_plate = ? WHERE slot_number = ?",
        ["Taken", license, slot],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ success: true });
        }
    );
});


// Set to available
// app.post("/delete", (req, res) => {
//     const { slot } = req.body;
//     db.run(
//         "UPDATE parking_slots SET status = 'Available', license_plate = NULL WHERE slot_number = ?",
//         [slot],
//         () => res.send({ success: true })
//     );
// });
app.post("/delete", (req, res) => {
    const { slot } = req.body;
    db.query(
        "UPDATE parking_slots SET status = 'Available', license_plate = NULL WHERE slot_number = ?",
        [slot],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ success: true });
        }
    );
});


// Reserve slot
// app.post("/reserve", (req, res) => {
//     const { slot } = req.body;
//     db.run(
//         "UPDATE parking_slots SET status = 'Reserved', license_plate = NULL WHERE slot_number = ?",
//         [slot],
//         () => res.send({ success: true })
//     );
// });
app.post("/reserve", (req, res) => {
    const { slot } = req.body;
    db.query(
        "UPDATE parking_slots SET status = 'Reserved', license_plate = NULL WHERE slot_number = ?",
        [slot],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ success: true });
        }
    );
});

// Reset to available
// app.post("/unreserve", (req, res) => {
//     const { slot } = req.body;
//     db.run(
//         "UPDATE parking_slots SET status = 'Available' WHERE slot_number = ?",
//         [slot],
//         () => res.send({ success: true })
//     );
// });
app.post("/unreserve", (req, res) => {
    const { slot } = req.body;
    db.query(
        "UPDATE parking_slots SET status = 'Available' WHERE slot_number = ?",
        [slot],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send({ success: true });
        }
    );
});


app.listen(5000, () => console.log("Backend running on port 5000"));
