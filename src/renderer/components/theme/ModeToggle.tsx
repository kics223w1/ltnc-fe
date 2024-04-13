import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import { useTheme } from './ThemeProvider';
import { Button } from '/~/components/ui/button';
import IconSVG from '../utils/icon-svg';
import { ICON_SVG } from '/renderer/models/constants';

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {theme === 'light' ? (
            <IconSVG iconName={ICON_SVG.SUN_MAX} style={{}} css="w-5 h-5" />
          ) : (
            <IconSVG iconName={ICON_SVG.MOON_STARS} style={{}} css="w-5 h-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>
          Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
