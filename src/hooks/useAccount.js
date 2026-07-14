import { useState, useEffect, useCallback } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/accountApi";

// Hook custom untuk menangani CRUD produk: fetch, create, update, delete
export function useAccount() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [error, setError] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getProducts();
      setItems(res.data.payload);
      setTotalPages(res.data.totalPages);
      setTotalItems(res.data.total);
    } catch (err) {
      setError(err.response?.data?.message || "Gagal mengambil data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const addItem = async (data) => {
    await createProduct(data);
    await fetchItems();
  };

  const editItem = async (id, data) => {
    await updateProduct(id, data);
    await fetchItems();
  };

  const removeItem = async (id) => {
    await deleteProduct(id);
    await fetchItems();
  };

  const goToPage = (nextPage) => {
  if (nextPage < 1 || nextPage > totalPages) return;
  setPage(nextPage);
};

  return { items, loading, error, page,limit, search, totalPages, totalItems,setLimit,setSearch,goToPage, fetchItems, addItem, editItem, removeItem };
}
