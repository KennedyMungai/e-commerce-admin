import { db } from '@/db'
import { Store } from '@/db/schema'
import { auth } from '@clerk/nextjs/server'
import { and, eq } from 'drizzle-orm'
import { NextResponse } from 'next/server'

export const PATCH = async (
	req: Request,
	{ params }: { params: { storeId: string } }
) => {
	try {
		const { userId } = auth()
		const body = await req.json()

		const { name } = body

		if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

		if (!name) return new NextResponse('Name is required', { status: 400 })

		if (!params.storeId)
			return new NextResponse('Store ID is required', { status: 400 })

		const [store] = await db
			.update(Store)
			.set({ name })
			.where(and(eq(Store.id, params.storeId), eq(Store.userId, userId)))
			.returning({ id: Store.id, name: Store.name })

		return NextResponse.json(store, { status: 202 })
	} catch (error: any) {
		console.log('[STORE_PATCH]', error.message)
		return new NextResponse('Internal Error', { status: 500 })
	}
}

export const DELETE = async (
	_req: Request,
	{ params }: { params: { storeId: string } }
) => {
	try {
		const { userId } = auth()
		if (!userId) return new NextResponse('Unauthenticated', { status: 401 })

		if (!params.storeId)
			return new NextResponse('Store ID is required', { status: 400 })

		const [store] = await db
			.delete(Store)
			.where(and(eq(Store.id, params.storeId), eq(Store.userId, userId)))
			.returning({ id: Store.id, name: Store.name })

		return NextResponse.json(store)
	} catch (error: any) {
		console.log('[STORE_DELETE]', error.message)
		return new NextResponse('Internal Error', { status: 500 })
	}
}
