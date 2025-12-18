'use client';

import { motion } from 'framer-motion';
import { User, Mail, Phone, Calendar, MapPin, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import moment from 'moment-jalaali';

export default function ProfilePage() {
  // TODO: Replace with real user data from auth
  const user = {
    name: 'کاربر نمونه',
    email: 'user@example.com',
    phone: '09123456789',
    joinDate: new Date('2024-01-01'),
    city: 'تهران',
    avatar: null,
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            پروفایل من
          </h1>
          <Button variant="outline" className="gap-2">
            <Edit className="w-4 h-4" />
            ویرایش
          </Button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Avatar */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white">
              <User className="w-16 h-16" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {user.name}
              </h2>
              <p className="text-gray-600 mt-1">
                عضو از {moment(user.joinDate).format('jMMMM jYYYY')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3 text-gray-700">
                <Mail className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">ایمیل</div>
                  <div className="font-medium">{user.email}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">تلفن</div>
                  <div className="font-medium">{user.phone}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">شهر</div>
                  <div className="font-medium">{user.city}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-500">تاریخ عضویت</div>
                  <div className="font-medium" dir="ltr">
                    {moment(user.joinDate).format('jYYYY/jMM/jDD')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="text-4xl font-bold mb-2">0</div>
          <div className="text-blue-100">رزروهای فعال</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="text-4xl font-bold mb-2">0</div>
          <div className="text-green-100">رزروهای تکمیل شده</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg p-6 text-white"
        >
          <div className="text-4xl font-bold mb-2">0</div>
          <div className="text-purple-100">رویدادهای ذخیره شده</div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-2xl shadow-lg p-8"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          فعالیت‌های اخیر
        </h2>
        <div className="text-center py-12 text-gray-500">
          فعالیتی یافت نشد
        </div>
      </motion.div>
    </div>
  );
}
