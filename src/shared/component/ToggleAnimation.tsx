'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CiDark, CiLight } from 'react-icons/ci';
import { useTheme } from '../theme';

export const ToggleAnimation = ({}) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  const iconSize = 20;

  return (
    <div className='relative right-1.5 w-24.5 h-10 border rounded-full dark:bg-neutral-900 overflow-hidden'>
      <motion.button
        onClick={toggleDarkMode}
        className='absolute top-[0.18rem] left-1 flex items-center justify-center w-8 h-8 p-1 rounded-full overflow-hidden dark:hover:bg-accent/50 border'
        animate={{ x: isDarkMode ? 56 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.span
          key={isDarkMode ? 'moon' : 'sun'}
          initial={{ rotate: -180, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 180, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? (
            <CiLight size={iconSize} />
          ) : (
            <CiDark size={iconSize} />
          )}
        </motion.span>
      </motion.button>
    </div>
  );
};
