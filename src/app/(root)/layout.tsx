import { db } from '@/db'
import { Store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const SetupLayout = async ({ children }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const data = await db.query.Store.findFirst({
		where: eq(Store.userId, userId),
		columns: { id: true, name: true }
	})

	if (data) redirect(`/${data.id}`)

	return <>{children}</>
}

export default SetupLayout
