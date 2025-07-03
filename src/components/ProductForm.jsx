import { useState, useEffect } from "react";
import { TextField, Button, Stack } from "@mui/material";

export default function ProductForm({ initialData = null, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        title: initialData.title || "",
        price: initialData.price || "",
        category: initialData.category || "",
        description: initialData.description || "",
        image: initialData.image || initialData.thumbnail || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const product = {
      ...initialData,
      ...form,
      id: initialData?.id || Date.now(),
      local: true,
      price: +form.price,
    };
    onSubmit(product);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {["title", "price", "category", "description", "image"].map((field) => (
          <TextField
            key={field}
            name={field}
            label={field.charAt(0).toUpperCase() + field.slice(1)}
            value={form[field]}
            onChange={handleChange}
            required
            fullWidth
          />
        ))}
        <Button variant="contained" type="submit">
          {initialData ? "Update Product" : "Add Product"}
        </Button>
      </Stack>
    </form>
  );
}