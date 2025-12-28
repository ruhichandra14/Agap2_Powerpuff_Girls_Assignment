'use client';

import { ReactNode } from 'react';

interface AtlassianProviderProps {
  children: ReactNode;
}

export const AtlassianProvider = ({ children }: AtlassianProviderProps) => {
  return <>{children}</>;
};
