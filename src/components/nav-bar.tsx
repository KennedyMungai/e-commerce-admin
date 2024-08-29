import MainNav from '@/components/main-nav'
import { StoreSwitcher } from '@/components/store-switcher'
import { UserButton } from '@clerk/nextjs'

type Props = {}

const NavBar = () => {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher />
				<MainNav className='mx-6' />
				<div className='ml-auto flex space-x-4'>
					<UserButton />
				</div>
			</div>
		</div>
	)
}

export default NavBar
