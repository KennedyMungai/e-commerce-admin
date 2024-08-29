import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ModalProvider from '@/providers/modal-provider'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Admin Dashboard',
	description: 'The administrative dashboard for your ecommerce store.'
}

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<ClerkProvider>
			<html lang='en'>
				<body className={inter.className}>
					<Toaster />
					<ModalProvider />
					{children}
				</body>
			</html>
		</ClerkProvider>
	)
}
