'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const TravelDataContext = createContext();

export const useTravelData = () => {
  const context = useContext(TravelDataContext);
  if (!context) {
    throw new Error('useTravelData must be used within a TravelDataProvider');
  }
  return context;
};

export function TravelDataProvider({ children }) {
  const [trips, setTrips] = useState([]);
  const [stories, setStories] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedTrips = localStorage.getItem('userTrips');
      const savedStories = localStorage.getItem('userStories');
      const savedQuestions = localStorage.getItem('userQuestions');

      if (savedTrips) setTrips(JSON.parse(savedTrips));
      if (savedStories) setStories(JSON.parse(savedStories));
      if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
    } catch (error) {
      console.error('Failed to load travel data from localStorage:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userTrips', JSON.stringify(trips));
  }, [trips]);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userStories', JSON.stringify(stories));
  }, [stories]);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userQuestions', JSON.stringify(questions));
  }, [questions]);

  const addTrip = (tripData) => {
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      createdAt: new Date().toISOString(),
    };
    setTrips(prev => [newTrip, ...prev]);
    return newTrip;
  };

  const addStory = (storyData) => {
    const newStory = {
      id: Date.now().toString(),
      ...storyData,
      createdAt: new Date().toISOString(),
    };
    setStories(prev => [newStory, ...prev]);
    return newStory;
  };

  const addQuestion = (questionData) => {
    const newQuestion = {
      id: Date.now().toString(),
      ...questionData,
      createdAt: new Date().toISOString(),
    };
    setQuestions(prev => [newQuestion, ...prev]);
    return newQuestion;
  };

  const updateTrip = (id, updates) => {
    setTrips(prev => prev.map(trip => trip.id === id ? { ...trip, ...updates } : trip));
  };

  const updateStory = (id, updates) => {
    setStories(prev => prev.map(story => story.id === id ? { ...story, ...updates } : story));
  };

  const updateQuestion = (id, updates) => {
    setQuestions(prev => prev.map(q => q.id === id ? { ...q, ...updates } : q));
  };

  const deleteTrip = (id) => {
    setTrips(prev => prev.filter(trip => trip.id !== id));
  };

  const deleteStory = (id) => {
    setStories(prev => prev.filter(story => story.id !== id));
  };

  const deleteQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  const getTripById = (id) => trips.find(trip => trip.id === id);
  const getStoryById = (id) => stories.find(story => story.id === id);
  const getQuestionById = (id) => questions.find(q => q.id === id);

  const getMyTrips = (userId) => trips.filter(trip => trip.authorId === userId);
  const getMyStories = (userId) => stories.filter(story => story.authorId === userId);
  const getMyQuestions = (userId) => questions.filter(q => q.authorId === userId);

  return (
    <TravelDataContext.Provider
      value={{
        trips,
        stories,
        questions,
        loading,
        addTrip,
        addStory,
        addQuestion,
        updateTrip,
        updateStory,
        updateQuestion,
        deleteTrip,
        deleteStory,
        deleteQuestion,
        getTripById,
        getStoryById,
        getQuestionById,
        getMyTrips,
        getMyStories,
        getMyQuestions,
      }}
    >
      {children}
    </TravelDataContext.Provider>
  );
}
