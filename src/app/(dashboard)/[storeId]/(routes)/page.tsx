import { db } from '@/db'
import { store } from '@/db/schema'
import { eq } from 'drizzle-orm'

type Props = {
	params: {
		storeId: string
	}
}

const DashboardPage = async ({ params: { storeId } }: Props) => {
	const data = await db.query.store.findFirst({
		where: eq(store.id, storeId)
	})

	return <div>Active Store: {data?.name}</div>
}

export default DashboardPage
