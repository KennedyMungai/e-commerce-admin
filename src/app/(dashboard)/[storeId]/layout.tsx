import { db } from '@/db'
import { store } from '@/db/schema'
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

const DashboardLayout = ({ children, params: { storeId } }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const data = db.query.store.findFirst({
		where: eq(store.id, storeId),
		columns: { id: true, name: true }
	})

	const id = data.then((data) => data?.id)

	if (id) redirect(`/${id}`)

	return (
		<>
			<div>This will be a navbar</div>
			<div>{children}</div>
		</>
	)
}

export default DashboardLayout
