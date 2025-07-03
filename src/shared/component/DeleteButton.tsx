'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';

type Props = {
  onDeleteAction: () => void;
  label: string;
  message: string;
  confirmText: string;
  cancelText: string;
  variant:
    | 'link'
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | null
    | undefined;
};

export const DeleteButton = ({
  onDeleteAction,
  label,
  message,
  confirmText,
  cancelText,
  variant,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = () => {
    setIsOpen(false);
    onDeleteAction();
  };

  return (
    <>
      <Button variant={variant} onClick={() => setIsOpen(true)}>
        {label}
      </Button>

      {isOpen && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <div className='bg-white p-4 rounded shadow'>
            <p>{message}</p>
            <div className='flex justify-end gap-2 mt-4'>
              <Button onClick={() => setIsOpen(false)}>{cancelText}</Button>
              <Button onClick={handleConfirm}>{confirmText}</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
