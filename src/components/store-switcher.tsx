'use client'

import { Button } from '@/components/ui/button'
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command'
import {
	Popover,
	PopoverContent,
	PopoverTrigger
} from '@/components/ui/popover'
import { createStoreSchema } from '@/db/schema'
import { useStoreModal } from '@/hooks/use-store-modal'
import { cn } from '@/lib/utils'
import {
	CheckIcon,
	ChevronsUpDownIcon,
	PlusCircleIcon,
	StoreIcon
} from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { ComponentPropsWithRef, useState } from 'react'
import { z } from 'zod'

type PopoverTriggerProps = ComponentPropsWithRef<typeof PopoverTrigger>

interface StoreSwitcherProps extends PopoverTriggerProps {
	items: z.infer<typeof createStoreSchema>[]
}

export const StoreSwitcher = ({
	className,
	items = []
}: StoreSwitcherProps) => {
	const { isOpen, onOpen, onClose } = useStoreModal()

	const params = useParams()
	const router = useRouter()

	const [open, setOpen] = useState(false)

	const formattedItems = items.map((item) => ({
		label: item.name!,
		value: item.id!
	}))

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	)

	const onStoreSelect = (store: { label: string; value: string }) => {
		setOpen(false)

		router.push(`/${store.value}`)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant={'outline'}
					size={'sm'}
					role='combobox'
					aria-expanded={open}
					aria-label='Select a store'
					className={cn('w-[200px] justify-between', className)}
				>
					<StoreIcon className='mr-2 size-4' />
					{currentStore?.label}
					<ChevronsUpDownIcon className='size-4 ml-auto shrink-0 opacity-50' />
				</Button>
			</PopoverTrigger>
			<PopoverContent className='w-[200px] p-0'>
				<Command>
					<CommandList>
						<CommandInput
							placeholder='Search store...'
							className=''
						/>
						<CommandEmpty>No store found</CommandEmpty>
						<CommandGroup heading='Stores'>
							{formattedItems.map((store) => (
								<CommandItem
									key={store.value}
									onSelect={() => onStoreSelect(store)}
									className='text-sm'
								>
									<StoreIcon className='mr-2 size-4' />
									{store.label}
									<CheckIcon
										className={cn(
											'size-4 ml-auto',
											currentStore?.value === store.value
												? 'opacity-100'
												: 'opacity-0'
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
					<CommandSeparator />
					<CommandList>
						<CommandGroup>
							<CommandItem
								onSelect={() => {
									setOpen(false)
									onOpen()
								}}
							>
								<PlusCircleIcon className='size-5 mr-2' />
								Create Store
							</CommandItem>
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	)
}
