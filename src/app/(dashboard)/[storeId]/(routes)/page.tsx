import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

type Props = {
	params: {
		storeId: string
	}
}

const DashboardPage = ({ params: { storeId } }: Props) => {
	const { userId } = auth()

	if (!userId) redirect('/sign-in')

	return <div>StorePage</div>
}

export default DashboardPage
