import { db } from '@/db'
import { BillBoard } from '@/db/schema'
import { eq } from 'drizzle-orm'
import BillboardForm from './_components/billboard-form'

type Props = {
	params: {
		billboardId: string
	}
}

const BillboardPage = async ({ params: { billboardId } }: Props) => {
	let data

	if (billboardId === 'new') {
		data = null
	} else {
		data = await db.query.BillBoard.findFirst({
			where: eq(BillBoard.id, billboardId)
		})
	}

	return (
		<div className='flex flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<BillboardForm initialData={data} />
			</div>
		</div>
	)
}

export default BillboardPage
