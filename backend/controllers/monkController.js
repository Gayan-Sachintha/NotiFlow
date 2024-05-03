const mysql = require("mysql");
const dbContext = require("./../data/dbContext");

const sqlcon = dbContext.sqlcon;

const getDonor = async (req, res) => {
    try {

        const templeID = req.query.templeID;
        const isApproved = req.query.isApproved;

        const query = `SELECT * FROM donors WHERE templeID = ? AND isApproved = ?`;
        sqlcon.query(query, [templeID, isApproved], async (error, results) => {
            if (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            res.status(201).json(results);
        }); 

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
const calenderdata = async (req, res) => {
    try {

        const templeId = req.query.templeId;
        const date = req.query.date;

        const query = `SELECT * FROM donor_meals INNER JOIN donors ON donor_meals.donorId = donors.DonorID WHERE donors.templeID = ? AND mealDate = ?`;
        sqlcon.query(query, [templeId, date], async (error, results) => {
            if (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            console.log(results)
            // console.log(req.query)
            res.status(201).json(results);
        }); 

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

const getDonorsByTemple = async (req, res) => {
  try {
      const { templeID } = req.params;  

      const query = "SELECT * FROM donors WHERE templeID = ? AND isApproved = 1";
      sqlcon.query(query, [templeID], (error, results) => {
          if (error) {
              console.error("Error fetching donors:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: "No donors found for the specified temple" });
          }
          res.status(200).json(results);
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const getBlockedDonorsByTemple = async (req, res) => {
  try {
      const { templeID } = req.params; 

      const query = "SELECT * FROM donors WHERE templeID = ? AND isApproved = ?";
      sqlcon.query(query, [templeID, 2], (error, results) => {
          if (error) {
              console.error("Error fetching donors:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: "No donors found for the specified temple" });
          }
          res.status(200).json(results);
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};

const getRequestsDonorsByTemple = async (req, res) => {
    try {
      const { templeID } = req.params; 
  
      const query = "SELECT * FROM donors WHERE templeID = ? AND isApproved = 0";
      sqlcon.query(query, [templeID], (error, results) => {
          if (error) {
              console.error("Error fetching donors:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: "No donors found for1 the specified temple" });
          }
          res.status(200).json(results);
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
  };

  
const getSpecialRes = async (req, res) => {
    try {
      const { templeId } = req.params;
    //   console.log(templeId)
    const query = `
            SELECT 
                d.DonorID,
                d.FirstName,
                d.LastName,
                d.PhoneNumber,
                d.DonorAddress,
                d.NationalIdentityNumber,
                sr.mealType,
                sr.date
            FROM donors AS d
            JOIN special_reservations AS sr ON d.DonorID = sr.donorId
            WHERE sr.temple = ?;  
    `;
      sqlcon.query(query, [templeId], (error, results) => {
          if (error) {
              console.error("Error fetching donors:", error);
              return res.status(500).json({ message: "Internal server error" });
          }
          if (results.length === 0) {
              return res.status(404).json({ message: "No donors found for the specified temple" });
          }
          res.status(200).json(results);
      });
  } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
  }
};
  

const changeDonorStatus = async (req, res) => {
    try {

        const donorID = req.body.donorID;
        const isApproved = req.body.isApproved;

        console.log(req)
        const query = `UPDATE donors SET isApproved = ? WHERE DonorID = ?`;
        sqlcon.query(query, [isApproved, donorID], async (error, results) => {
            if (error) {
                console.error("Error during registration:", error);
                res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json({ message: "Donor status updated successfully" });
        }); 

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const approveSpecialRes = (req, res) => {
    const { donorID, mealType, mealDate } = req.body;

    if (!donorID || !mealType || !mealDate) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const insertOrUpdateQuery = `
        INSERT INTO donor_meals (donorId, mealType, mealDate)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        mealType = VALUES(mealType), mealDate = VALUES(mealDate);
    `;

    sqlcon.query(insertOrUpdateQuery, [donorID, mealType, mealDate], (error, results) => {
        if (error) {
            console.error('Failed to insert or update meal:', error);
            return res.status(500).json({ message: 'Failed to insert or update meal', error: error });
        }

        const deleteQuery = `
            DELETE FROM special_reservations WHERE donorId = ?;
        `;
        sqlcon.query(deleteQuery, [donorID], (delError, delResults) => {
            if (delError) {
                console.error('Failed to delete from special_reservations:', delError);
                return res.status(500).json({ message: 'Failed to delete from special_reservations', error: delError });
            }
            res.status(200).json({ message: 'Donor meal updated and special reservation removed successfully' });
        });
    });
};


const getMealsForCalendar = async (req, res) => {
    try {
        const { templeId, month } = req.query;
        console.log(req.query)
        if (!templeId) {
            return res.status(400).json({ message: "TempleID is required" });
        }

        let query = `
            SELECT dm.mealId, dm.mealType, dm.mealDate, d.FirstName, d.LastName
            FROM donor_meals AS dm
            JOIN donors AS d ON dm.donorId = d.DonorID
            WHERE d.TempleID = ?`;

        let queryParams = [templeId];

        if (month) {
            query += " AND YEAR(dm.mealDate) = YEAR(?) AND MONTH(dm.mealDate) = MONTH(?)";
            queryParams.push(month, month); 
        }

        sqlcon.query(query, queryParams, (error, results) => {
            if (error) {
                console.error("Error fetching meals:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
            res.status(200).json(results);
            console.log(results)
    });

    } catch (error) {
        console.error("Error in getMealsForCalendar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


const getDonorsForTemple = (req, res) => {
    const templeId = req.params.templeId;  

    const query = `
        SELECT *
        FROM donors
        WHERE TempleID = ?
    `;
    sqlcon.query(query, [templeId], (error, results) => {
        if (error) {
            console.error('Failed to fetch donors for temple:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        res.json(results);  
    });
};

const updateMealDonor = (req, res) => {
    const { date, mealType, donorId } = req.body;

    if (!date || !mealType || !donorId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        INSERT INTO donor_meals (mealDate, mealType, donorId)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        donorId = VALUES(donorId);`;

    const queryParams = [date, mealType, donorId];

    sqlcon.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Failed to update or add meal donor:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (results.affectedRows > 0) {
            const actionTaken = results.changedRows > 0 ? 'Updated' : 'Added';
            res.status(200).json({ message: `Meal donor ${actionTaken} successfully` });
        } else {
            res.status(404).json({ message: 'No meal found to update and new meal was not added' });
        }
    });
};

const removeMealDonor = (req, res) => {
    const { date, mealType } = req.body;
    console.log(req.body)
    if (!date || !mealType) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        DELETE FROM donor_meals
        WHERE mealDate = ? AND mealType = ?;`;

    const queryParams = [date, mealType];

    sqlcon.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Failed to removed meal donor:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (results.affectedRows > 0) {
            res.status(200).json({ message: `Meal donor removed successfully` });
        } else {
            res.status(404).json({ message: 'No meal found to removed was not added' });
        }
    });
};

const requestSpecialRes = (req, res) => {
    const { date, mealType, donorId, templeId } = req.body;

    if (!date || !mealType || !donorId || !templeId) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
    INSERT INTO special_reservations(date, mealType, donorId, temple)
        VALUES (?, ?, ?, ?);`;

    const queryParams = [date, mealType, donorId, templeId];

    sqlcon.query(query, queryParams, (error, results) => {
        if (error) {
            console.error('Failed to Request:', error);
            return res.status(500).json({ message: 'Internal server error' });
        }
        
        if (results.affectedRows > 0) {
            res.status(200).json({ message: `Requested successfully` });
        } else {
            res.status(404).json({ message: 'Request Failed !' });
        }
    });
};

module.exports = { getDonor, changeDonorStatus, getDonorsByTemple, getBlockedDonorsByTemple, getRequestsDonorsByTemple, getMealsForCalendar, calenderdata, getDonorsForTemple, updateMealDonor, removeMealDonor, requestSpecialRes, getSpecialRes, approveSpecialRes };