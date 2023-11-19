import './globals.css'
import { Inter } from 'next/font/google'
import {Toast, ToastProviderContainer} from "~/components/global/toast";

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <div className="bg-white h-screen">
          <ToastProviderContainer>
            {children}
            <Toast />
          </ToastProviderContainer>
        </div>
      </body>
    </html>
  )
}
