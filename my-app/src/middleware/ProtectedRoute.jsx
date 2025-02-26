import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAdminAuth = async () => {
      const adminToken = localStorage.getItem("adminToken");

      if (!adminToken) {
        setIsLoading(false);
        navigate("/login-as-admin");
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/check-auth",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        const data = await response.json();

        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
          localStorage.removeItem("adminToken");
          navigate("/login-as-admin"); // Remove invalid token
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAdmin(false);
        localStorage.removeItem("adminToken");
        navigate("/login-as-admin");
      } finally {
        setIsLoading(false);
      }
    };

    checkAdminAuth();
  }, [navigate]);

  if (isLoading) {
    return <div className="text-center text-xl">Loading...</div>;
  }

  return isAdmin ? <>{children}</> : null;
}
