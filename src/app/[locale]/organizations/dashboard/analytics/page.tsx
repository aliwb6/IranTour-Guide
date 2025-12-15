'use client'

import React, { useState } from 'react'
import { Calendar, Eye, Bookmark, Share2, TrendingUp, Download } from 'lucide-react'
import { KPICard } from '@/components/dashboard/KPICard'
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart'

// Mock data for demonstration
const viewsOverTimeData = [
  { name: '۱ آذر', value: 120 },
  { name: '۲ آذر', value: 180 },
  { name: '۳ آذر', value: 150 },
  { name: '۴ آذر', value: 220 },
  { name: '۵ آذر', value: 280 },
  { name: '۶ آذر', value: 310 },
  { name: '۷ آذر', value: 290 },
]

const eventsByTypeData = [
  { name: 'جشنواره', value: 15 },
  { name: 'نمایشگاه', value: 12 },
  { name: 'کنفرانس', value: 8 },
  { name: 'ورزشی', value: 5 },
  { name: 'سایر', value: 3 },
]

const eventsByCityData = [
  { name: 'تهران', value: 25 },
  { name: 'اصفهان', value: 10 },
  { name: 'شیراز', value: 8 },
  { name: 'مشهد', value: 6 },
  { name: 'تبریز', value: 4 },
]

const topPerformingEvents = [
  { title: 'جشنواره فیلم فجر', views: 2500, saves: 180, shares: 95 },
  { title: 'نمایشگاه کتاب', views: 1800, saves: 140, shares: 72 },
  { title: 'کنفرانس فناوری', views: 1500, saves: 120, shares: 65 },
  { title: 'جشنواره موسیقی', views: 1200, saves: 95, shares: 48 },
  { title: 'نمایشگاه صنایع دستی', views: 980, saves: 78, shares: 42 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('30')

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">آمار و گزارش‌ها</h1>
          <p className="text-gray-600">تحلیل عملکرد رویدادهای شما</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#D4AF37] text-white rounded-lg hover:bg-[#b8951f] transition-colors font-medium">
          <Download className="w-5 h-5" />
          <span>دانلود گزارش</span>
        </button>
      </div>

      {/* Date Range Filter */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="font-medium text-gray-700">بازه زمانی:</span>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: '7', label: '۷ روز گذشته' },
              { value: '30', label: '۳۰ روز گذشته' },
              { value: '90', label: '۹۰ روز گذشته' },
              { value: 'custom', label: 'سفارشی' },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => setDateRange(option.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  dateRange === option.value
                    ? 'bg-[#A01C1C] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">خلاصه آمار</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KPICard label="رویدادهای فعال" value={23} change="+12%" icon={Calendar} color="blue" />
          <KPICard label="کل بازدیدها" value={8750} change="+18%" icon={Eye} color="green" />
          <KPICard label="ذخیره‌شده" value={613} change="+25%" icon={Bookmark} color="purple" />
          <KPICard label="اشتراک‌گذاری" value={322} change="+15%" icon={Share2} color="orange" />
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Views Over Time */}
        <AnalyticsChart
          type="line"
          data={viewsOverTimeData}
          dataKey="value"
          xAxisKey="name"
          title="روند بازدیدها"
        />

        {/* Events by Type */}
        <AnalyticsChart
          type="pie"
          data={eventsByTypeData}
          dataKey="value"
          xAxisKey="name"
          title="رویدادها بر اساس نوع"
        />

        {/* Events by City */}
        <div className="lg:col-span-2">
          <AnalyticsChart
            type="bar"
            data={eventsByCityData}
            dataKey="value"
            xAxisKey="name"
            title="رویدادها بر اساس شهر"
          />
        </div>
      </div>

      {/* Top Performing Events */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4">رویدادهای برتر</h2>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    رتبه
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    عنوان
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      بازدید
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    <div className="flex items-center gap-2">
                      <Bookmark className="w-4 h-4" />
                      ذخیره
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    <div className="flex items-center gap-2">
                      <Share2 className="w-4 h-4" />
                      اشتراک
                    </div>
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4" />
                      امتیاز کلی
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {topPerformingEvents.map((event, index) => {
                  const score = event.views + event.saves * 5 + event.shares * 10
                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                            index === 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : index === 1
                                ? 'bg-gray-100 text-gray-700'
                                : index === 2
                                  ? 'bg-orange-100 text-orange-700'
                                  : 'bg-blue-50 text-blue-700'
                          }`}
                        >
                          {index + 1}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="font-medium text-gray-900">{event.title}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600" dir="ltr">
                          {event.views.toLocaleString('fa-IR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600" dir="ltr">
                          {event.saves.toLocaleString('fa-IR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-600" dir="ltr">
                          {event.shares.toLocaleString('fa-IR')}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#A01C1C] to-[#D4AF37]"
                              style={{ width: `${Math.min(100, (score / 5000) * 100)}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-700" dir="ltr">
                            {score.toLocaleString('fa-IR')}
                          </span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-500 text-white rounded-lg">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-blue-900">رشد هفتگی</h3>
          </div>
          <p className="text-3xl font-bold text-blue-900 mb-2">۱۸٪</p>
          <p className="text-sm text-blue-700">افزایش بازدید نسبت به هفته گذشته</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-500 text-white rounded-lg">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-green-900">محبوب‌ترین رویداد</h3>
          </div>
          <p className="text-lg font-bold text-green-900 mb-2">جشنواره فیلم فجر</p>
          <p className="text-sm text-green-700">۲۵۰۰ بازدید در ۷ روز گذشته</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-purple-500 text-white rounded-lg">
              <Bookmark className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-purple-900">نرخ تبدیل</h3>
          </div>
          <p className="text-3xl font-bold text-purple-900 mb-2">۷٪</p>
          <p className="text-sm text-purple-700">از بازدیدکنندگان رویداد را ذخیره کرده‌اند</p>
        </div>
      </div>
    </div>
  )
}
