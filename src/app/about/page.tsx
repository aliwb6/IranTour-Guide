// src/app/about/page.tsx

import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="kashi-star-pattern py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-black text-yellow-100 mb-6 drop-shadow-lg">
            درباره IranTour Guide
          </h1>
          <p className="text-xl text-yellow-50 font-bold leading-relaxed drop-shadow">
            راهنمای جامع رویدادهای فرهنگی، مذهبی، هنری و گردشگری ایران
          </p>
        </div>
      </section>

      {/* محتوا */}
      <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* ماموریت */}
        <section className="kashi-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-6 text-center">
            🎯 ماموریت ما
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed font-bold text-center max-w-3xl mx-auto">
            هدف ما معرفی و ترویج فرهنگ غنی ایران از طریق ارائه اطلاعات جامع و به‌روز
            درباره رویدادهای فرهنگی، هنری، مذهبی و گردشگری در سراسر کشور است. ما می‌خواهیم
            پلی باشیم بین گردشگران و میراث فرهنگی ایران.
          </p>
        </section>

        {/* ویژگی‌ها */}
        <section>
          <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-8 text-center">
            ✨ ویژگی‌های ما
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                icon: '🎭',
                title: 'رویدادهای متنوع',
                desc: 'از جشن‌های ملی تا رویدادهای هنری و مذهبی',
              },
              {
                icon: '🗺️',
                title: 'پوشش کامل',
                desc: 'رویدادها در 31 شهر ایران',
              },
              {
                icon: '📅',
                title: 'تقویم هوشمند',
                desc: 'برنامه‌ریزی آسان سفر با تقویم رویدادها',
              },
              {
                icon: '📱',
                title: 'دسترسی آسان',
                desc: 'طراحی ریسپانسیو برای موبایل و تبلت',
              },
              {
                icon: '🔍',
                title: 'جستجوی پیشرفته',
                desc: 'فیلترهای دقیق بر اساس شهر، نوع و تاریخ',
              },
              {
                icon: '🎨',
                title: 'رابط کاربری زیبا',
                desc: 'طراحی مدرن با الهام از هنر ایرانی',
              },
            ].map((feature, index) => (
              <div key={index} className="kashi-card p-6 text-center">
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-black text-red-900 mb-2">{feature.title}</h3>
                <p className="text-gray-700 font-bold">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* آمار */}
        <section className="kashi-card p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-black text-red-900 mb-8 text-center">
            📊 آمار پلتفرم
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: '500+', label: 'رویداد فرهنگی' },
              { number: '31', label: 'شهر ایران' },
              { number: '12', label: 'دسته‌بندی' },
              { number: '10k+', label: 'بازدید ماهانه' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-4xl md:text-5xl font-black text-red-900 mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-700 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* تماس */}
        <section className="text-center kashi-card p-8 md:p-12">
          <h2 className="text-3xl font-black text-red-900 mb-6">
            📞 با ما در تماس باشید
          </h2>
          <p className="text-lg text-gray-700 font-bold mb-8">
            سوال، پیشنهاد یا انتقاد دارید؟ دوست داریم از شما بشنویم!
          </p>
          <Link href="/contact" className="deep-persian-btn px-10 py-4 font-black inline-block">
            تماس با ما ←
          </Link>
        </section>
      </div>
    </div>
  )
}
