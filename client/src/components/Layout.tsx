import type { ReactNode } from 'react';
import { Header } from './Header';

interface Props {
  children: ReactNode;
}

export const Layout = ({ children }: Props) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="p-4 max-w-5xl mx-auto">{children}</main>
    </div>
  );
};