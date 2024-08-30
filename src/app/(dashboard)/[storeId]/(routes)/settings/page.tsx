import { db } from '@/db'
import { Store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import SettingsForm from './_components/settings-form'

type Props = {
	params: {
		storeId: string
	}
}

const StoreSettings = async ({ params: { storeId } }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const store = await db.query.Store.findFirst({
		where: and(eq(Store.id, storeId), eq(Store.userId, userId))
	})

	if (!store) redirect('/')

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<SettingsForm initialData={store} />
			</div>
		</div>
	)
}

export default StoreSettings
