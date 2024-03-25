import React, {useState, createContext, ReactNode} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ContextProps {
  ids: number[];
  addFavorite: (id: number) => void;
  removeFavorite: (id: number) => void;
}

export const FavoritesContext = createContext<ContextProps>({
  ids: [],
  addFavorite: () => {},
  removeFavorite: () => {},
});

interface Props {
  children: ReactNode;
}

const FavoritesContextProvider: React.FC<Props> = ({children}) => {
  const [favoriteMealIds, setFavoriteMealIds] = useState<number[]>([]);

  const addFavorite = async (id: number) => {
    const ids = [...favoriteMealIds, id];
    const serializedIDs = JSON.stringify(ids);
    setFavoriteMealIds(currentFavIds => [...currentFavIds, id]);
    await AsyncStorage.setItem('ids', serializedIDs);
  };

  const removeFavorite = (id: number) => {
    setFavoriteMealIds(currentFavIds =>
      currentFavIds.filter(mealId => mealId !== id),
    );
  };

  const value: ContextProps = {
    ids: favoriteMealIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContextProvider;
