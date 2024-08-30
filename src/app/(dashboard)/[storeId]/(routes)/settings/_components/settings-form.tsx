'use client'

import AlertModal from '@/components/alert-modal'
import Heading from '@/components/heading'
import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { createStoreSchema } from '@/db/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { TrashIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
	initialData: z.infer<typeof createStoreSchema>
}

const formSchema = z.object({
	name: z.string().min(1, 'The name is required')
})

type SettingsFormValue = z.infer<typeof formSchema>

const SettingsForm = ({ initialData }: Props) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const params = useParams()
	const router = useRouter()

	const { storeId } = params

	const form = useForm<SettingsFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData
	})

	const onSubmit = async (data: SettingsFormValue) => {
		try {
			setLoading(true)

			await axios.patch(`/api/stores/${storeId}`, data)

			router.refresh()

			toast.success('Store updated')
		} catch (error: any) {
			toast.error(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Settings'
					description='Manage store preferences'
				/>
				<Button
					variant={'destructive'}
					disabled={loading}
					size='icon'
					onClick={() => setOpen(true)}
				>
					<TrashIcon className='size-4 ' />
				</Button>
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'
				>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input
											placeholder='Store Name'
											disabled={loading}
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button
						type='submit'
						disabled={loading}
						className='ml-auto'
					>
						Save Changes
					</Button>
				</form>
			</Form>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={() => {}}
				loading={loading}
			/>
		</>
	)
}

export default SettingsForm
