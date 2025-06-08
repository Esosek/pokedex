# Pokédex CLI

A simple command-line Pokédex application built with TypeScript that interacts with the PokéAPI.

## Features

- Explore Pokémon locations
- Catch and collect Pokémon
- View your Pokédex collection
- Inspect individual Pokémon details

## Setup

```bash
git clone https://github.com/Esosek/pokedex.git
cd pokedex
npm install
```

## Usage

```bash
npm run dev
```

This will start the interactive CLI. Use `help` to see available commands.

## Commands

- `help` - Show available commands
- `map` - Display location areas
- `explore <area>` - Explore a specific area for Pokémon
- `catch <pokemon>` - Attempt to catch a Pokémon
- `inspect <pokemon>` - View details of a caught Pokémon
- `pokedex` - Show your collection
- `exit` - Quit the application

## Development

- `npm run build` - Compile TypeScript
- `npm start` - Run compiled version
- `npm test` - Run tests
