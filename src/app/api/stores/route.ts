import { db } from '@/db'
import { store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name } = body

		if (!userId) return new NextResponse('Unauthorized', { status: 401 })

		if (!name) return new NextResponse('Name is required', { status: 400 })

		const [data] = await db
			.insert(store)
			.values({
				name,
				userId
			})
			.returning({ id: store.id, name: store.name })

		return NextResponse.json(data, { status: 201 })
	} catch (error: any) {
		console.log('[STORE_POST]', error.message)

		return new NextResponse(error.message, { status: 500 })
	}
}
