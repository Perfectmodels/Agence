
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the context data
interface ChangesContextType {
  changes: string[];
  addChange: (description: string) => void;
  clearChanges: () => void;
}

// Create the context with a default undefined value
const ChangesContext = createContext<ChangesContextType | undefined>(undefined);

// Create a provider component
interface ChangesProviderProps {
  children: ReactNode;
}

export const ChangesProvider: React.FC<ChangesProviderProps> = ({ children }) => {
  const [changes, setChanges] = useState<string[]>([]);

  const addChange = (description: string) => {
    // Add new change to the top of the list
    setChanges(prevChanges => [description, ...prevChanges]);
  };

  const clearChanges = () => {
    setChanges([]);
  };

  const value = { changes, addChange, clearChanges };

  return (
    <ChangesContext.Provider value={value}>
      {children}
    </ChangesContext.Provider>
  );
};

// Create a custom hook to use the ChangesContext
export const useChanges = (): ChangesContextType => {
  const context = useContext(ChangesContext);
  if (context === undefined) {
    throw new Error('useChanges must be used within a ChangesProvider');
  }
  return context;
};
