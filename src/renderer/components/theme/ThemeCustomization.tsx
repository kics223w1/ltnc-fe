import { useLayoutEffect } from 'react';
import { ModeToggle } from './ModeToggle';
import { useTheme } from './ThemeProvider';
import { themes } from '/renderer/constant/theme';

export default function ThemeCustomization() {
  const { theme, color, setTheme, setColor } = useTheme();

  useLayoutEffect(() => {
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
  }, [color]);

  return (
    <div className="flex items-center gap-2">
      <ModeToggle />
      {['zinc', 'rose', 'blue', 'green', 'orange'].map((color) => {
        const foundedTheme = themes.find((theme) => theme.name === color);
        const isActive = color === color;

        if (!foundedTheme) {
          return null;
        }
        return (
          <button
            onClick={() => setColor(color)}
            className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs,
              ${isActive ? 'border-[--theme-primary]' : 'border-transparent'}`}
            style={
              {
                '--theme-primary': `hsl(${
                  foundedTheme?.activeColor[theme === 'dark' ? 'dark' : 'light']
                })`,
              } as React.CSSProperties
            }
          >
            <span
              className={
                'flex h-6 w-6 items-center justify-center rounded-full bg-[--theme-primary]'
              }
            >
              {/* {isActive && <CheckIcon className="h-4 w-4 text-white" />} */}
            </span>
            <span className="sr-only">{foundedTheme.label}</span>
          </button>
        );
      })}
    </div>
  );
}
