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
import { createBillBoardSchema } from '@/db/schema'
import { useOrigin } from '@/hooks/use-origin'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { TrashIcon } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
	initialData: z.infer<typeof createBillBoardSchema> | null | undefined
}

const formSchema = z.object({
	label: z.string().min(1, 'The label is required'),
	imageUrl: z.string().min(1, 'The image url is required')
})

type BillboardFormValue = z.infer<typeof formSchema>

const BillboardForm = ({ initialData }: Props) => {
	const [open, setOpen] = useState(false)
	const [loading, setLoading] = useState(false)

	const params = useParams()
	const router = useRouter()

	const origin = useOrigin()

	const { storeId } = params

	const title = initialData ? 'Edit Billboard' : 'Create Billboard'
	const description = initialData ? 'Edit a Billboard' : 'Add a new billboard'
	const toastMessage = initialData ? 'Billboard Updated' : 'Billboard Created'
	const action = initialData ? 'Save Changes' : 'Create'

	const form = useForm<BillboardFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: ''
		}
	})

	const onSubmit = async (data: BillboardFormValue) => {
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

	const onDelete = async () => {
		try {
			setLoading(true)

			await axios.delete(`/api/stores/${storeId}`)

			router.refresh()
			router.push('/')

			toast.success('Store deleted successfully')
		} catch (error: any) {
			toast.error(
				"Make sure you've removed all products and categories first"
			)
		} finally {
			setLoading(false)
			setOpen(false)
		}
	}

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						variant={'destructive'}
						disabled={loading}
						size='icon'
						onClick={() => setOpen(true)}
					>
						<TrashIcon className='size-4 ' />
					</Button>
				)}
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
							name='label'
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
						{action}
					</Button>
				</form>
			</Form>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
		</>
	)
}

export default BillboardForm
