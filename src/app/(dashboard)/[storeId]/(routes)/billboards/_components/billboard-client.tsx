'use client'

import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { PlusIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

type Props = {}

const BillboardClient = () => {
	const router = useRouter()
	const params = useParams()

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title={'Billboards (0)'}
					description={'Manage Billboards for your store'}
				/>
				<Button
					onClick={() =>
						router.push(`/${params.storeId}/billboards/new`)
					}
				>
					<PlusIcon className='size-4 mr-2' />
					Add New
				</Button>
			</div>
			<Separator />
		</>
	)
}

export default BillboardClient
