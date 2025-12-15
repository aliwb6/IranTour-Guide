'use client'

import { Component, ReactNode } from 'react'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="text-center max-w-md">
              <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">مشکلی پیش آمده است</h2>
              <p className="text-gray-600 mb-6">
                متأسفانه خطایی رخ داده است. لطفاً صفحه را رفرش کنید یا بعداً دوباره تلاش کنید.
              </p>
              <Button
                onClick={() => window.location.reload()}
                className="bg-primary hover:bg-primary/90"
              >
                تلاش مجدد
              </Button>
            </div>
          </div>
        )
      )
    }

    return this.props.children
  }
}
