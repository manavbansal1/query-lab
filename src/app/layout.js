import 'bootstrap/dist/css/bootstrap.min.css';
import './globals.css';
import Script from 'next/script';
import ClientLayout from '@/components/ClientLayout';

export const metadata = {
  title: 'QueryLab',
  description: 'Test SQL and MongoDB queries without installation',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Script 
          src="https://sql.js.org/dist/sql-wasm.js"
          strategy="beforeInteractive"
        />
        
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}