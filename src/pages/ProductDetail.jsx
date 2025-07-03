import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const { addToCart } = useCart();

  const product = products.find(p => String(p.id) === String(id));
  if (!product) return <Typography>Product not found.</Typography>;

  return (
    <Card sx={{ maxWidth: 600, mx: 'auto', p: 2 }}>
      <CardMedia
        component="img"
        height="300"
        image={product.thumbnail || product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5">{product.title}</Typography>
        <Typography>{product.description}</Typography>
        <Typography variant="h6" sx={{ mt: 1 }}>${product.price}</Typography>
        <Button variant="contained" sx={{ mt: 2 }} onClick={() => addToCart(product)}>Add to Cart</Button>
      </CardContent>
    </Card>
  );
}