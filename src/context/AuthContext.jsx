import { createContext, useState, useEffect } from "react";
import { loginUser, logoutUser, getProfile } from "../api/authApi";
import { getToken, setToken, getUser, setUser as saveUser, clearSession } from "../utils/storage";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());
  const [loading, setLoading] = useState(true);

  // Saat app pertama kali dibuka, validasi ulang token yang tersimpan
  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getProfile()
      .then((res) => {
        setUser(res.data);
        saveUser(res.data);
      })
      .catch(() => {
        clearSession();
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (credentials) => {
    const res = await loginUser(credentials);
    setToken(res.data.token);
    saveUser(res.data.user);
    setUser(res.data.user);
    return res.data.user;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch {
      // Abaikan error network saat logout, tetap bersihkan session lokal
    }
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
