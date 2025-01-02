import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WatchlistContext = createContext();

export const WatchlistProvider = ({ children }) => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const storedMovies = await AsyncStorage.getItem('watchlist');
      setWatchlist(storedMovies ? JSON.parse(storedMovies) : []);
    } catch (error) {
      console.error('Failed to load watchlist:', error);
    }
  };

  const addToWatchlist = async (movie) => {
    try {
      const updatedWatchlist = [...watchlist, movie];
      await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Failed to add to watchlist:', error);
    }
  };

  const removeFromWatchlist = async (movieId) => {
    try {
      const updatedWatchlist = watchlist.filter(
        (movie) => movie.id !== movieId
      );
      await AsyncStorage.setItem('watchlist', JSON.stringify(updatedWatchlist));
      setWatchlist(updatedWatchlist);
    } catch (error) {
      console.error('Failed to remove from watchlist:', error);
    }
  };

  const isInWatchlist = (movieId) => {
    return watchlist.some((movie) => movie.id === movieId);
  };

  return (
    <WatchlistContext.Provider
      value={{ watchlist, addToWatchlist, removeFromWatchlist, isInWatchlist }}
    >
      {children}
    </WatchlistContext.Provider>
  );
};

export const useWatchlist = () => {
  return useContext(WatchlistContext);
};
