'use client'

import Modal from '@/components/modal'
import { useStoreModal } from '@/hooks/use-store-modal'

type Props = {}

const StoreModal = () => {
	const { isOpen, onClose } = useStoreModal()

	return (
		<Modal
			title={'Create Store'}
			description={'Add a new store to manage products and categories'}
			isOpen={isOpen}
			onClose={onClose}
		>
			StoreModal
		</Modal>
	)
}

export default StoreModal
