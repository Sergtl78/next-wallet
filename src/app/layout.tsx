import AppProviders from '@/components/providers/AppProviders'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Wallet MetaMask Next App',
  description: 'Wallet MetaMask Next App',
  icons: {
    icon: 'favicon.ico'
  }
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
