import { Loader2 } from 'lucide-react'

export default function EventsLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-gray-600 text-lg">در حال بارگذاری رویدادها...</p>
        </div>
      </div>
    </div>
  )
}
