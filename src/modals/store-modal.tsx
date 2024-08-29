'use client'

import Modal from '@/components/modal'
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
import { useStoreModal } from '@/hooks/use-store-modal'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import axios from 'axios'
import { toast } from 'sonner'

const formSchema = z.object({
	name: z.string().min(1, 'The name is a required property')
})

const StoreModal = () => {
	const { isOpen, onClose } = useStoreModal()

	const [loading, setLoading] = useState(false)

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: ''
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		try {
			setLoading(true)

			const response = axios.post('/api/stores', values)

			toast.success('Store created successfully')
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			form.reset()

			setLoading(false)
		}
	}

	return (
		<Modal
			title={'Create Store'}
			description={'Add a new store to manage products and categories'}
			isOpen={isOpen}
			onClose={onClose}
		>
			<div>
				<div className='space-y-4 py-2 pb-4'>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<FormField
								control={form.control}
								name='name'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Name</FormLabel>
										<FormControl>
											<Input
												{...field}
												disabled={loading}
												placeholder='e.g. Clothes Store'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className='pt-6 space-x-2 flex items-center justify-end w-full'>
								<Button
									variant={'outline'}
									onClick={onClose}
									disabled={loading}
								>
									Cancel
								</Button>
								<Button type='submit' disabled={loading}>
									Continue
								</Button>
							</div>
						</form>
					</Form>
				</div>
			</div>
		</Modal>
	)
}

export default StoreModal
