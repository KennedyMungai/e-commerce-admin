'use client'

import { Button } from '@/components/ui/button'
import { ImagePlus, Trash2Icon } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { useEffect, useState } from 'react'

type Props = {
	disabled?: boolean
	onChange: (value: string) => void
	onRemove: (value: string) => void
	value: string[]
}

const ImageUpload = ({ onChange, onRemove, disabled, value }: Props) => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	const onUpload = (result: any) => {
		onChange(result.info.secure_url)
	}

	if (!isMounted) return null

	return (
		<div>
			<div className='mb-4 flex items-center gap-4'>
				{value.map((url) => (
					<div
						key={url}
						className='relative w-[200px] h-[200px] rounded-md overflow-hidden'
					>
						<div className='z-10 absolute top-2 right-2'>
							<Button
								variant={'ghost'}
								className='text-red-500'
								onClick={() => onRemove(url)}
								size='icon'
								type='button'
							>
								<Trash2Icon className='size-4' />
							</Button>
						</div>
						<Image
							src={url}
							alt={url}
							fill
							className='object-cover'
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset='uvakehqe'>
				{({ open }) => {
					const onClick = () => open()

					return (
						<Button
							type='button'
							disabled={disabled}
							variant={'secondary'}
							onClick={onClick}
						>
							<ImagePlus className='size-4 mr-2' />
							Upload an image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
