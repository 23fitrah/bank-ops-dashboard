import { useState, useEffect } from "react";
import { X } from "lucide-react";

const emptyForm = { full_name: "", account_no: "", address: "", email:"", country:"", currency: "", balance:0, status:"" };

export default function AccountForm({ initialData, onSubmit, onClose }) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (initialData) {
      setForm({
        full_name: initialData.Full_name || "",
        account_no: initialData.Account_no || "",
        email: initialData.Email ?? "",
        country: initialData.Country ?? "",
        currency: initialData.Currency ?? "",
        address: initialData.Address ?? "",
        status: initialData.Status ?? "",
        balance: initialData.Balance ?? 0,
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const emptyFields = requiredFields.filter(
      (field) => !form[field.key] || form[field.key].trim() === ""
    );

    if (emptyFields.length > 0) {
      const fieldNames = emptyFields.map((f) => f.label).join(", ");
      setError(`${fieldNames} wajib diisi.`);
      return;
    }

    setSaving(true);
    try {
      await onSubmit({
        account_name: form.full_name,
        account_no: form.account_no,
        adreess:form.address,
        country:form.country,
        email:form.email,
        status:form.status,
        currency:form.currency,
        balance: Number(form.balance) || 0,
      });
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || "Gagal menyimpan data.");
    } finally {
      setSaving(false);
    }
  };

  const requiredFields = [
    { key: "full_name", label: "Nama Lengkap" },
    { key: "account_no", label: "Nomor Rekening" },
    { key: "address", label: "Alamat" },
    { key: "email", label: "Email" },
    { key: "country", label: "Asal Negara" },
    { key: "status", label: "Status" },
    { key: "currency", label: "Mata Uang" },
  ];

  const countries = [
    { code: "ID", name: "Indonesia" },
    { code: "MY", name: "Malaysia" },
    { code: "SG", name: "Singapura" },
    { code: "TH", name: "Thailand" },
    { code: "PH", name: "Filipina" },
    { code: "VN", name: "Vietnam" },
    { code: "US", name: "Amerika Serikat" },
    { code: "JP", name: "Jepang" },
  ];

  const currencys = [
    { code: "IDR", name: "Rupiah" },
    { code: "MYR", name: "Ringgit" },
    { code: "SGD", name: "Singapore Dollar" },
    { code: "THB", name: "Bath" },
    { code: "PHP", name: "Peso" },
    { code: "VND", name: "Vietnam" },
    { code: "USD", name: "US Dollar" },
    { code: "JPY", name: "Yen" },
  ];

   const status = [
    { code: "1", name: "Active" },
    { code: "2", name: "Inactive" },
    { code: "3", name: "Dormant" },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{initialData ? "Edit Account" : "Tambah Account"}</h3>
          <button className="modal-close" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nama Lengkap</label>
            <input name="full_name" value={form.full_name} onChange={handleChange} placeholder="Contoh: Henry XXX" />
          </div>

          <div className="form-group">
            <label>Nomor Rekening</label>
            <input name="account_no" type="number" value={form.account_no} onChange={handleChange} placeholder="Contoh: 020319283920392" />
          </div>

          <div className="form-group">
            <label>Alamat</label>
            <input name="address" value={form.address} onChange={handleChange} placeholder="Contoh: Jl. Kapten Tendean, Jakarta Selatan, Indonesia" />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Contoh: example@gmail.com" />
          </div>

          <div className="form-group">
            <label>Asal Negara</label>
            <select name="country" value={form.country} onChange={handleChange}>
              <option value="">Pilih negara</option>
              {countries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} : {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Mata uang</label>
              <select name="currency" value={form.currency} onChange={handleChange}>
              <option value="">Pilih mata uang</option>
              {currencys.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} : {c.name}
                </option>
              ))}
            </select>
            </div>
            <div className="form-group">
              <label>Saldo</label>
              <input name="balance" type="number" min="0" value={form.balance} onChange={handleChange} placeholder="0" />
            </div>
          </div>

          <div className="form-group">
            <label>Status</label>
            <select name="status" value={form.status} onChange={handleChange}>
              <option value="">Pilih status</option>
              {status.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} : {c.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="form-error">{error}</p>}

          <div className="modal-actions">
            <button type="button" className="btn btn-outline" onClick={onClose}>
              Batal
            </button>
            <button type="submit" className="btn btn-primary" disabled={saving}>
              {saving ? "Menyimpan..." : "Simpan"}
            </button>
          </div>
        </form>
      </div>

      <style>{`
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 20, 30, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          padding: 16px;
        }
        .modal-panel {
          background: #fff;
          border-radius: var(--radius-lg);
          width: 100%;
          max-width: 440px;
          padding: 24px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .modal-close {
          background: transparent;
          border: none;
          color: var(--color-text-muted);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        .form-error {
          color: var(--color-danger);
          font-size: 13px;
          margin: -8px 0 12px;
        }
        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
          margin-top: 8px;
        }
      `}</style>
    </div>
  );
}
