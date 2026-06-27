import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" })); // Increased limit for base64 profile photos

const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || "alarsh_freight_secret_jwt_key_2024";

// In-Memory Database Fallback for offline mode
let isDbConnected = false;
const mockUsers = [
  {
    id: 1,
    name: "Al Arsh Admin",
    email: "admin@alarsh.com",
    password: bcrypt.hashSync("alarsh2024", 10),
    role: "Admin"
  },
  {
    id: 2,
    name: "Al Arsh Client",
    email: "user@alarsh.com",
    password: bcrypt.hashSync("freight123", 10),
    role: "User"
  }
];

// In-memory fallback arrays for reviews and freight requests
let mockReviews = [];
let mockReviewIdCounter = 1;
let mockFreightRequests = [];
let mockFreightRequestIdCounter = 1;

// Database Configuration
const pool = new pg.Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "alarsh_logistics",
  password: process.env.PGPASSWORD || "your_password",
  port: parseInt(process.env.PGPORT || "5432", 10),
});

// ============================================================
// JWT Auth Middleware
// ============================================================
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ success: false, error: "Access denied. No token provided." });
  }

  try {
    // Try verifying as a real JWT first
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Fallback: try decoding as a simulated base64 token (mock mode)
    try {
      const decoded = JSON.parse(Buffer.from(token, "base64").toString());
      if (decoded && decoded.email && decoded.role && decoded.exp > Date.now()) {
        req.user = decoded;
        next();
      } else {
        return res.status(403).json({ success: false, error: "Invalid or expired token." });
      }
    } catch (e) {
      return res.status(403).json({ success: false, error: "Invalid token." });
    }
  }
}

function requireAdmin(req, res, next) {
  if (req.user && req.user.role === "Admin") {
    next();
  } else {
    return res.status(403).json({ success: false, error: "Admin access required." });
  }
}

// ============================================================
// Initialize DB and detect state
// ============================================================
async function initDb() {
  try {
    const client = await pool.connect();
    isDbConnected = true;
    console.log("PostgreSQL Connected: Server running in database mode.");
    
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'User'
      )
    `);

    // Reviews / Feedback table
    await client.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER,
        customer_name VARCHAR(100) NOT NULL,
        company_name VARCHAR(100),
        rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
        review_title VARCHAR(200),
        review_message TEXT NOT NULL,
        profile_photo TEXT,
        status VARCHAR(20) DEFAULT 'Pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Freight Requests table
    await client.query(`
      CREATE TABLE IF NOT EXISTS freight_requests (
        id SERIAL PRIMARY KEY,
        company_name VARCHAR(100) NOT NULL,
        contact_person VARCHAR(100) NOT NULL,
        phone VARCHAR(30) NOT NULL,
        email VARCHAR(100),
        pickup_location VARCHAR(200) NOT NULL,
        delivery_location VARCHAR(200) NOT NULL,
        monthly_load VARCHAR(50),
        product_type VARCHAR(200) NOT NULL,
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Seed default admin
    const adminCheck = await client.query("SELECT * FROM users WHERE email = $1", ["admin@alarsh.com"]);
    if (adminCheck.rows.length === 0) {
      const hashedAdminPassword = bcrypt.hashSync("alarsh2024", 10);
      await client.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
        ["Al Arsh Admin", "admin@alarsh.com", hashedAdminPassword, "Admin"]
      );
      console.log("Database seeded: Default admin user created.");
    }

    // Seed default user
    const userCheck = await client.query("SELECT * FROM users WHERE email = $1", ["user@alarsh.com"]);
    if (userCheck.rows.length === 0) {
      const hashedUserPassword = bcrypt.hashSync("freight123", 10);
      await client.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)",
        ["Al Arsh Client", "user@alarsh.com", hashedUserPassword, "User"]
      );
      console.log("Database seeded: Default user created.");
    }

    client.release();
  } catch (err) {
    isDbConnected = false;
    console.warn("==========================================================================");
    console.warn("Warning: PostgreSQL connection failed. Server running in MEMORY FALLBACK mode.");
    console.warn("Reason:", err.message);
    console.warn("==========================================================================");
  }
}

