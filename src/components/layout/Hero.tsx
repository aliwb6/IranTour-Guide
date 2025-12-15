'use client'

import React from 'react'
import { Search } from 'lucide-react'

export const Hero: React.FC = () => {
  return (
    <section className="deep-carpet-bg py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <div className="float">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 text-yellow-200 drop-shadow-2xl leading-tight">
            رویدادهای ایران
            <br />
            <span className="text-yellow-100">۱۴۰۴-۱۴۰۵</span>
          </h1>
        </div>

        <p className="text-lg md:text-2xl text-yellow-50 mb-12 drop-shadow-lg max-w-3xl mx-auto leading-relaxed font-bold">
          🌹 کشف فرهنگ، هنر و جشن‌های اصیل ایرانی 🌹
        </p>

        {/* SEARCH */}
        <div className="kashi-search max-w-3xl mx-auto p-3 md:p-4 flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex-1 flex items-center gap-3 px-4 py-2 md:py-0">
            <Search className="w-6 h-6 text-red-900" />
            <input
              type="text"
              placeholder="جستجوی رویداد، شهر، موضوع..."
              className="flex-1 outline-none text-base md:text-lg font-bold bg-transparent text-gray-800 placeholder-gray-600"
            />
          </div>
          <button className="deep-persian-btn px-8 py-3 md:py-3.5 font-black text-base md:text-lg">
            🔍 جستجو
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-12 md:mt-16">
          <div className="tile-stats p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
              ۲۵۰+
            </div>
            <div className="text-xs md:text-base font-bold text-gray-800">رویداد فعال</div>
          </div>
          <div className="tile-stats p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
              ۳۱
            </div>
            <div className="text-xs md:text-base font-bold text-gray-800">استان</div>
          </div>
          <div className="tile-stats p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
              ۱۵+
            </div>
            <div className="text-xs md:text-base font-bold text-gray-800">موضوع</div>
          </div>
          <div className="tile-stats p-4 md:p-8 text-center">
            <div className="text-3xl md:text-5xl font-black bg-gradient-to-br from-red-900 to-red-700 bg-clip-text text-transparent mb-2">
              ۱۰۰K+
            </div>
            <div className="text-xs md:text-base font-bold text-gray-800">بازدید ماهانه</div>
          </div>
        </div>
      </div>
    </section>
  )
}
