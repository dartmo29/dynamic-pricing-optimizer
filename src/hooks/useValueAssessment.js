/**
 * useValueAssessment.js
 * Custom hook for value assessment functionality
 */

import { useState, useEffect } from 'react';
import { STORAGE_KEYS, saveToStorage, loadFromStorage } from '../utils/storage';

/**
 * Hook for value assessment data and operations
 * 
 * @returns {Object} Value assessment state and functions
 */
const useValueAssessment = () => {
  // State for competitors
  const [competitors, setCompetitors] = useState([]);
  
  // State for value proposition
  const [valueProposition, setValueProposition] = useState({
    statement: '',
    uniqueFactors: [],
    targetMarket: '',
    primaryBenefit: '',
    differentiator: ''
  });
  
  // State for value mapping
  const [valueMap, setValueMap] = useState({
    customerNeeds: [],
    valueDelivery: []
  });
  
  // State for communication
  const [communication, setCommunication] = useState({
    keyMessages: [],
    channels: [],
    materials: []
  });
  
  // Load initial data from storage
  useEffect(() => {
    const loadedCompetitors = loadFromStorage(STORAGE_KEYS.COMPETITORS, []);
    if (loadedCompetitors && loadedCompetitors.length > 0) {
      setCompetitors(loadedCompetitors);
    }
    
    const loadedValueProposition = loadFromStorage(STORAGE_KEYS.VALUE_PROPOSITION, null);
    if (loadedValueProposition) {
      setValueProposition(loadedValueProposition);
    }
    
    const loadedValueMap = loadFromStorage(STORAGE_KEYS.VALUE_MAP, null);
    if (loadedValueMap) {
      setValueMap(loadedValueMap);
    }
    
    const loadedCommunication = loadFromStorage(STORAGE_KEYS.COMMUNICATION, null);
    if (loadedCommunication) {
      setCommunication(loadedCommunication);
    }
  }, []);
  
  /**
   * Add a new competitor
   * 
   * @param {Object} competitor - Competitor data
   */
  const addCompetitor = (competitor) => {
    const newCompetitors = [...competitors, {
      ...competitor,
      id: Date.now().toString()
    }];
    
    setCompetitors(newCompetitors);
    saveToStorage(STORAGE_KEYS.COMPETITORS, newCompetitors);
  };
  
  /**
   * Update an existing competitor
   * 
   * @param {string} id - Competitor ID
   * @param {Object} updatedData - Updated competitor data
   */
  const updateCompetitor = (id, updatedData) => {
    const newCompetitors = competitors.map(competitor => 
      competitor.id === id ? { ...competitor, ...updatedData } : competitor
    );
    
    setCompetitors(newCompetitors);
    saveToStorage(STORAGE_KEYS.COMPETITORS, newCompetitors);
  };
  
  /**
   * Remove a competitor
   * 
   * @param {string} id - Competitor ID
   */
  const removeCompetitor = (id) => {
    const newCompetitors = competitors.filter(competitor => competitor.id !== id);
    
    setCompetitors(newCompetitors);
    saveToStorage(STORAGE_KEYS.COMPETITORS, newCompetitors);
  };
  
  /**
   * Update value proposition
   * 
   * @param {Object} updatedValueProposition - Updated value proposition data
   */
  const updateValueProposition = (updatedValueProposition) => {
    const newValueProposition = {
      ...valueProposition,
      ...updatedValueProposition
    };
    
    setValueProposition(newValueProposition);
    saveToStorage(STORAGE_KEYS.VALUE_PROPOSITION, newValueProposition);
  };
  
  /**
   * Update value map
   * 
   * @param {Object} updatedValueMap - Updated value map data
   */
  const updateValueMap = (updatedValueMap) => {
    const newValueMap = {
      ...valueMap,
      ...updatedValueMap
    };
    
    setValueMap(newValueMap);
    saveToStorage(STORAGE_KEYS.VALUE_MAP, newValueMap);
  };
  
  /**
   * Update communication
   * 
   * @param {Object} updatedCommunication - Updated communication data
   */
  const updateCommunication = (updatedCommunication) => {
    const newCommunication = {
      ...communication,
      ...updatedCommunication
    };
    
    setCommunication(newCommunication);
    saveToStorage(STORAGE_KEYS.COMMUNICATION, newCommunication);
  };
  
  /**
   * Add a key message to the communication
   * 
   * @param {Object} message - Key message data
   */
  const addKeyMessage = (message) => {
    const newKeyMessages = [...communication.keyMessages, {
      ...message,
      id: Date.now().toString()
    }];
    
    const newCommunication = {
      ...communication,
      keyMessages: newKeyMessages
    };
    
    setCommunication(newCommunication);
    saveToStorage(STORAGE_KEYS.COMMUNICATION, newCommunication);
  };
  
  /**
   * Remove a key message from the communication
   * 
   * @param {string} id - Message ID
   */
  const removeKeyMessage = (id) => {
    const newKeyMessages = communication.keyMessages.filter(message => message.id !== id);
    
    const newCommunication = {
      ...communication,
      keyMessages: newKeyMessages
    };
    
    setCommunication(newCommunication);
    saveToStorage(STORAGE_KEYS.COMMUNICATION, newCommunication);
  };
  
  /**
   * Add a customer need to the value map
   * 
   * @param {Object} need - Customer need data
   */
  const addCustomerNeed = (need) => {
    const newCustomerNeeds = [...valueMap.customerNeeds, {
      ...need,
      id: Date.now().toString()
    }];
    
    const newValueMap = {
      ...valueMap,
      customerNeeds: newCustomerNeeds
    };
    
    setValueMap(newValueMap);
    saveToStorage(STORAGE_KEYS.VALUE_MAP, newValueMap);
  };
  
  /**
   * Remove a customer need from the value map
   * 
   * @param {string} id - Need ID
   */
  const removeCustomerNeed = (id) => {
    const newCustomerNeeds = valueMap.customerNeeds.filter(need => need.id !== id);
    
    const newValueMap = {
      ...valueMap,
      customerNeeds: newCustomerNeeds
    };
    
    setValueMap(newValueMap);
    saveToStorage(STORAGE_KEYS.VALUE_MAP, newValueMap);
  };
  
  return {
    // State
    competitors,
    valueProposition,
    valueMap,
    communication,
    
    // Competitor functions
    addCompetitor,
    updateCompetitor,
    removeCompetitor,
    
    // Value proposition functions
    updateValueProposition,
    
    // Value map functions
    updateValueMap,
    addCustomerNeed,
    removeCustomerNeed,
    
    // Communication functions
    updateCommunication,
    addKeyMessage,
    removeKeyMessage
  };
};

export default useValueAssessment;