import express from "express";
import cors from "cors";
import pg from "pg";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

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

// Database Configuration
const pool = new pg.Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "alarsh_logistics",
  password: process.env.PGPASSWORD || "your_password",
  port: parseInt(process.env.PGPORT || "5432", 10),
});

// Initialize DB and detect state
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

// REST Endpoints
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

// Run Init and Start Server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Al Arsh Auth API Server is running on port ${PORT}`);
  });
});
