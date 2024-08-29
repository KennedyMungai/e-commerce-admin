import { db } from '@/db'
import { Store } from '@/db/schema'
import { eq } from 'drizzle-orm'

type Props = {
	params: {
		storeId: string
	}
}

const DashboardPage = async ({ params: { storeId } }: Props) => {
	const data = await db.query.Store.findFirst({
		where: eq(Store.id, storeId)
	})

	return <div>Active Store: {data?.name}</div>
}

export default DashboardPage
