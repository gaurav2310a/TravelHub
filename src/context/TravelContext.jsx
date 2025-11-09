'use client';

import { createContext, useContext, useState } from 'react';

// Create the context
const TravelContext = createContext();

// Custom hook to use the travel context
export const useTravel = () => {
  const context = useContext(TravelContext);
  if (!context) {
    throw new Error('useTravel must be used within a TravelProvider');
  }
  return context;
};

// Provider component
export function TravelProvider({ children }) {
  // State for managing trips
  const [trips, setTrips] = useState([]);
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState('list');
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    priceRange: 'all',
    rating: 0,
    activity: 'all',
    duration: 'all',
    bestTime: '',
    groupSize: 'all',
    sort: 'popular'
  });
  const [preferences, setPreferences] = useState({
    travelStyle: [],
    budget: null,
    interests: [],
    accommodation: []
  });

  // Trip management functions
  const createTrip = async (tripData) => {
    try {
      // TODO: Implement trip creation logic
      // const response = await fetch('/api/trips', {
      //   method: 'POST',
      //   body: JSON.stringify(tripData)
      // });
      // const newTrip = await response.json();
      // setTrips([...trips, newTrip]);
      // return newTrip;
    } catch (error) {
      throw new Error('Failed to create trip: ' + error.message);
    }
  };

  const updateTrip = async (tripId, updates) => {
    try {
      // TODO: Implement trip update logic
      // const response = await fetch(`/api/trips/${tripId}`, {
      //   method: 'PUT',
      //   body: JSON.stringify(updates)
      // });
      // const updatedTrip = await response.json();
      // setTrips(trips.map(trip => trip.id === tripId ? updatedTrip : trip));
      // return updatedTrip;
    } catch (error) {
      throw new Error('Failed to update trip: ' + error.message);
    }
  };

  // Location and place management
  const savePlace = (place) => {
    setSavedPlaces(prev => [...prev, place]);
  };

  const removePlace = (placeId) => {
    setSavedPlaces(prev => prev.filter(place => place.id !== placeId));
  };

  const updateLocation = (location) => {
    setCurrentLocation(location);
  };

  // Search and recommendation functions
  const addToSearchHistory = (searchQuery) => {
    setSearchHistory(prev => [searchQuery, ...prev].slice(0, 10)); // Keep last 10 searches
  };

  const updatePreferences = (newPreferences) => {
    setPreferences(prev => ({
      ...prev,
      ...newPreferences
    }));
  };

  // Safety features
  const reportEmergency = async (details) => {
    try {
      // TODO: Implement emergency reporting
      // const response = await fetch('/api/emergency', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     location: currentLocation,
      //     ...details
      //   })
      // });
      // return response.json();
    } catch (error) {
      throw new Error('Failed to report emergency: ' + error.message);
    }
  };

  // Provide the context value
  const value = {
    trips,
    savedPlaces,
    currentLocation,
    searchHistory,
    preferences,
    darkMode,
    setDarkMode,
    searchQuery,
    setSearchQuery,
    currentView,
    setCurrentView,
    selectedDestination,
    setSelectedDestination,
    filters,
    setFilters,
    createTrip,
    updateTrip,
    savePlace,
    removePlace,
    updateLocation,
    addToSearchHistory,
    updatePreferences,
    reportEmergency
  };

  return (
    <TravelContext.Provider value={value}>
      {children}
    </TravelContext.Provider>
  );
}