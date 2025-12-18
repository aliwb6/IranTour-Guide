'use client';

import { useState, useMemo, useCallback } from 'react';
import { Calendar as BigCalendar, momentLocalizer, View } from 'react-big-calendar';
import moment from 'moment-jalaali';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useRouter } from 'next/navigation';
import { Calendar, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CalendarFilters from './CalendarFilters';
import Image from 'next/image';
import Link from 'next/link';

// Configure moment for Jalali calendar
moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });
const localizer = momentLocalizer(moment);

interface CalendarEvent {
  id: string;
  slug: string;
  title: string;
  startDate: Date;
  endDate: Date;
  city: string;
  type: string;
  style: string;
  featuredImage: string | null;
  basePrice: number | null;
}

interface CalendarClientProps {
  events: CalendarEvent[];
}

export default function CalendarClient({ events }: CalendarClientProps) {
  const router = useRouter();
  const [view, setView] = useState('calendar');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Transform events for calendar
  const calendarEvents = useMemo(() => {
    return events
      .filter((event) => {
        if (selectedCity && event.city !== selectedCity) return false;
        if (selectedType && event.type !== selectedType) return false;
        return true;
      })
      .map((event) => ({
        id: event.id,
        title: event.title,
        start: new Date(event.startDate),
        end: new Date(event.endDate),
        resource: event,
      }));
  }, [events, selectedCity, selectedType]);

  // Get unique cities and types for filters
  const cities = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.city)));
  }, [events]);

  const types = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.type)));
  }, [events]);

  const handleSelectEvent = useCallback(
    (event: any) => {
      router.push(`/events/${event.resource.slug}`);
    },
    [router]
  );

  const handleNavigate = useCallback((date: Date) => {
    setCurrentDate(date);
  }, []);

  // Custom event style
  const eventStyleGetter = useCallback((event: any) => {
    const typeColors: Record<string, string> = {
      NATIONAL: '#ef4444',
      RELIGIOUS: '#10b981',
      ARTISTIC: '#8b5cf6',
      SCIENTIFIC: '#3b82f6',
      TOURISM: '#f59e0b',
      SPORTS: '#06b6d4',
    };

    const backgroundColor = typeColors[event.resource.type] || '#6366f1';

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
      },
    };
  }, []);

  // Custom toolbar
  const CustomToolbar = (toolbar: any) => {
    const goToBack = () => {
      toolbar.onNavigate('PREV');
    };

    const goToNext = () => {
      toolbar.onNavigate('NEXT');
    };

    const goToToday = () => {
      toolbar.onNavigate('TODAY');
    };

    return (
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Button onClick={goToToday} variant="outline" size="sm">
            امروز
          </Button>
          <div className="flex gap-1">
            <Button onClick={goToNext} variant="outline" size="sm">
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button onClick={goToBack} variant="outline" size="sm">
              <ChevronLeft className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <div className="text-xl font-bold text-gray-900">
          {moment(toolbar.date).format('jMMMM jYYYY')}
        </div>

        <div className="flex gap-2">
          <Button
            variant={view === 'calendar' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('calendar')}
          >
            <Calendar className="w-4 h-4 ml-2" />
            تقویم
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setView('list')}
          >
            <List className="w-4 h-4 ml-2" />
            لیست
          </Button>
        </div>
      </div>
    );
  };

  const formatPrice = (price: number | null) => {
    if (!price) return 'رایگان';
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jDD jMMMM jYYYY');
  };

  return (
    <div className="space-y-8">
      {/* Filters */}
      <CalendarFilters
        cities={cities}
        types={types}
        selectedCity={selectedCity}
        selectedType={selectedType}
        onCityChange={setSelectedCity}
        onTypeChange={setSelectedType}
      />

      {/* Calendar or List View */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        {view === 'calendar' ? (
          <div className="calendar-rtl" style={{ minHeight: '600px' }}>
            <BigCalendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              onSelectEvent={handleSelectEvent}
              onNavigate={handleNavigate}
              date={currentDate}
              eventPropGetter={eventStyleGetter}
              components={{
                toolbar: CustomToolbar,
              }}
              messages={{
                next: 'بعدی',
                previous: 'قبلی',
                today: 'امروز',
                month: 'ماه',
                week: 'هفته',
                day: 'روز',
                agenda: 'برنامه',
                date: 'تاریخ',
                time: 'زمان',
                event: 'رویداد',
                showMore: (total) => `+${total} رویداد دیگر`,
              }}
              rtl
            />
          </div>
        ) : (
          <div className="space-y-6">
            {calendarEvents.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                رویدادی یافت نشد
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {calendarEvents.map((event) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.resource.slug}`}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {event.resource.featuredImage && (
                      <div className="relative h-48">
                        <Image
                          src={event.resource.featuredImage}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                        {event.title}
                      </h3>
                      <div className="text-sm text-gray-600">
                        <div>{formatDate(event.start)}</div>
                        <div>{event.resource.city}</div>
                      </div>
                      <div className="text-lg font-bold text-blue-600">
                        {formatPrice(event.resource.basePrice)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">
          راهنمای رنگ‌ها
        </h3>
        <div className="flex flex-wrap gap-4">
          {[
            { type: 'NATIONAL', label: 'ملی', color: '#ef4444' },
            { type: 'RELIGIOUS', label: 'مذهبی', color: '#10b981' },
            { type: 'ARTISTIC', label: 'هنری', color: '#8b5cf6' },
            { type: 'SCIENTIFIC', label: 'علمی', color: '#3b82f6' },
            { type: 'TOURISM', label: 'گردشگری', color: '#f59e0b' },
            { type: 'SPORTS', label: 'ورزشی', color: '#06b6d4' },
          ].map((item) => (
            <div key={item.type} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
