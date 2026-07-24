import './globals.css';
import React from 'react';

export const metadata = {
  title: 'Petto - Meet your desktop pet companion',
  description: 'Petto brings interactive companions gently to life on your desktop screen with custom adoption, dynamic behaviors, and birth certificates.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
