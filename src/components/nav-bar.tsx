import { UserButton } from '@clerk/nextjs'

type Props = {}

const NavBar = () => {
	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<div>This will be a store switcher</div>
				<div>This will be the routes</div>
				<div className='ml-auto flex space-x-4'>
					<UserButton />
				</div>
			</div>
		</div>
	)
}

export default NavBar
