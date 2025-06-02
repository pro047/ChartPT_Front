'use client';

import { useState } from 'react';

type Props = {
  onDeleteAction: () => void;
  label: string;
  message: string;
  confirmText: string;
  cancelText: string;
};

export const DeleteButton = ({
  onDeleteAction,
  label,
  message,
  confirmText,
  cancelText,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onDeleteAction();
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{label}</button>

      {isOpen && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded shadow'>
            <p>{message}</p>
            <div className='flex justify-end gap-2 mt-4'>
              <button onClick={() => setIsOpen(false)}>{cancelText}</button>
              <button onClick={handleConfirm}>{confirmText}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
