import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';

function PokedexTable({ pokemons }) {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
      {pokemons.map((pokemon) => (
        <Grid item key={pokemon.id} xs={12} sm={6} md={4}>
          <Card sx={{ height: '100%', boxShadow: 3 }}>
            <CardContent sx={{ textAlign: 'center' }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {pokemon.name.toUpperCase()}
              </Typography>
              <Typography variant="body2">ID: {pokemon.id}</Typography>
              <Typography variant="body2" sx={{ my: 1 }}>
                Types: {pokemon.types.join(', ')}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img 
                  src={pokemon.sprite} 
                  alt={pokemon.name} 
                  style={{ width: 100, height: 100 }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PokedexTable;