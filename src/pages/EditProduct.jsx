import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductForm from "../components/ProductForm";
import { Typography, Paper } from "@mui/material";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useProducts();

  const product = products.find((p) => String(p.id) === id);

  if (!product) return <div>Product not found.</div>;

  const handleUpdate = (updatedProduct) => {
    updateProduct(updatedProduct);
    navigate("/");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Add Product
      </Typography>
      <Paper sx={{ p: 3 }}>
        <ProductForm initialData={product} onSubmit={handleUpdate} />
      </Paper>
    </>
  );
}