// ============================================================
// AUTH ENDPOINTS
// ============================================================
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, error: "Please enter all fields." });
  }

  const sanitizedEmail = email.toLowerCase().trim();

  try {
    let user = null;

    if (isDbConnected) {
      // PostgreSQL mode
      const userQuery = await pool.query("SELECT * FROM users WHERE email = $1", [sanitizedEmail]);
      if (userQuery.rows.length > 0) {
        user = userQuery.rows[0];
      }
    } else {
      // In-Memory Fallback mode
      user = mockUsers.find(u => u.email === sanitizedEmail);
    }

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials." });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login Server Error:", err);
    res.status(500).json({ success: false, error: "Internal server error. Please try again." });
  }
});

app.post("/api/auth/signup", async (req, res) => {
  const { name, email, password, companyName } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, error: "Please fill in all fields." });
  }

  const sanitizedEmail = email.toLowerCase().trim();

  try {
    let userExists = false;

    if (isDbConnected) {
      // PostgreSQL mode
      const checkQuery = await pool.query("SELECT id FROM users WHERE email = $1", [sanitizedEmail]);
      userExists = checkQuery.rows.length > 0;
    } else {
      // In-Memory Fallback mode
      userExists = mockUsers.some(u => u.email === sanitizedEmail);
    }

    if (userExists) {
      return res.status(400).json({ success: false, error: "User already exists with this email." });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    let user = null;

    if (isDbConnected) {
      // PostgreSQL mode
      const newUser = await pool.query(
        "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *",
        [name, sanitizedEmail, hashedPassword, "User"]
      );
      user = newUser.rows[0];
    } else {
      // In-Memory Fallback mode
      user = {
        id: mockUsers.length + 1,
        name,
        email: sanitizedEmail,
        password: hashedPassword,
        role: "User"
      };
      mockUsers.push(user);
      console.log(`Memory DB: Registered new user - ${sanitizedEmail}`);
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      success: true,
      token,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Signup Server Error:", err);
    res.status(500).json({ success: false, error: "Internal server error. Please try again." });
  }
});

