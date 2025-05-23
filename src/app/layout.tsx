
import Navbar from "@/components/Navbar";
import "./globals.css";
// app/layout.tsx
import 'easymde/dist/easymde.min.css'
import { zhCN } from '@clerk/localizations'
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
    <ClerkProvider localization={zhCN}   >
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
