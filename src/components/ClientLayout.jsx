'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';

export default function ClientLayout({ children }) {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <Navbar onContactClick={() => setIsContactOpen(true)} />
      <main>{children}</main>
      <Contact 
        isOpen={isContactOpen} 
        onClose={() => setIsContactOpen(false)} 
      />
    </>
  );
}