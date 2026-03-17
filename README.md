# Pokedex API

> Interactive Pokédex web application with real-time search and filtering. Fetch-based architecture with JSON data source.

## 📋 Overview

Educational project demonstrating modern JavaScript fundamentals: async/await, DOM manipulation, event listeners, and CSS animations. Browse 150+ Pokémon with live filtering across multiple criteria.

## ✨ Features

- ✅ **Real-time Search** - Filter by name, type, or number (instant results)
- ✅ **Responsive Grid** - Auto-layout that adapts to any screen size
- ✅ **DOM Manipulation** - Dynamic card generation with JavaScript
- ✅ **Async Data Loading** - Fetch JSON data with error handling
- ✅ **Event Listeners** - Input events trigger filtering instantly
- ✅ **Professional Styling** - CSS gradients, animations, Poké Ball design
- ✅ **Mobile Optimized** - Media queries for tablet and phone
- ✅ **150+ Pokémon** - Complete Pokédex from Gen 1

## 🛠️ Tech Stack

- **Frontend:** HTML5 • CSS3
- **JavaScript:** ES6+ • Fetch API • Event Listeners
- **Data:** JSON (local)

## 📁 Project Structure

```
src/
├── index.html              (Main structure)
├── js/
│   └── pokemons.js        (Fetch, DOM manipulation, events)
    └── data/
        └── pokemon.json 
├── css/
│   └── pokemon.css        (Responsive grid, animations)
      (150+ Pokémon data)
```

## 🚀 Quick Start

### Prerequisites
- Modern web browser

### Run

```bash
# Clone
git clone https://github.com/KilianCuadrado/pokedex-api.git
cd pokedex-api

# Open in browser
open index.html
```

## 🎮 How to Use

1. **Open the app** - Loads all 150+ Pokémon automatically
2. **Search by Name** - Type name in first input (case-insensitive)
3. **Filter by Type** - Enter type (Fire, Water, Grass, etc.)
4. **Filter by Number** - Enter Pokédex number (001-150)
5. **Instant Results** - Cards hide/show as you type

### Example Searches

```
Name: "charmander"     → Shows Charmander (case-insensitive)
Type: "water"          → Shows all Water-type Pokémon
Number: "025"          → Shows Pikachu (Pokédex #25)
```

## 💻 Code Highlights

### Async Data Loading

```javascript
const getPokemons = async function(){
  const url = `./js/data/pokemon.json`;
  
  try{
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error ${response.status}`);
    const data = await response.json();
    // Process data
  }
  catch(error) {
    console.error("Error loading Pokémon:", error);
  } 
}
```

### Real-time Search

```javascript
buscarFormulariNom.addEventListener('input', function() {
  data.pokemon.forEach((p) => {
    buscarPokemonsFormulari(
      !p.name.toUpperCase().includes(buscarFormulariNom.value.toUpperCase()),
      p
    );
  });
});
```

### Dynamic DOM Generation

```javascript
function mostrarPokemons(pokemon){
  const tarjetaPokemon = document.createElement('article');
  tarjetaPokemon.className = 'pokemon-card';
  
  const imgPokemon = document.createElement('img');
  imgPokemon.src = pokemon.img;
  
  tarjetaPokemon.appendChild(imgPokemon);
  conteinerPokemon.appendChild(tarjetaPokemon);
}
```

## 🎨 Design Features

- **Pokéball Styling** - CSS pseudo-elements (::before, ::after) create Poké Ball design
- **Gradient Backgrounds** - Radial and linear gradients for depth
- **Smooth Animations** - Hover effects with transform and box-shadow
- **Responsive Grid** - `grid-template-columns: repeat(auto-fit, minmax(220px, 1fr))`
- **Mobile Media Queries** - Optimized for 768px and 480px breakpoints

## 🎓 Learning Outcomes

Demonstrates:
- ✅ Fetch API for async data loading
- ✅ Error handling with try/catch
- ✅ DOM manipulation (createElement, appendChild)
- ✅ Event listeners (input, change events)
- ✅ Array methods (forEach, filter, includes)
- ✅ String manipulation (toUpperCase, includes)
- ✅ CSS Grid for responsive layouts
- ✅ CSS animations and transitions
- ✅ Mobile-first responsive design

## 📊 Data Structure

```json
{
  "pokemon": [
    {
      "id": 1,
      "num": "001",
      "name": "Bulbasaur",
      "img": "http://serebii.net/pokemongo/pokemon/001.png",
      "type": ["Grass", "Poison"],
      "height": "0.71 m",
      "weight": "6.9 kg"
    }
    // ... 149 more Pokémon
  ]
}
```

## 📈 Future Enhancements

- [ ] Sorting by name, number, or type
- [ ] Detail view (click Pokémon for full info)
- [ ] Weakness/evolution display
- [ ] Filter by multiple types
- [ ] Pagination or infinite scroll
- [ ] Save favorites (localStorage)
- [ ] Dark mode toggle
- [ ] API integration (PokeAPI)
- [ ] Backend API wrapper

## 🐛 Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## 🤝 Contributing

Feel free to fork, enhance, and submit improvements!

## 📄 License

MIT License - Open source

---

**Created as part of DAW learning**  
*Status: Functional & Complete* ✨
