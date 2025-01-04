import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // Import jwt-decode

const PrivateRouter = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); // `null` to handle loading state

  useEffect(() => {
    const authToken = localStorage.getItem('auth-token'); // Or get it from cookies
    
    if (authToken) {
      try {
        // Decode the token to get the payload
        const decodedToken = jwtDecode(authToken);
        
        // Get the expiration time from the token (it's usually in seconds)
        const currentTime = Date.now() / 1000; // Convert current time to seconds
        
        if (decodedToken.exp < currentTime) {
          // Token has expired
          setIsAuthenticated(false);
        } else {
          // Token is valid
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If the token is invalid or can't be decoded
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  // Handle loading state while checking authentication
  if (isAuthenticated === null) {
    return <div>Loading...</div>; // You can show a loading spinner or similar
  }

  return isAuthenticated ? Component : <Navigate to="/login" />;
};

export default PrivateRouter;
