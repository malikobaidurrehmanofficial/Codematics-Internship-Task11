import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../store/themeSlice';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.theme.mode);

  return (
    <button
      id="theme-toggle"
      onClick={() => dispatch(toggleTheme())}
      className="relative p-2 rounded-full bg-surface hover:bg-surface-hover border border-border transition-all duration-300 cursor-pointer group"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 h-5 w-5 text-amber-400 transition-all duration-300 ${
            theme === 'light' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-blue-300 transition-all duration-300 ${
            theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}
