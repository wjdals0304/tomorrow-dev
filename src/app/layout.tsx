import type { Metadata } from 'next';
import './globals.css';
import './styles/reset.css';

export const metadata: Metadata = {
  title: 'Tomorrow Dev',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
