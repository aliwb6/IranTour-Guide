'use client';

import { useState } from 'react';
// @ts-ignore - react-map-gl types compatibility issue
import Map, { Marker, Popup, NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapPin, X, Calendar, DollarSign, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import moment from 'moment-jalaali';

interface MapEvent {
  id: string;
  slug: string;
  title: string;
  city: string;
  venue: string;
  latitude: number;
  longitude: number;
  startDate: Date;
  type: string;
  style: string;
  featuredImage: string | null;
  basePrice: number | null;
  shortDescription: string;
}

interface MapClientProps {
  events: MapEvent[];
}

// Default center: Tehran
const INITIAL_VIEW_STATE = {
  latitude: 35.6892,
  longitude: 51.389,
  zoom: 5,
};

export default function MapClient({ events }: MapClientProps) {
  const [selectedEvent, setSelectedEvent] = useState<MapEvent | null>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // IMPORTANT: Replace with your Mapbox token
  const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1IjoiaXJhbnRvdXIiLCJhIjoiY2xkMTIzNDU2In0.example';

  const formatPrice = (price: number | null) => {
    if (!price) return 'رایگان';
    return new Intl.NumberFormat('fa-IR').format(price) + ' تومان';
  };

  const formatDate = (date: Date) => {
    return moment(date).format('jDD jMMMM jYYYY');
  };

  const markerColors: Record<string, string> = {
    NATIONAL: '#ef4444',
    RELIGIOUS: '#10b981',
    ARTISTIC: '#8b5cf6',
    SCIENTIFIC: '#3b82f6',
    TOURISM: '#f59e0b',
    SPORTS: '#06b6d4',
  };

  const typeLabels: Record<string, string> = {
    NATIONAL: 'ملی',
    RELIGIOUS: 'مذهبی',
    ARTISTIC: 'هنری',
    SCIENTIFIC: 'علمی',
    TOURISM: 'گردشگری',
    SPORTS: 'ورزشی',
  };

  return (
    <div className="space-y-6">
      {/* Info Banner */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="text-lg font-bold text-gray-900">
            {events.length} رویداد روی نقشه
          </div>
          <div className="flex flex-wrap gap-3">
            {Object.entries(markerColors).map(([type, color]) => (
              <div key={type} className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                />
                <span className="text-sm text-gray-700">{typeLabels[type] || type}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <Map
          {...viewState}
          onMove={(evt: any) => setViewState(evt.viewState)}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          mapboxAccessToken={MAPBOX_TOKEN}
          style={{ width: '100%', height: '600px' }}
        >
          <NavigationControl position="top-left" />
          <FullscreenControl position="top-left" />

          {/* Markers */}
          {events.map((event) => (
            <Marker
              key={event.id}
              latitude={event.latitude}
              longitude={event.longitude}
              onClick={(e: any) => {
                e.originalEvent.stopPropagation();
                setSelectedEvent(event);
              }}
            >
              <div
                className="cursor-pointer transition-transform hover:scale-110"
                style={{
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <MapPin
                  className="w-8 h-8 drop-shadow-lg"
                  style={{ color: markerColors[event.type] || '#6366f1' }}
                  fill="currentColor"
                />
              </div>
            </Marker>
          ))}

          {/* Popup */}
          {selectedEvent && (
            <Popup
              latitude={selectedEvent.latitude}
              longitude={selectedEvent.longitude}
              onClose={() => setSelectedEvent(null)}
              closeButton={false}
              className="map-popup"
              maxWidth="320px"
            >
              <div className="relative" dir="rtl">
                {/* Close Button */}
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-2 left-2 z-10 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Image */}
                {selectedEvent.featuredImage && (
                  <div className="relative h-32 w-full">
                    <Image
                      src={selectedEvent.featuredImage}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-4 space-y-3">
                  <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
                    {selectedEvent.title}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-600" />
                      {formatDate(selectedEvent.startDate)}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="w-4 h-4 text-blue-600" />
                      {selectedEvent.city} - {selectedEvent.venue}
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <DollarSign className="w-4 h-4 text-blue-600" />
                      {formatPrice(selectedEvent.basePrice)}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 line-clamp-2">
                    {selectedEvent.shortDescription}
                  </p>

                  <Button asChild className="w-full" size="sm">
                    <Link href={`/events/${selectedEvent.slug}`}>
                      مشاهده جزئیات
                      <ExternalLink className="w-4 h-4 mr-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Popup>
          )}
        </Map>
      </div>

      {/* Empty State */}
      {events.length === 0 && (
        <div className="bg-white rounded-2xl shadow-lg p-12">
          <div className="text-center text-gray-500">
            <MapPin className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            هیچ رویدادی روی نقشه یافت نشد
          </div>
        </div>
      )}
    </div>
  );
}
