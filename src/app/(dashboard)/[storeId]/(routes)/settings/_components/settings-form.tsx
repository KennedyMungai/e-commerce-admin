'use client'

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
import { TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
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

	const form = useForm<SettingsFormValue>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: initialData.name
		}
	})

	const onSubmit = (data: SettingsFormValue) => console.log(data)

	return (
		<>
			<div className='flex items-center justify-between'>
				<Heading
					title='Settings'
					description='Manage store preferences'
				/>
				<Button variant={'destructive'} size='icon' onClick={() => {}}>
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
										<Input disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='name'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={loading} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
				</form>
			</Form>
		</>
	)
}

export default SettingsForm
