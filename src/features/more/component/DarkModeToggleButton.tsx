import { CiLight, CiDark } from 'react-icons/ci';
import { useTheme } from '@/shared';

export const DarkModeToggleButton = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <button onClick={toggleDarkMode} className='p-2 border rounded'>
      {isDarkMode ? <CiLight /> : <CiDark />}
    </button>
  );
};
