import { createSlice } from '@reduxjs/toolkit';

type ThemeType = 'light' | 'dark';

type ThemeState = {
  mode: ThemeType;
  isInitialized: boolean;
};

const isBrowser = typeof window !== 'undefined';

// Get preloaded theme state from window
const getPreloadedTheme = (): ThemeType => {
  if (!isBrowser) return 'light';
  return (window as any).__THEME_STATE__ || 'light';
};

const getSystemTheme = (): ThemeType => {
  if (!isBrowser) return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
};

const getThemeModeFromLocalStorage = (): ThemeType => {
  if (!isBrowser) return 'light';
  try {
    const savedTheme = localStorage.getItem('theme') as ThemeType | null;
    return savedTheme || getSystemTheme();
  } catch (error) {
    return 'light';
  }
};

const saveThemeModeToLocalStorage = (themeMode: ThemeType) => {
  if (!isBrowser) return;
  try {
    localStorage.setItem('theme', themeMode);
    updateDocumentTheme(themeMode);
  } catch (error) {
    console.error('Failed to save theme to localStorage:', error);
  }
};

const updateDocumentTheme = (themeMode: ThemeType) => {
  if (!isBrowser) return;
  
  // Update root element
  const root = document.documentElement;
  const oppositeTheme = themeMode === 'dark' ? 'light' : 'dark';
  
  root.classList.remove(oppositeTheme);
  root.classList.add(themeMode);
  
  // Update body
  document.body.classList.remove(oppositeTheme);
  document.body.classList.add(themeMode);
  
  // Update color scheme
  root.style.colorScheme = themeMode;
  
  // Update theme color
  const themeColor = themeMode === 'dark' ? '#181818' : '#ffffff';
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', themeColor);
    
  // Store theme for page transitions
  (window as any).__THEME_STATE__ = themeMode;
};

// Initialize with preloaded state
const initialState: ThemeState = {
  mode: getPreloadedTheme(),
  isInitialized: false
};

const themeSlice = createSlice({
  name: 'themeReducer',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      saveThemeModeToLocalStorage(state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      saveThemeModeToLocalStorage(state.mode);
    },
    initializeTheme: (state) => {
      if (!state.isInitialized) {
        state.mode = getThemeModeFromLocalStorage();
        state.isInitialized = true;
        updateDocumentTheme(state.mode);
      }
    },
  },
});

export const { toggleTheme, setTheme, initializeTheme } = themeSlice.actions;
export default themeSlice.reducer;