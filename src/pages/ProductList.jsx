import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  TextField,
  Pagination,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

function ProductList({ customProducts = [], onDelete }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts([...customProducts, ...data.products]);
        setLoading(false);
      });
  }, [customProducts]);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Product List
      </Typography>

      <TextField
        label="Search by name"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
      />

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={3}>
          {currentItems.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={product.thumbnail}
                    alt={product.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{product.title}</Typography>
                    <Typography>Price: ${product.price}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      Category: {product.category}
                    </Typography>

                    {/* Show Edit & Delete only for custom products */}
                    {customProducts.some((p) => p.id === product.id) && (
                      <>
                        <Link to={`/edit/${product.id}`}>
                          <Button
                            variant="outlined"
                            color="secondary"
                            sx={{ mt: 1, mr: 1 }}
                            onClick={(e) => e.stopPropagation()}
                          >
                            Edit
                          </Button>
                        </Link>

                        <Button
                          variant="outlined"
                          color="error"
                          sx={{ mt: 1 }}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onDelete(product.id);
                          }}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(e, page) => setCurrentPage(page)}
          color="primary"
          sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}
        />
      )}
    </Container>
  );
}

export default ProductList;
