import { createContext, useState, useEffect } from "react";
import { simulateToken, decodeToken, isTokenExpired } from "../utils/auth";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = () => {
    try {
      const token = localStorage.getItem("alarsh_token");
      if (token) {
        const decoded = decodeToken(token);
        if (decoded && !isTokenExpired(decoded)) {
          const role = decoded.role;
          const email = decoded.email;
          const name = email === "admin@alarsh.com" ? "Administrator" : "Freight Partner";
          setUser({ email, role, name });
          setIsAuthenticated(true);
        } else {
          localStorage.removeItem("alarsh_token");
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      console.error("Auth check failed:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Add a slight artificial delay (1.2 seconds) to display the premium logo preloader
    const timer = setTimeout(() => {
      checkAuth();
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password) => {
    const sanitizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sanitizedEmail, password }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        localStorage.setItem("alarsh_token", data.token);
        const loggedUser = {
          email: data.user.email,
          role: data.user.role,
          name: data.user.name,
        };
        setUser(loggedUser);
        setIsAuthenticated(true);
        return { success: true, user: loggedUser };
      } else {
        return { success: false, error: data.error || "Login failed." };
      }
    } catch (err) {
      console.warn("Backend server not running. Falling back to local mock authentication simulation.");

      // Simulate network latency for a premium loading state
      await new Promise((resolve) => setTimeout(resolve, 1000));

      let role = null;
      let name = "";

      if (sanitizedEmail === "admin@alarsh.com" && password === "alarsh2024") {
        role = "Admin";
        name = "Administrator";
      } else if (sanitizedEmail === "user@alarsh.com" && password === "freight123") {
        role = "User";
        name = "Freight Partner";
      }

      if (role) {
        const token = simulateToken(sanitizedEmail, role);
        localStorage.setItem("alarsh_token", token);
        const loggedUser = { email: sanitizedEmail, role, name };
        setUser(loggedUser);
        setIsAuthenticated(true);
        return { success: true, user: loggedUser, isMock: true };
      } else {
        return { success: false, error: "Invalid credentials. Please try again." };
      }
    }
  };

  const signup = async (name, email, password, companyName) => {
    const sanitizedEmail = email.trim().toLowerCase();

    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email: sanitizedEmail, password, companyName }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        return { success: true, user: data.user };
      } else {
        return { success: false, error: data.error || "Signup failed." };
      }
    } catch (err) {
      console.warn("Backend server not running. Falling back to local mock signup simulation.");
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return { success: true, isMock: true };
    }
  };

  const logout = () => {
    localStorage.removeItem("alarsh_token");
    setUser(null);
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, isLoading, login, signup, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
