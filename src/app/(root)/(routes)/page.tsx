'use client'

import { useStoreModal } from '@/hooks/use-store-modal'
import { useEffect } from 'react'

const SetupPage = () => {
	const { onOpen, isOpen } = useStoreModal()

	useEffect(() => {
		if (!isOpen) onOpen()
	}, [isOpen, onOpen])

	return <div className='p-4'>Home Page</div>
}

export default SetupPage
