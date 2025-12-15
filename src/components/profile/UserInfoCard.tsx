'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { User, Edit } from 'lucide-react'
import moment from 'moment-jalaali'

interface UserInfoCardProps {
  user: {
    name: string
    email: string
    image?: string | null
    createdAt?: string
  }
}

export const UserInfoCard: React.FC<UserInfoCardProps> = ({ user }) => {
  const memberSince = user.createdAt ? moment(user.createdAt).format('jMMMM jYYYY') : 'اسفند ۱۴۰۳'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="kashi-card p-6 mb-6"
    >
      {/* Avatar */}
      <div className="flex justify-center mb-4">
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-yellow-400 flex items-center justify-center border-4 border-white shadow-lg">
            {user.image ? (
              <img
                src={user.image}
                alt={user.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-10 h-10 text-white" />
            )}
          </div>
        </div>
      </div>

      {/* User Info */}
      <div className="text-center mb-4">
        <h3 className="text-xl font-black text-gold mb-1">{user.name}</h3>
        <p className="text-sm text-gray-600 font-medium mb-2">{user.email}</p>
        <p className="text-xs text-gray-500 font-medium">عضو از {memberSince}</p>
      </div>

      {/* Edit Profile Button */}
      <Link href="/profile/settings">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-4 py-2 rounded-xl bg-white border-2 border-gray-300 text-gray-700 font-bold hover:border-gold hover:text-gold transition-colors flex items-center justify-center gap-2"
        >
          <Edit className="w-4 h-4" />
          ویرایش پروفایل
        </motion.button>
      </Link>
    </motion.div>
  )
}
