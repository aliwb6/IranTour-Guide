import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'خانه | IranTour Guide',
  description: 'کشف و تجربه بهترین رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران',
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            رویدادهای ایران ۲۰۲۵–۲۰۲۶
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl">
            کشف و تجربه فرهنگ، هنر و جشن‌های ایران
          </p>
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl bg-white rounded-lg p-2 shadow-lg">
            <input
              type="text"
              placeholder="جستجوی رویداد، شهر یا موضوع..."
              className="w-full px-4 py-3 text-gray-900 rounded-md focus:outline-none"
            />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 w-full max-w-4xl">
            <div className="text-center">
              <div className="text-4xl font-bold">۱۰۰۰+</div>
              <div className="text-sm mt-2">رویداد ثبت شده</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">۵۰+</div>
              <div className="text-sm mt-2">شهر</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">۱۵+</div>
              <div className="text-sm mt-2">موضوع</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold">۱۰۰K+</div>
              <div className="text-sm mt-2">بازدید ماهانه</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">رویدادهای ویژه</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Event cards will go here */}
          <div className="bg-card rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="bg-gray-200 h-48 rounded-md mb-4"></div>
            <h3 className="font-bold text-xl mb-2">جشنواره فیلم فجر</h3>
            <p className="text-muted-foreground mb-4">تهران • ۱۵ تا ۲۵ بهمن ۱۴۰۴</p>
            <div className="flex gap-2">
              <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                هنری
              </span>
              <span className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-sm">
                فرهنگی
              </span>
            </div>
          </div>
          {/* Add more event cards */}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">موضوعات محبوب</h2>
          <div className="flex flex-wrap gap-3">
            {['نوروز', 'مراسم مذهبی', 'جشنواره‌های فرهنگی', 'سینما و فیلم', 'طبیعت‌گردی', 'رویدادهای علمی', 'محرم و عاشورا', 'شب یلدا'].map(
              (tag) => (
                <button
                  key={tag}
                  className="px-4 py-2 bg-white hover:bg-primary hover:text-white transition-colors rounded-full shadow-sm"
                >
                  {tag}
                </button>
              )
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">رویداد خود را ثبت کنید</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          سازمان یا برگزارکننده رویداد هستید؟ رویداد خود را به صورت رایگان ثبت کنید
        </p>
        <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
          افزودن رویداد
        </button>
      </section>
    </div>
  )
}