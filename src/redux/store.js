import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['contacts'],
};

const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});

const persistedRootReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedRootReducer,
});

export const persistor = persistStore(store);
