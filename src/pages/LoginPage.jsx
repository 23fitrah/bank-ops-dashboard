import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import logo from "../assets/img/logo.png";

export default function LoginPage() {
  const { login, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (!loading && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await login(form);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Email atau password salah.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card card">
        <div className="login-logo">
         <span>
          <img src={logo} alt="Logo" width={200} height={40}/>
        </span>
        </div>
        <br/>
        <h1>Banten Ops Dashboard</h1>
        <p className="login-sub">Gunakan akun yang terdaftar untuk melanjutkan.</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="nama@perusahaan.com"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <p className="login-error">{error}</p>}

          <button type="submit" className="btn btn-primary login-submit" disabled={submitting}>
            <LogIn size={16} />
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>

      <style>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, #0b1220 0%, #16233b 100%);
          padding: 20px;
        }
        .login-card {
          width: 100%;
          max-width: 380px;
          padding: 32px;
          background: #fff;
          text-align: center;
        }
        .login-logo-mark {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--color-accent);
          color: #fff;
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 18px;
          margin-bottom: 16px;
        }
        .login-card h1 {
          font-size: 20px;
          margin-bottom: 6px;
        }
        .login-sub {
          font-size: 13px;
          color: var(--color-text-muted);
          margin-bottom: 24px;
        }
        .login-card form {
          text-align: left;
        }
        .login-submit {
          width: 100%;
          justify-content: center;
          margin-top: 4px;
          padding: 11px;
        }
        .login-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 14px;
        }
      `}</style>
    </div>
  );
}
