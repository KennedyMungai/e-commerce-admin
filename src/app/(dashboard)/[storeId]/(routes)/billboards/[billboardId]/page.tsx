import { db } from '@/db'
import { BillBoard } from '@/db/schema'
import { eq } from 'drizzle-orm'

type Props = {
	params: {
		billboardId: string
	}
}

const BillboardPage = async ({ params: { billboardId } }: Props) => {
	const billboard = await db.query.BillBoard.findFirst({
		where: eq(BillBoard.id, billboardId)
	})

	return <div>Existing Billboard: {billboard?.label}</div>
}

export default BillboardPage
