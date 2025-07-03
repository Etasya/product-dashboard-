import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import { useState } from 'react';
import { TextField, Grid } from '@mui/material';

export default function Home() {
  const { products } = useProducts();
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => p.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <TextField
        label="Search products..."
        fullWidth
        variant="outlined"
        margin="normal"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <Grid container spacing={2}>
        {filtered.map(product => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}