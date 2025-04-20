import { useState } from 'react';
import PokemonRow from './components/PokemonRow';
import PokedexTable from './components/PokedexTable';
import { TextField, Button, Container, Typography, Box } from '@mui/material';

function App() {
  const [name, setName] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [namesInput, setNamesInput] = useState('');
  const [pokemonList, setPokemonList] = useState([]);
  const [type, setType] = useState('');
  const [typeFilteredList, setTypeFilteredList] = useState([]);

  const handleSingleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://pokemonbackend-production-ef16.up.railway.app/api/pokemons/${name}`);
    const data = await res.json();
    if (res.ok) {
      setPokemon(data);
    } else {
      alert(data.message);
      setPokemon(null);
    }
  };

  const handleMultipleSubmit = async (e) => {
    e.preventDefault();
    const names = namesInput.split(',').map((n) => n.trim());
    const res = await fetch('https://pokemonbackend-production-ef16.up.railway.app/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ names }),
    });
    const data = await res.json();
    if (res.ok) {
      setPokemonList(data);
    } else {
      alert(data.message);
      setPokemonList([]);
    }
  };

  const handleTypeSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`https://pokemonbackend-production-ef16.up.railway.app/api/pokemons/type/${type.toLowerCase()}`);
    const data = await res.json();
    if (res.ok) {
      setTypeFilteredList(data);
    } else {
      alert(data.message);
      setTypeFilteredList([]);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 4,
        backgroundColor: '#f5f5f5',
        backgroundImage: `
          radial-gradient(circle, #ff0000 1px, transparent 1px),
          radial-gradient(circle, #ff0000 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
        backgroundPosition: '0 0, 20px 20px',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 100%)',
          zIndex: 0,
        }
      }}
    >
      <Container
        maxWidth="md"
        sx={{
          position: 'relative',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.92)',
          borderRadius: 2,
          boxShadow: 3,
          p: 4,
          my: 4,
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Find Your Pokémon
        </Typography>

        {/* Single Pokémon Search */}
        <Box
          component="form"
          onSubmit={handleSingleSubmit}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Enter Pokémon name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ width: '100%', maxWidth: 400 }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            sx={{ width: { xs: '100%', sm: 'auto' }, px: 4 }}
          >
            Search
          </Button>
        </Box>

        {pokemon && <PokemonRow pokemon={pokemon} />}

        {/* Multiple Pokémon Search */}
        <Typography variant="h5" sx={{ mt: 6, mb: 3, textAlign: 'center' }}>
          Find Multiple Pokémon
        </Typography>

        <Box
          component="form"
          onSubmit={handleMultipleSubmit}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Enter names (comma separated)"
            value={namesInput}
            onChange={(e) => setNamesInput(e.target.value)}
            sx={{ width: '100%', maxWidth: 400 }}
          />
          <Button
            variant="contained"
            color="secondary"
            type="submit"
            sx={{ width: { xs: '100%', sm: 'auto' }, px: 4 }}
          >
            Search All
          </Button>
        </Box>

        {pokemonList.length > 0 && <PokedexTable pokemons={pokemonList} />}

        {/* Filter by Type */}
        <Typography variant="h5" sx={{ mt: 6, mb: 3, textAlign: 'center' }}>
          Filter by Pokémon Type
        </Typography>

        <Box
          component="form"
          onSubmit={handleTypeSubmit}
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            mb: 4,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <TextField
            label="Enter type (e.g., grass, fire)"
            value={type}
            onChange={(e) => setType(e.target.value)}
            sx={{ width: '100%', maxWidth: 400 }}
          />
          <Button
            variant="contained"
            color="success"
            type="submit"
            sx={{ width: { xs: '100%', sm: 'auto' }, px: 4 }}
          >
            Search by Type
          </Button>
        </Box>

        {typeFilteredList.length > 0 && <PokedexTable pokemons={typeFilteredList} />}
      </Container>
    </Box>
  );
}

export default App;