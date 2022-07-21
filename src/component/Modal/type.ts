import { ReactNode } from 'react';

export type TProps = {
  children: ReactNode;
  title?: string;
  onClose?: () => void;
};
