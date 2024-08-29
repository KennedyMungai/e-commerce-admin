import { db } from '@/db'
import { store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const SetupLayout = ({ children }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const data = db.query.store.findFirst({
		where: eq(store.id, userId),
		columns: { id: true, name: true }
	})

	if (!data) redirect('/')

	return <div>RootLayout</div>
}

export default SetupLayout
