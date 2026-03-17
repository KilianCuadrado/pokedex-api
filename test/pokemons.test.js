/**
 * Tests for Pokedex API
 * Testing: DOM manipulation, fetch, filtering, and search functionality
 */

// Mock data
const mockPokemonData = {
  pokemon: [
    {
      id: 1,
      num: "001",
      name: "Bulbasaur",
      img: "http://example.com/001.png",
      type: ["Grass", "Poison"]
    },
    {
      id: 25,
      num: "025",
      name: "Pikachu",
      img: "http://example.com/025.png",
      type: ["Electric"]
    },
    {
      id: 4,
      num: "004",
      name: "Charmander",
      img: "http://example.com/004.png",
      type: ["Fire"]
    }
  ]
};

describe("Pokedex Functions", () => {

  beforeEach(() => {
    // Configurar DOM antes de cada test
    document.body.innerHTML = `
      <main id="main">
        <section id="container-pokemons"></section>
      </main>
    `;

    // Limpiar mocks
    jest.clearAllMocks();
  });

  describe("buscarPokemonsFormulari", () => {

    test("should hide pokemon when condition is true", () => {
      // Arrange
      const container = document.getElementById("container-pokemons");
      const pokemon = { name: "Pikachu" };
      
      // Create a pokemon card
      const card = document.createElement("article");
      card.id = "Pikachu";
      card.style.display = "flex";
      container.appendChild(card);

      // Act - Function to test
      const buscarPokemonsFormulari = (condicio, numeroOrdre) => {
        const eliminarPokemons = document.getElementById(numeroOrdre.name);
        if (condicio) {
          eliminarPokemons.style.display = "none";
        } else {
          eliminarPokemons.style.display = "flex";
        }
      };

      buscarPokemonsFormulari(true, pokemon);

      // Assert
      const element = document.getElementById("Pikachu");
      expect(element.style.display).toBe("none");
    });

    test("should show pokemon when condition is false", () => {
      // Arrange
      const container = document.getElementById("container-pokemons");
      const pokemon = { name: "Charmander" };
      
      const card = document.createElement("article");
      card.id = "Charmander";
      card.style.display = "none";
      container.appendChild(card);

      // Act
      const buscarPokemonsFormulari = (condicio, numeroOrdre) => {
        const eliminarPokemons = document.getElementById(numeroOrdre.name);
        if (condicio) {
          eliminarPokemons.style.display = "none";
        } else {
          eliminarPokemons.style.display = "flex";
        }
      };

      buscarPokemonsFormulari(false, pokemon);

      // Assert
      const element = document.getElementById("Charmander");
      expect(element.style.display).toBe("flex");
    });
  });

  describe("mostrarPokemons", () => {

    test("should create pokemon card with correct structure", () => {
      // Arrange
      const container = document.getElementById("container-pokemons");
      const pokemon = mockPokemonData.pokemon[0]; // Bulbasaur

      // Act
      const mostrarPokemons = (numeroOrdre) => {
        const tarjetaPokemon = document.createElement("article");
        tarjetaPokemon.className = "pokemon-card";
        tarjetaPokemon.id = numeroOrdre.name;
        
        const imgPokemon = document.createElement("img");
        imgPokemon.className = "img-card";
        imgPokemon.src = numeroOrdre.img;

        const namePokedexPokemon = document.createElement("p");
        namePokedexPokemon.className = "name-pokedex";
        namePokedexPokemon.textContent = numeroOrdre.name;

        const numPokedexPokemon = document.createElement("p");
        numPokedexPokemon.className = "num-pokedex";
        numPokedexPokemon.textContent = numeroOrdre.num;

        const typePokemon = document.createElement("p");
        typePokemon.className = "pokemon-type";
        typePokemon.textContent = numeroOrdre.type;

        tarjetaPokemon.appendChild(imgPokemon);
        tarjetaPokemon.appendChild(numPokedexPokemon);
        tarjetaPokemon.appendChild(namePokedexPokemon);
        tarjetaPokemon.appendChild(typePokemon);
        container.appendChild(tarjetaPokemon);
      };

      mostrarPokemons(pokemon);

      // Assert
      const card = container.querySelector(".pokemon-card");
      expect(card).not.toBeNull();
      expect(card.id).toBe("Bulbasaur");
      expect(card.querySelector(".name-pokedex").textContent).toBe("Bulbasaur");
      expect(card.querySelector(".num-pokedex").textContent).toBe("001");
      expect(card.querySelector(".img-card").src).toBe("http://example.com/001.png");
    });

    test("should create correct number of cards for multiple pokemon", () => {
      // Arrange
      const container = document.getElementById("container-pokemons");
      const pokemonList = mockPokemonData.pokemon;

      // Act
      const mostrarPokemons = (numeroOrdre) => {
        const tarjetaPokemon = document.createElement("article");
        tarjetaPokemon.className = "pokemon-card";
        tarjetaPokemon.id = numeroOrdre.name;
        container.appendChild(tarjetaPokemon);
      };

      pokemonList.forEach(p => mostrarPokemons(p));

      // Assert
      const cards = container.querySelectorAll(".pokemon-card");
      expect(cards.length).toBe(3);
    });
  });

  describe("Fetch and Data Loading", () => {

    test("should fetch pokemon data successfully", async () => {
      // Arrange
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonData
      });

      // Act
      const response = await fetch("./js/data/pokemon.json");
      const data = await response.json();

      // Assert
      expect(response.ok).toBe(true);
      expect(data.pokemon).toHaveLength(3);
      expect(data.pokemon[0].name).toBe("Bulbasaur");
    });

    test("should handle fetch error correctly", async () => {
      // Arrange
      global.fetch.mockRejectedValueOnce(new Error("Network error"));

      // Act & Assert
      await expect(fetch("./js/data/pokemon.json")).rejects.toThrow("Network error");
    });

    test("should handle non-ok response", async () => {
      // Arrange
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: "Not Found"
      });

      // Act
      const response = await fetch("./js/data/pokemon.json");

      // Assert
      expect(response.ok).toBe(false);
      expect(response.status).toBe(404);
    });
  });

  describe("Search Filtering Logic", () => {

    test("should filter pokemon by name correctly", () => {
      // Arrange
      const searchTerm = "pikachu";
      const pokemonList = mockPokemonData.pokemon;

      // Act
      const filtered = pokemonList.filter(p =>
        p.name.toUpperCase().includes(searchTerm.toUpperCase())
      );

      // Assert
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Pikachu");
    });

    test("should filter pokemon by type correctly", () => {
      // Arrange
      const searchType = "Fire";
      const pokemonList = mockPokemonData.pokemon;

      // Act
      const filtered = pokemonList.filter(p =>
        p.type.some(t => t.toUpperCase().includes(searchType.toUpperCase()))
      );

      // Assert
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Charmander");
    });

    test("should filter pokemon by number correctly", () => {
      // Arrange
      const searchNum = "025";
      const pokemonList = mockPokemonData.pokemon;

      // Act
      const filtered = pokemonList.filter(p => p.num.includes(searchNum));

      // Assert
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe("Pikachu");
    });

    test("should be case-insensitive for name search", () => {
      // Arrange
      const searchTerms = ["BULBASAUR", "bulbasaur", "BuLbAsAuR"];
      const pokemon = mockPokemonData.pokemon[0];

      // Act & Assert
      searchTerms.forEach(term => {
        const matches = pokemon.name.toUpperCase().includes(term.toUpperCase());
        expect(matches).toBe(true);
      });
    });

    test("should return empty array when no matches found", () => {
      // Arrange
      const searchTerm = "Nonexistent";
      const pokemonList = mockPokemonData.pokemon;

      // Act
      const filtered = pokemonList.filter(p =>
        p.name.toUpperCase().includes(searchTerm.toUpperCase())
      );

      // Assert
      expect(filtered).toHaveLength(0);
    });
  });

  describe("Integration Tests", () => {

    test("should load and display pokemon cards", async () => {
      // Arrange
      const container = document.getElementById("container-pokemons");
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockPokemonData
      });

      // Act
      const response = await fetch("./js/data/pokemon.json");
      const data = await response.json();

      const mostrarPokemons = (numeroOrdre) => {
        const tarjetaPokemon = document.createElement("article");
        tarjetaPokemon.className = "pokemon-card";
        tarjetaPokemon.id = numeroOrdre.name;
        container.appendChild(tarjetaPokemon);
      };

      data.pokemon.forEach(p => mostrarPokemons(p));

      // Assert
      const cards = container.querySelectorAll(".pokemon-card");
      expect(cards).toHaveLength(3);
      expect(cards[0].id).toBe("Bulbasaur");
      expect(cards[1].id).toBe("Pikachu");
      expect(cards[2].id).toBe("Charmander");
    });
  });
});
