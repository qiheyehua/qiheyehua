
import Navbar from "@/components/Navbar";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs'
export const metadata = {
  title: 'Qiheyehua website |七禾页话',
  description: 'Full Stack Developer Portfolio',
  icons: {
    icon: '/favicon1.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider >
    <html lang="zh-CN">
      <body>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
    </ClerkProvider>
  );
}
