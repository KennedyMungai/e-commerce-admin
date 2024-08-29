import NavBar from '@/components/nav-bar'
import { db } from '@/db'
import { Store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
	params: {
		storeId: string
	}
}

const DashboardLayout = async ({ children, params: { storeId } }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const data = await db.query.Store.findFirst({
		where: eq(Store.id, storeId),
		columns: { id: true, name: true }
	})

	if (!data) redirect('/')

	return (
		<>
			<NavBar />
			<div>{children}</div>
		</>
	)
}

export default DashboardLayout
