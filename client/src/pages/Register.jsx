import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      setError("");

      await API.post("/auth/register", form);
      navigate("/");
    } catch {
      setError("Registration failed");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">

        <h2>Create Account</h2>

        {error && <div className="auth-error">{error}</div>}

        <input
          className="auth-input"
          placeholder="Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          className="auth-input"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="auth-btn" onClick={handleSubmit}>
          Register
        </button>

        <div className="auth-link">
          Already have an account?{" "}
          <span onClick={() => navigate("/")}>
            Login
          </span>
        </div>

      </div>
    </div>
  );
}