import "./globals.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Script from 'next/script';

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
        {children}
      </body>
    </html>
  );
}


