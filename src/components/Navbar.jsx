import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Badge } from '@mui/material';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext'; // ✅ Optional: for cart count

function Navbar() {
  const { cart } = useContext(CartContext);

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
          Product Dashboard
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/add">
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/cart">
            <Badge badgeContent={cart?.length || 0} color="error">
              Cart
            </Badge>
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
