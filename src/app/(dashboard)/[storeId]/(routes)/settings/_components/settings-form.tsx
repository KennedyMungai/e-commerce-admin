'use client'

import { createStoreSchema } from '@/db/schema'
import { z } from 'zod'
import Heading from '@/components/heading'

type Props = {
	initialData: z.infer<typeof createStoreSchema>
}

const SettingsForm = ({ initialData }: Props) => {
	return (
		<div className='flex items-center justify-between'>
			<Heading title='Settings' description='Manage store preferences' />
		</div>
	)
}

export default SettingsForm
