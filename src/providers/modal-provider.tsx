'use client'

import StoreModal from '@/modals/store-modal'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {
		setIsLoaded(true)
	}, [])

	if (!isLoaded) return

	return (
		<>
			<StoreModal />
		</>
	)
}

export default ModalProvider
