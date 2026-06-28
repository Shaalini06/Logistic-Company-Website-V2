/**
 * Helper to generate a simulated JWT token.
 * Base64 encodes a JSON payload containing the user email, role, and expiration.
 */
export const simulateToken = (email, role, name) => {
  const payload = {
    email,
    role,
    name: name || (email === "admin@alarsh.com" ? "Administrator" : "Freight Partner"),
    exp: Date.now() + 86400000 // 24 hours from now
  };
  return btoa(JSON.stringify(payload));
};

/**
 * Helper to decode the simulated JWT.
 * Decodes the base64 string back into a JSON object.
 */
export const decodeToken = (token) => {
  try {
    if (!token) return null;
    return JSON.parse(atob(token));
  } catch (error) {
    console.error("Failed to decode simulated JWT:", error);
    return null;
  }
};

/**
 * Checks if the decoded token has expired.
 */
export const isTokenExpired = (decoded) => {
  if (!decoded || !decoded.exp) return true;
  return decoded.exp < Date.now();
};
