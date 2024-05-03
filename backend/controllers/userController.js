const mysql = require("mysql");
const bcrypt = require("bcrypt");
const dbContext = require("./../data/dbContext");

const sqlcon = dbContext.sqlcon;

const registerDonor = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      donorAddress,
      nationalIdentityNumber,
      phoneNumber,
      password,
      TempleID,
    } = req.body;

    const hashedPassword = await bcrypt.hash(password, 8);

    const query = `INSERT INTO donors (FirstName, LastName, Email, DonorAddress, NationalIdentityNumber, PhoneNumber, Password, TempleID) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    sqlcon.query(
      query,
      [
        firstName,
        lastName,
        email,
        donorAddress,
        nationalIdentityNumber,
        phoneNumber,
        hashedPassword,
        TempleID,
      ],
      (error, results) => {
        if (error) {
          console.error("Error during registration:", error);
          res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Donor registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const registerMonk = async (req, res) => {
  try {
    const {
      monkName,
      email,
      password,
      phoneNumber,
    } = req.body.values;

    const hashedPassword = await bcrypt.hash(password, 8);

    const query = `INSERT INTO monk (MonkName, Email, PhoneNumber, PasswordHash) VALUES (?, ?, ?, ?)`;
    sqlcon.query(
      query,
      [monkName, email, phoneNumber, hashedPassword],
      (error, results) => {
        if (error) {
          console.error("Error during registration 1:", error);
          res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Monk registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginMonk = async (req, res) => {
  try {
    const { email, password } = req.body;

    const query = 'SELECT * FROM monk WHERE Email = ?';
    sqlcon.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordMatch = await bcrypt.compare(password, results[0].PasswordHash);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const { MonkID, MonkName, Email, PhoneNumber } = results[0];
      res.json(results[0]);

    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const loginDonor = async (req, res) => {
  try {
    const { email, password } = req.body;
    const query = 'SELECT * FROM donors WHERE Email = ?';
    sqlcon.query(query, [email], async (error, results) => {
      if (error) {
        console.error("Database error:", error);
        return res.status(500).json({ message: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isPasswordMatch = await bcrypt.compare(password, results[0].Password);

      if (!isPasswordMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }

      const { MonkID, MonkName, Email, PhoneNumber } = results[0];
      res.json({ MonkID, MonkName, Email, PhoneNumber });

    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkDonorApproval = async (req, res) => {
  const { email } = req.query; 

  if (!email) {
      return res.status(400).json({ message: "Email is required" });
  }

  const query = `SELECT isApproved FROM donors WHERE Email = ? LIMIT 1`;

  sqlcon.query(query, [email], (error, results) => {
      if (error) {
          console.error("Error during checking donor approval:", error);
          return res.status(500).json({ message: "Internal server error" });
      }
      if (results.length > 0) {
          const { isApproved } = results[0];
          res.status(200).json({ isApproved: isApproved === 1 });
      } else {
          res.status(404).json({ message: "Donor not found" });
      }
  });
};

const getUser = async (req, res) => {
  const userkid = req.params.userkid;

  try {
    sqlcon.query(`SELECT * FROM donors WHERE Email = '${userkid}' LIMIT 1`, async (error, results) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(200).json({ error: "notfound", message: "No user found for the given user id" });
        return;
      }
      // console.log(results)
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


module.exports = { registerDonor, registerMonk, loginMonk, loginDonor, checkDonorApproval, getUser };
