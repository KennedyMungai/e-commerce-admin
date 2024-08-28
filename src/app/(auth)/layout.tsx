import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className='h-full grid grid-cols-2'>
			<div className='flex flex-col justify-center items-center gap-y-4'>
				<Image
					src={'/logo.svg'}
					alt={'logo'}
					width={200}
					height={200}
				/>
				<p className='font-semibold text-3xl text-indigo-600'>
					E-Commerce
				</p>
			</div>
			<div className='flex items-center justify-center bg-indigo-600'>
				{children}
			</div>
		</div>
	)
}

export default AuthLayout
