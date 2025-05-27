import '@/app/styles/reset.css';
import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout">
      <main>{children}</main>
    </div>
  );
}
