import { useCart } from '../context/CartContext';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  return (
    <div>
      <Typography variant="h4" gutterBottom>Cart</Typography>
      {cart.length === 0 ? (
        <Typography>Your cart is empty.</Typography>
      ) : (
        <List>
          {cart.map(item => (
            <ListItem key={item.id} secondaryAction={
              <IconButton edge="end" color="error" onClick={() => removeFromCart(item.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <ListItemAvatar>
                <Avatar
                  variant="square"
                  src={item.thumbnail || item.image}
                  alt={item.title}
                  sx={{ width: 56, height: 56 }}
                />
              </ListItemAvatar>
              <ListItemText
                primary={item.title}
                secondary={`$${item.price} x ${item.quantity}`}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
}