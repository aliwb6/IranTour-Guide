import { NextRequest, NextResponse } from 'next/server'
import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { formSchema, suggestionSchema } from '@/lib/validators/aiSuggestion'
import { mockEvents } from '@/lib/mock-data/events'

// Helper to format Persian date
function formatPersianDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('fa-IR')
}

// Store suggestions in memory (in production, use database)
const suggestions = new Map<string, any>()

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate input
    const validatedData = formSchema.parse(body)

    // Filter events based on user criteria
    const relevantEvents = mockEvents.filter((event) => {
      // Check if event city matches user's selected cities
      const cityMatch = validatedData.cities.includes(event.city)

      // Check if event dates overlap with travel dates
      const eventStart = new Date(event.startDate)
      const eventEnd = new Date(event.endDate)
      const travelStart = new Date(validatedData.startDate)
      const travelEnd = new Date(validatedData.endDate)

      const dateMatch =
        (eventStart >= travelStart && eventStart <= travelEnd) ||
        (eventEnd >= travelStart && eventEnd <= travelEnd) ||
        (eventStart <= travelStart && eventEnd >= travelEnd)

      return cityMatch && dateMatch
    })

    console.log(`Found ${relevantEvents.length} relevant events for user criteria`)

    // If no events found, return error
    if (relevantEvents.length === 0) {
      return NextResponse.json(
        {
          error:
            'متأسفانه رویدادی در بازه زمانی و شهرهای انتخابی شما یافت نشد. لطفاً تاریخ یا شهرهای دیگری را امتحان کنید.',
        },
        { status: 404 }
      )
    }

    // Build AI prompt
    const eventsDescription = relevantEvents
      .map(
        (e, idx) => `
${idx + 1}. عنوان: ${e.title}
   شناسه: ${e.id}
   نوع: ${e.type}
   شهر: ${e.city}
   تاریخ: ${e.startDate} تا ${e.endDate}
   توضیحات: ${e.shortDescription}
`
      )
      .join('\n')

    const prompt = `
شما یک مشاور سفر هوشمند هستید که برای سیستم IranTour-Guide کار می‌کنید.

اطلاعات کاربر:
- نام: ${validatedData.fullName}
- درباره خودش: ${validatedData.bio}
- علایق: ${validatedData.interests.join('، ')}
- تاریخ سفر: ${formatPersianDate(validatedData.startDate)} تا ${formatPersianDate(validatedData.endDate)}
- شهرهای مقصد: ${validatedData.cities.join('، ')}
${validatedData.budget ? `- بودجه: ${validatedData.budget}` : ''}
${validatedData.age ? `- سن: ${validatedData.age}` : ''}

رویدادهای موجود:
${eventsDescription}

وظایف شما:
1. از بین رویدادهای بالا، حداکثر 8 رویداد مرتبط را انتخاب کنید
2. برای هر رویداد، یک امتیاز ارتباط (relevanceScore) بین 0 تا 100 بدهید
3. برای هر رویداد، یک دلیل انتخاب به فارسی بنویسید (چرا این رویداد برای این کاربر مناسب است)
4. یک برنامه سفر روز به روز (itinerary) ایجاد کنید
5. یک خلاصه کلی از سفر بنویسید
6. چند نکته مفید سفر (tips) به فارسی بدهید

نکات مهم:
- رویدادهایی را انتخاب کنید که با علایق کاربر همخوانی دارند
- دلایل باید شخصی‌سازی شده و مرتبط با bio و علایق کاربر باشند
- برنامه سفر باید واقع‌بینانه و قابل اجرا باشد
- نکات سفر باید کاربردی و مفید باشند
- از شناسه‌های (id) دقیق رویدادها استفاده کنید

پاسخ را به صورت JSON ارائه دهید.
`

    console.log('Calling OpenAI API...')

    // Call OpenAI API
    // Note: For this demo, we'll create mock data since we don't have OpenAI API key
    // In production, uncomment the real API call below

    /*
    const result = await generateObject({
      model: openai('gpt-4-turbo'),
      schema: suggestionSchema,
      prompt: prompt,
    })

    const aiSuggestions = result.object
    */

    // MOCK DATA for demo (remove in production)
    const aiSuggestions = {
      suggestedEvents: relevantEvents.slice(0, 8).map((event, idx) => ({
        eventId: event.id,
        relevanceScore: 95 - idx * 5,
        reason: `این رویداد با توجه به علاقه شما به ${validatedData.interests[0]} و ${validatedData.interests[1] || 'فرهنگ ایرانی'} بسیار مناسب است. ${event.title} فرصتی عالی برای تجربه ${event.type} در ${event.city} خواهد بود.`,
      })),
      itinerary: [
        {
          day: 1,
          date: formatPersianDate(validatedData.startDate),
          city: validatedData.cities[0],
          morning: `صبح با صبحانه محلی در ${validatedData.cities[0]} شروع کنید و از بازار سنتی بازدید کنید.`,
          afternoon: `بعدازظهر به بازدید از جاذبه‌های تاریخی ${validatedData.cities[0]} بپردازید.`,
          evening: `عصر در اولین رویداد پیشنهادی شرکت کنید.`,
          events: [relevantEvents[0]?.id].filter(Boolean),
        },
        {
          day: 2,
          date: formatPersianDate(
            new Date(new Date(validatedData.startDate).getTime() + 86400000).toISOString()
          ),
          city: validatedData.cities[0],
          morning: `صبح با گردش در پارک‌های شهر شروع کنید.`,
          afternoon: `بعدازظهر از موزه‌ها و گالری‌های هنری بازدید کنید.`,
          evening: `شب را با شرکت در رویداد فرهنگی به پایان برسانید.`,
          events: [relevantEvents[1]?.id].filter(Boolean),
        },
      ],
      summary: `${validatedData.fullName} عزیز، برای سفر ${relevantEvents.length > 0 ? `${Math.ceil((new Date(validatedData.endDate).getTime() - new Date(validatedData.startDate).getTime()) / 86400000)} روزه` : ''} شما به ${validatedData.cities.join(' و ')}، ${relevantEvents.length} رویداد فوق‌العاده پیدا کردیم که کاملاً با علایق شما همخوانی دارد!`,
      tips: [
        `هوای ${validatedData.cities[0]} در این فصل معتدل است. لباس‌های راحت همراه داشته باشید.`,
        `حتماً از غذاهای محلی ${validatedData.cities[0]} مثل ${validatedData.cities[0] === 'اصفهان' ? 'بریانی و گز' : validatedData.cities[0] === 'شیراز' ? 'کلام پلو' : 'چلوکباب'} بچشید.`,
        `برای جابجایی در شهر، استفاده از تاکسی اینترنتی یا مترو (در صورت وجود) توصیه می‌شود.`,
        `بلیط رویدادها را از قبل رزرو کنید تا جای خالی داشته باشد.`,
        `یک دوربین یا موبایل با دوربین خوب برای ثبت لحظات همراه داشته باشید.`,
      ],
    }

    // Map event IDs to full event objects
    const suggestionsWithEvents = aiSuggestions.suggestedEvents
      .map((s) => {
        const event = relevantEvents.find((e) => e.id === s.eventId)
        return {
          event,
          relevanceScore: s.relevanceScore,
          reason: s.reason,
        }
      })
      .filter((s) => s.event) // Remove any that don't have events

    // Map itinerary event IDs to full event objects
    const itineraryWithEvents = aiSuggestions.itinerary.map((day) => ({
      ...day,
      events: day.events
        .map((eventId) => relevantEvents.find((e) => e.id === eventId))
        .filter(Boolean),
    }))

    // Generate unique ID for this suggestion
    const suggestionId = `suggestion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Store suggestion
    const suggestionData = {
      id: suggestionId,
      userName: validatedData.fullName,
      email: validatedData.email,
      summary: aiSuggestions.summary,
      suggestions: suggestionsWithEvents,
      itinerary: itineraryWithEvents,
      tips: aiSuggestions.tips,
      createdAt: new Date().toISOString(),
    }

    suggestions.set(suggestionId, suggestionData)

    console.log(`Suggestion created with ID: ${suggestionId}`)

    return NextResponse.json({
      success: true,
      id: suggestionId,
      message: 'پیشنهادات با موفقیت ایجاد شد',
    })
  } catch (error: any) {
    console.error('AI Suggestion error:', error)

    if (error.name === 'ZodError') {
      return NextResponse.json(
        {
          error: 'داده‌های ورودی نامعتبر است',
          details: error.errors,
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        error: error.message || 'خطا در ایجاد پیشنهادات. لطفاً دوباره تلاش کنید',
      },
      { status: 500 }
    )
  }
}

// Get suggestion by ID
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'شناسه الزامی است' }, { status: 400 })
    }

    const suggestion = suggestions.get(id)

    if (!suggestion) {
      return NextResponse.json({ error: 'پیشنهادی با این شناسه یافت نشد' }, { status: 404 })
    }

    return NextResponse.json(suggestion)
  } catch (error: any) {
    console.error('Get suggestion error:', error)
    return NextResponse.json({ error: 'خطا در دریافت پیشنهادات' }, { status: 500 })
  }
}
