import './globals.css'
import { Inter } from 'next/font/google'
import {Toast, ToastProviderContainer} from "~/components/global/toast";

const inter = Inter({ subsets: ['latin'] })

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function RootLayout({children}: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className={classNames(inter.className, ' min-h-screen bg-white')}>
        <ToastProviderContainer>
          {children}
          <Toast />
        </ToastProviderContainer>
      </body>
    </html>
  )
}
