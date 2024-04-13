import { createContext, useContext, useEffect, useState } from 'react';
import { themes } from '../../constant/theme';

type Theme = 'dark' | 'light' | 'system';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  color: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setColor: (color: string) => void;
};

const initialState: ThemeProviderState = {
  color: 'orange',
  theme: 'dark',
  setTheme: () => null,
  setColor: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'dark',
  storageKey = 'vite-ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [color, setColor] = useState<string>('orange');

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)')
        .matches
        ? 'dark'
        : 'light';

      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    handleUpdateRootProperties();
  }, [theme]);

  const handleUpdateRootProperties = () => {
    const foundedTheme = themes.find((theme) => theme.name === color);
    const root = document.documentElement;
    if (foundedTheme && root) {
      const obj: { [key: string]: string } =
        theme === 'dark'
          ? foundedTheme.cssVars.dark
          : foundedTheme.cssVars.light;

      Object.keys(obj).forEach((key) => {
        root.style.setProperty(`--${key}`, obj[key]);
      });
    }
  };

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    color,
    setColor,
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
