import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory storage (in production, use a database)
const subscribers = new Set<string>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'ایمیل الزامی است' }, { status: 400 })
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'فرمت ایمیل صحیح نیست' }, { status: 400 })
    }

    // Check if already subscribed
    if (subscribers.has(email.toLowerCase())) {
      return NextResponse.json({ error: 'این ایمیل قبلاً ثبت شده است' }, { status: 409 })
    }

    // Add to subscribers
    subscribers.add(email.toLowerCase())

    // Log subscription (in production, save to database)
    console.log(`New newsletter subscription: ${email}`)
    console.log(`Total subscribers: ${subscribers.size}`)

    // TODO: Send confirmation email
    // TODO: Add to email marketing service (e.g., Mailchimp, SendGrid)

    return NextResponse.json(
      {
        success: true,
        message: 'با موفقیت در خبرنامه عضو شدید',
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Newsletter subscription error:', error)
    return NextResponse.json({ error: 'خطای سرور. لطفاً دوباره تلاش کنید' }, { status: 500 })
  }
}

// Get subscriber count (optional endpoint)
export async function GET() {
  return NextResponse.json({
    count: subscribers.size,
  })
}
