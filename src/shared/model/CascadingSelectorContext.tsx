'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type CascadingSelectorType = {
  selectedRegionId: number | null;
  selectedMovementId: number | null;
  selectedBodySideId: number | null;
  setSelectedRegionId: (id: number | null) => void;
  setSelectedMovementId: (id: number | null) => void;
  setSelectedBodySideId: (id: number | null) => void;
};

export const CascadingSelectorContext =
  createContext<CascadingSelectorType | null>(null);

export const CascadingSelectorProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<number | null>(null);
  const [selectedMovementId, setSelectedMovementId] = useState<number | null>(
    null
  );
  const [selectedBodySideId, setSelectedBodySideId] = useState<number | null>(
    null
  );

  useEffect(() => {
    setSelectedMovementId(null);
    setSelectedBodySideId(null);
  }, [selectedRegionId]);

  useEffect(() => {
    setSelectedBodySideId(null);
  }, [selectedMovementId]);

  const value: CascadingSelectorType = {
    selectedRegionId,
    selectedMovementId,
    selectedBodySideId,
    setSelectedRegionId,
    setSelectedMovementId,
    setSelectedBodySideId,
  };

  return (
    <CascadingSelectorContext.Provider value={value}>
      {children}
    </CascadingSelectorContext.Provider>
  );
};

export const useCascading = () => {
  const context = useContext(CascadingSelectorContext);
  if (!context) throw new Error('CascadingContext not provided');
  return context;
};
