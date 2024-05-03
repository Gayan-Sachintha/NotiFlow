const mysql = require("mysql");
const dbContext = require("./../data/dbContext");

const sqlcon = dbContext.sqlcon;

const getAllTemples = async (req, res) => {
  try {
    sqlcon.query("SELECT * FROM temple", async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTemplesId = async (req, res) => {
  try {
    const templeMonk = req.body.templeMonk; 
    sqlcon.query("SELECT templeId FROM temple WHERE templeMonk = ?", [templeMonk], async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getAllTemplesRequests = async (req, res) => {
  try {
    sqlcon.query("SELECT * FROM temple WHERE isApproved = 0", async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTemplesApproved = async (req, res) => {
  try {
    sqlcon.query("SELECT * FROM temple WHERE isApproved = 1", async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllTemplesBlocked = async (req, res) => {
  try {
    sqlcon.query("SELECT * FROM temple WHERE isApproved = 2", async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const approveTemple = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE temple SET isApproved = 1 WHERE TempleID = ?";
    sqlcon.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error during approving temple:", error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Temple not found" });
      } else {
        res.status(200).json({ message: "Temple approved successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const removeTemple = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE temple SET isApproved = 2 WHERE TempleID = ?";
    sqlcon.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error during removing temple:", error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Temple not found" });
      } else {
        res.status(200).json({ message: "Temple removed successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const unblockTemple = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "UPDATE temple SET isApproved = 1 WHERE TempleID = ?";
    sqlcon.query(query, [id], (error, results) => {
      if (error) {
        console.error("Error during removing temple:", error);
        res.status(500).json({ message: "Internal server error" });
      } else if (results.affectedRows === 0) {
        res.status(404).json({ message: "Temple not found" });
      } else {
        res.status(200).json({ message: "Temple removed successfully" });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getApprovedTemples = async (req, res) => {
  try {
    sqlcon.query("SELECT * FROM temple WHERE isApproved = 1", async (error, results) => {
      if (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res
        .status(201)
        .json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const createTemple = async (req, res) => {
  try {
    const {
      templeName,
      templeAddress,
      postalCode,
      registrationNo,
      coordinates,
      images,
      monkEmail
    } = req.body.formData;

    const query = `INSERT INTO temple (templeMonk, TempleName, TempleAddress, PostalCode, RegistrationNo, coordinates, images, isApproved) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    sqlcon.query(
      query,
      [monkEmail, templeName, templeAddress, postalCode, registrationNo, coordinates, images, 0],
      (error, results) => {
        if (error) {
          console.error("Error during registration :", error);
          res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Temple registered successfully" });
      }
    );
  } catch (error) {

    
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
const updateTemple = async (req, res) => {
  try {
    const {
      id,
      templeName,
      templeAddress,
      postalCode,
      registrationNo,
      coordinates,
      images,
      monkEmail
    } = req.body.formData;

    const query = `UPDATE temple SET templeMonk = ?, TempleName = ?, TempleAddress = ?, PostalCode = ?, RegistrationNo = ?, coordinates = ?, images = ?, isApproved = ? WHERE TempleID = ?`;

    sqlcon.query(
      query,
      [monkEmail, templeName, templeAddress, postalCode, registrationNo, coordinates, images, 0, id],
      (error, results) => {
        if (error) {
          console.error("Error during registration :", error);
          res.status(500).json({ message: "Internal server error" });
        }
        res.status(201).json({ message: "Temple registered successfully" });
      }
    );
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


const getMonkTemple = async (req, res) => {
  const monkID = req.params.monkid;
  const data = req.params.data;
  try {
    sqlcon.query(`SELECT * FROM temple WHERE templeMonk = '${monkID}' LIMIT 1`, async (error, results) => {
      if (error) {
        res.status(500).json({ message: "Internal server error" });
        return;
      }
      if (results.length === 0) {
        res.status(200).json({ error: "notfound", message: "No temple found for the given monkID" });
        return;
      }
      if (data == 1) {
        res.status(200).json(results);
      } else {
        if (results[0].isApproved !== 1) {
          res.status(200).json({ error: "notapproved", message: "The temple is still on pending status" });
          return;
        }
        res.status(200).json(results);
      }

    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const monkReserveCalendar = async (req, res) => {
  try {
    const templeID = req.params.templeID; 
    sqlcon.query(`
      SELECT donor_meals.mealType, donor_meals.mealDate, donors.*
      FROM donors
      JOIN donor_meals ON donors.DonorID = donor_meals.donorId
      WHERE donors.TempleID = ? AND donors.isApproved = 1
    `, [templeID], async (error, results) => {
      if (error) {
        console.error("Error during fetching evening meal donors:", error);
        res.status(500).json({ message: "Internal server error" });
      }
      res.status(200).json(results);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};



//assign donor to assign a donor to a temple

const assignDonor = async (req, res) => {
  try {
    const {
      FirstName,
      LastName,
      Email,
      PhoneNumber,
      DonorAddress,
      NationalIdentityNumber,
      mealDate,
      mealType,
      templeId,
      isApproved = 1,
    } = req.body;

    
    const checkExistingDonor = async (email) => {
      return new Promise((resolve, reject) => {
        let query1 = "SELECT * FROM donors WHERE Email = ?";
        sqlcon.query(query1, [email], (error, results) => {
          if (error) {
            reject(error);
          } else {
            resolve(results);
          }
        });
      });
    };

    const existingDonor = await checkExistingDonor(Email);
    if (existingDonor.length > 0) {
      res.status(200).json({ status: "success", message: "Donor already exists" });
      return;
    }
    let query = `INSERT INTO donors (FirstName, LastName, Email, DonorAddress, NationalIdentityNumber, PhoneNumber, TempleID , isApproved) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`;

    sqlcon.query(
      query,
      [FirstName, LastName, Email, DonorAddress, NationalIdentityNumber, PhoneNumber, templeId, isApproved],
      (error, results) => {
        if (error) {
          console.error("Error during registration:", error);
          res.status(500).json({ message: "Internal server error" });
        } else {
          const insertedDonorId = results.insertId;
          console.log("Inserted donor ID:", insertedDonorId);
          const query = `INSERT INTO donor_meals (donorId, mealType, mealDate) VALUES (?, ?, ?)`;
          sqlcon.query(
            query,
            [insertedDonorId, mealType, mealDate],
            (error, results) => {
              if (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Internal server error" });
              }
            }
          );
        }
      }
    );



    //get the insert donorid 

    res.status(201).json({ status: "success", message: "Donor registered successfully" });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const updateTemple2 = async (req, res) => {
  const { templeId } = req.params;
  const { name, monk, registrationNo, location, geoLocation, postalCode } = req.body;

  if (!name || !monk || !registrationNo || !location || !geoLocation || !postalCode) {
      return res.status(400).json({ message: "All fields must be provided" });
  }

  const query = `
      UPDATE temple
      SET
          TempleName = ?,
          templeMonk = ?,
          RegistrationNo = ?,
          TempleAddress = ?,
          coordinates = ?,
          PostalCode = ?
      WHERE TempleID = ?;
  `;

  const queryParams = [name, monk, registrationNo, location, geoLocation, postalCode, templeId];

  sqlcon.query(query, queryParams, (error, results) => {
      if (error) {
          console.error('Failed to update temple:', error);
          return res.status(500).json({ message: 'Internal server error', error });
      }

      if (results.affectedRows === 0) {
          return res.status(404).json({ message: "No temple found with the provided ID" });
      }

      res.status(200).json({ message: "Temple updated successfully" });
  });
};

module.exports = { getAllTemples, getAllTemplesId, getApprovedTemples, createTemple, getMonkTemple, assignDonor, monkReserveCalendar, getAllTemplesRequests, approveTemple, removeTemple, getAllTemplesApproved, getAllTemplesBlocked, unblockTemple, updateTemple2 };
