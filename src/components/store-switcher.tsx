'use client'

import { PopoverTrigger } from '@/components/ui/popover'
import { createStoreSchema } from '@/db/schema'
import { useStoreModal } from '@/hooks/use-store-modal'
import { useParams, useRouter } from 'next/navigation'
import { ComponentPropsWithRef } from 'react'
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

	const formattedItems = items.map((item) => ({
		label: item.name,
		value: item.id
	}))

	const currentStore = formattedItems.find(
		(item) => item.value === params.storeId
	)

	return <div>Store Switcher</div>
}
