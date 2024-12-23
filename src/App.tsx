import React, { useState, useCallback } from 'react';
import { Grid } from '@giphy/react-components';
import { GiphyFetch } from '@giphy/js-fetch-api';
import styled from 'styled-components';
import { IGif } from '@giphy/js-types';
import { SyntheticEvent } from 'react';

const API_KEY = 'GlVGYHkr3WSBnllca54iNt0yFbjz7L65';
const gf = new GiphyFetch(API_KEY);

const AppContainer = styled.div`
  font-family: Arial, sans-serif;
  background: #121212;
  color: white;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding: 20px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: #2a2a2a;
  color: white;
  outline: none;
  margin-bottom: 20px;

  &:focus {
    background: #333;
  }
`;

const GridContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #1a1a1a;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #333;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #444;
  }
`;

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const fetchGifs = useCallback(
    (offset: number) => {
      if (!searchQuery) return gf.trending({ offset, limit: 10 });
      return gf.search(searchQuery, { offset, limit: 10 });
    },
    [searchQuery]
  );

  const onGifClick = (gif: IGif, e: SyntheticEvent<HTMLElement, Event>) => {
    e.preventDefault();
    const gifUrl = `https://media.giphy.com/media/${gif.id}/giphy.gif`;
    navigator.clipboard.writeText(gifUrl);

    // Show copy feedback (you might want to add a toast notification here)
    console.log('Copied to clipboard:', gifUrl);
  };

  return (
    <AppContainer>
      <SearchInput
        type="text"
        placeholder="Search GIFs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <GridContainer>
        <Grid
          onGifClick={onGifClick}
          fetchGifs={fetchGifs}
          width={window.innerWidth - 60}
          columns={2}
          gutter={12}
        />
      </GridContainer>
    </AppContainer>
  );
};

export default App; 