import './globals.css'
import { Inter } from 'next/font/google'

import { Toast, ToastProviderContainer } from '~/components/global/toast'
import { classNames } from '~/utils'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
