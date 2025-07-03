import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  CardActions,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";

export default function ProductCard({ product }) {
  const { deleteProduct } = useProducts();

  return (
    <Card>
      <CardMedia
        component="img"
        height="160"
        image={product.thumbnail || product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h6">{product.title}</Typography>
        <Typography>${product.price}</Typography>
        <Typography variant="body2" color="textSecondary">
          {product.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" component={Link} to={`/product/${product.id}`}>
          View
        </Button>
        <Button
          size="small"
          color="success"
          component={Link}
          to={`/edit/${product.id}`}
        >
          Edit
        </Button>
        {product.local && (
          <Button
            size="small"
            color="error"
            onClick={() => deleteProduct(product.id)}
          >
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
}