import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

function PokemonRow({ pokemon }) {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3 }}>
        <CardContent sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
            {pokemon.name.toUpperCase()}
          </Typography>
          <Typography variant="body1">ID: {pokemon.id}</Typography>
          <Typography variant="body1" sx={{ my: 1 }}>
            Types: {pokemon.types.join(', ')}
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <img 
              src={pokemon.sprite} 
              alt={pokemon.name} 
              style={{ width: 120, height: 120 }} 
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default PokemonRow;