// ============================================================
// FREIGHT REQUEST ENDPOINTS
// ============================================================
app.post("/api/freight-request", async (req, res) => {
  const { companyName, contactPerson, phone, email, pickupLocation, deliveryLocation, monthlyLoad, productType, message } = req.body;

  if (!companyName || !contactPerson || !phone || !pickupLocation || !deliveryLocation || !productType) {
    return res.status(400).json({ success: false, error: "Please fill in all required fields." });
  }

  try {
    if (isDbConnected) {
      await pool.query(
        `INSERT INTO freight_requests (company_name, contact_person, phone, email, pickup_location, delivery_location, monthly_load, product_type, message)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [companyName, contactPerson, phone, email || null, pickupLocation, deliveryLocation, monthlyLoad || null, productType, message || null]
      );
    } else {
      mockFreightRequests.push({
        id: mockFreightRequestIdCounter++,
        company_name: companyName,
        contact_person: contactPerson,
        phone,
        email: email || null,
        pickup_location: pickupLocation,
        delivery_location: deliveryLocation,
        monthly_load: monthlyLoad || null,
        product_type: productType,
        message: message || null,
        created_at: new Date().toISOString()
      });
      console.log(`Memory DB: New freight request from ${companyName}`);
    }

    res.json({ success: true, message: "Freight quote request submitted successfully!" });
  } catch (err) {
    console.error("Freight Request Error:", err);
    res.status(500).json({ success: false, error: "Failed to submit freight request." });
  }
});

// ============================================================
// FEEDBACK / REVIEW ENDPOINTS
// ============================================================

// POST /api/feedback — Authenticated users submit feedback
app.post("/api/feedback", authenticateToken, async (req, res) => {
  const { customerName, companyName, rating, reviewTitle, reviewMessage, profilePhoto } = req.body;

  if (!customerName || !rating || !reviewMessage) {
    return res.status(400).json({ success: false, error: "Name, rating, and review message are required." });
  }

  if (rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, error: "Rating must be between 1 and 5." });
  }

  try {
    if (isDbConnected) {
      await pool.query(
        `INSERT INTO reviews (user_id, customer_name, company_name, rating, review_title, review_message, profile_photo, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, 'Pending')`,
        [req.user.id || null, customerName, companyName || null, rating, reviewTitle || null, reviewMessage, profilePhoto || null]
      );
    } else {
      mockReviews.push({
        id: mockReviewIdCounter++,
        user_id: req.user.id || null,
        customer_name: customerName,
        company_name: companyName || null,
        rating,
        review_title: reviewTitle || null,
        review_message: reviewMessage,
        profile_photo: profilePhoto || null,
        status: "Pending",
        created_at: new Date().toISOString()
      });
      console.log(`Memory DB: New feedback from ${customerName}`);
    }

    res.json({ success: true, message: "Thank you for your feedback! It will be reviewed by our team." });
  } catch (err) {
    console.error("Feedback Error:", err);
    res.status(500).json({ success: false, error: "Failed to submit feedback." });
  }
});

// GET /api/reviews/public — Latest 3 approved reviews (public)
app.get("/api/reviews/public", async (req, res) => {
  try {
    let reviews = [];

    if (isDbConnected) {
      const result = await pool.query(
        "SELECT id, customer_name, company_name, rating, review_title, review_message, profile_photo, created_at FROM reviews WHERE status = 'Approved' ORDER BY created_at DESC LIMIT 3"
      );
      reviews = result.rows;
    } else {
      reviews = mockReviews
        .filter(r => r.status === "Approved")
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(0, 3);
    }

    res.json({ success: true, reviews });
  } catch (err) {
    console.error("Public Reviews Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch reviews." });
  }
});

// GET /api/admin/reviews — All reviews (admin only)
app.get("/api/admin/reviews", authenticateToken, requireAdmin, async (req, res) => {
  try {
    let reviews = [];

    if (isDbConnected) {
      const result = await pool.query(
        "SELECT * FROM reviews ORDER BY created_at DESC"
      );
      reviews = result.rows;
    } else {
      reviews = [...mockReviews].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }

    res.json({ success: true, reviews });
  } catch (err) {
    console.error("Admin Reviews Error:", err);
    res.status(500).json({ success: false, error: "Failed to fetch reviews." });
  }
});

// PUT /api/admin/reviews/:id/approve — Approve a review
app.put("/api/admin/reviews/:id/approve", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected) {
      const result = await pool.query(
        "UPDATE reviews SET status = 'Approved' WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
    } else {
      const review = mockReviews.find(r => r.id === parseInt(id));
      if (!review) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
      review.status = "Approved";
    }

    res.json({ success: true, message: "Review approved successfully." });
  } catch (err) {
    console.error("Approve Review Error:", err);
    res.status(500).json({ success: false, error: "Failed to approve review." });
  }
});

// PUT /api/admin/reviews/:id/reject — Reject a review
app.put("/api/admin/reviews/:id/reject", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected) {
      const result = await pool.query(
        "UPDATE reviews SET status = 'Rejected' WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
    } else {
      const review = mockReviews.find(r => r.id === parseInt(id));
      if (!review) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
      review.status = "Rejected";
    }

    res.json({ success: true, message: "Review rejected." });
  } catch (err) {
    console.error("Reject Review Error:", err);
    res.status(500).json({ success: false, error: "Failed to reject review." });
  }
});

// DELETE /api/admin/reviews/:id — Delete a review
app.delete("/api/admin/reviews/:id", authenticateToken, requireAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    if (isDbConnected) {
      const result = await pool.query(
        "DELETE FROM reviews WHERE id = $1 RETURNING *",
        [id]
      );
      if (result.rows.length === 0) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
    } else {
      const index = mockReviews.findIndex(r => r.id === parseInt(id));
      if (index === -1) {
        return res.status(404).json({ success: false, error: "Review not found." });
      }
      mockReviews.splice(index, 1);
    }

    res.json({ success: true, message: "Review deleted successfully." });
  } catch (err) {
    console.error("Delete Review Error:", err);
    res.status(500).json({ success: false, error: "Failed to delete review." });
  }
});

// Run Init and Start Server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Al Arsh Auth API Server is running on port ${PORT}`);
  });
});
