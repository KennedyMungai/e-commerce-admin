import MainNav from '@/components/main-nav'
import { StoreSwitcher } from '@/components/store-switcher'
import { db } from '@/db'
import { Store } from '@/db/schema'
import { UserButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'

const NavBar = async () => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	const stores = await db.query.Store.findMany({
		where: eq(Store.userId, userId)
	})

	return (
		<div className='border-b'>
			<div className='flex h-16 items-center px-4'>
				<StoreSwitcher items={stores} />
				<MainNav className='mx-6' />
				<div className='ml-auto flex space-x-4'>
					<UserButton />
				</div>
			</div>
		</div>
	)
}

export default NavBar
