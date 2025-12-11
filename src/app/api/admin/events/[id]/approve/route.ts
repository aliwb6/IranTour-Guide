import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const session = await auth()

    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const event = await prisma.event.update({
      where: { id },
      data: {
        status: 'APPROVED',
        approvedAt: new Date()
      }
    })

    return NextResponse.json(event)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to approve event' },
      { status: 500 }
    )
  }
}
