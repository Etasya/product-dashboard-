import { useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";
import { useProducts } from "../context/ProductContext";
import { Typography, Paper } from "@mui/material";

export default function AddProduct() {
  const { addProduct } = useProducts();
  const navigate = useNavigate();

  const handleAdd = (product) => {
    addProduct(product);
    navigate("/");
  };

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Add Product
      </Typography>
      <Paper sx={{ p: 3 }}>
        <ProductForm onSubmit={handleAdd} />
      </Paper>
    </>
  );
}