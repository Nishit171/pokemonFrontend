import { useEffect, useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Button, Typography } from '@mui/material';
import PokedexTable from './PokedexTable';

const ALL_TYPES = ['Grass', 'Fire', 'Water', 'Electric', 'Poison', 'Flying', 'Bug', 'Normal'];

function FilterablePokedexTable() {
  const [allPokemons, setAllPokemons] = useState([]);
  const [selectedType, setSelectedType] = useState('');
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/pokemons')
      .then(res => res.json())
      .then(data => setAllPokemons(data));
  }, []);

  const handleFilter = () => {
    if (!selectedType) return;
    const filtered = allPokemons.filter(p => p.types.includes(selectedType));
    setFilteredPokemons(filtered);
  };

  return (
    <Box mt={2}>
      <FormControl fullWidth>
        <InputLabel>Type</InputLabel>
        <Select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          label="Type"
        >
          {ALL_TYPES.map(type => (
            <MenuItem key={type} value={type}>{type}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        variant="contained"
        color="success"
        sx={{ mt: 2 }}
        onClick={handleFilter}
        disabled={!selectedType}
      >
        Search
      </Button>

      {filteredPokemons.length > 0 && (
        <>
          <Typography variant="h6" sx={{ mt: 3 }}>
            Pokémon of type: {selectedType}
          </Typography>
          <PokedexTable pokemons={filteredPokemons} />
        </>
      )}
    </Box>
  );
}

export default FilterablePokedexTable;
