export const iranianCities = [
  { name: 'تهران', nameEn: 'Tehran', province: 'تهران', slug: 'tehran' },
  { name: 'اصفهان', nameEn: 'Isfahan', province: 'اصفهان', slug: 'isfahan' },
  { name: 'شیراز', nameEn: 'Shiraz', province: 'فارس', slug: 'shiraz' },
  { name: 'مشهد', nameEn: 'Mashhad', province: 'خراسان رضوی', slug: 'mashhad' },
  { name: 'یزد', nameEn: 'Yazd', province: 'یزد', slug: 'yazd' },
  { name: 'تبریز', nameEn: 'Tabriz', province: 'آذربایجان شرقی', slug: 'tabriz' },
  { name: 'کیش', nameEn: 'Kish', province: 'هرمزگان', slug: 'kish' },
  { name: 'قزوین', nameEn: 'Qazvin', province: 'قزوین', slug: 'qazvin' },
  { name: 'کرمان', nameEn: 'Kerman', province: 'کرمان', slug: 'kerman' },
  { name: 'اهواز', nameEn: 'Ahvaz', province: 'خوزستان', slug: 'ahvaz' },
  { name: 'رشت', nameEn: 'Rasht', province: 'گیلان', slug: 'rasht' },
  { name: 'کرج', nameEn: 'Karaj', province: 'البرز', slug: 'karaj' },
  { name: 'همدان', nameEn: 'Hamadan', province: 'همدان', slug: 'hamadan' },
  { name: 'کرمانشاه', nameEn: 'Kermanshah', province: 'کرمانشاه', slug: 'Kermanshah' },
  { name: 'قم', nameEn: 'Qom', province: 'قم', slug: 'qom' },
  { name: 'ارومیه', nameEn: 'Urmia', province: 'آذربایجان غربی', slug: 'urmia' },
  { name: 'زاهدان', nameEn: 'Zahedan', province: 'سیستان و بلوچستان', slug: 'zahedan' },
  { name: 'سنندج', nameEn: 'Sanandaj', province: 'کردستان', slug: 'sanandaj' },
  { name: 'اراک', nameEn: 'Arak', province: 'مرکزی', slug: 'arak' },
  { name: 'ساری', nameEn: 'Sari', province: 'مازندران', slug: 'sari' },
  { name: 'بوشهر', nameEn: 'Bushehr', province: 'بوشهر', slug: 'bushehr' },
  { name: 'بندرعباس', nameEn: 'Bandar Abbas', province: 'هرمزگان', slug: 'bandar-abbas' },
  { name: 'گرگان', nameEn: 'Gorgan', province: 'گلستان', slug: 'gorgan' },
  { name: 'خرم آباد', nameEn: 'Khorramabad', province: 'لرستان', slug: 'khorramabad' },
  { name: 'یاسوج', nameEn: 'Yasuj', province: 'کهگیلویه و بویراحمد', slug: 'yasuj' },
  { name: 'کاشان', nameEn: 'Kashan', province: 'اصفهان', slug: 'kashan' },
  { name: 'نیشابور', nameEn: 'Neyshabur', province: 'خراسان رضوی', slug: 'neyshabur' },
]

export const getProvinces = () => {
  const provinces = new Set<string>()
  iranianCities.forEach((city) => provinces.add(city.province))
  return Array.from(provinces).sort()
}

export const getCitiesByProvince = (province: string) => {
  return iranianCities.filter((city) => city.province === province)
}

export const getCityBySlug = (slug: string) => {
  return iranianCities.find((city) => city.slug === slug)
}