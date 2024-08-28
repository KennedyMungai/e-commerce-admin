import Image from 'next/image'
import { ReactNode } from 'react'

type Props = {
	children: ReactNode
}

const AuthLayout = ({ children }: Props) => {
	return (
		<div className='h-full grid grid-cols-2'>
			<div className='flex justify-center items-center'>
				<Image
					src={'/logo.png'}
					alt={'logo'}
					width={200}
					height={200}
				/>
			</div>
			<div className='flex items-center justify-center'>{children}</div>
		</div>
	)
}

export default AuthLayout
