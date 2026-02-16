export const metadata = {
  title: "Bus Transport System",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="p-6">
        {children}
      </body>
    </html>
  );
}
