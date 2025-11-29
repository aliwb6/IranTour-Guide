export interface City {
  id: string;
  name: string;
  nameEn: string;
  slug: string;
  province: string;
  provinceEn: string;
  description?: string;
  image?: string;
  eventCount?: number;
}

export const iranCities: City[] = [
  // استان تهران
  {
    id: "1",
    name: "تهران",
    nameEn: "Tehran",
    slug: "tehran",
    province: "تهران",
    provinceEn: "Tehran",
    description: "پایتخت و بزرگترین شهر ایران",
    eventCount: 120,
  },

  // استان اصفهان
  {
    id: "2",
    name: "اصفهان",
    nameEn: "Isfahan",
    slug: "isfahan",
    province: "اصفهان",
    provinceEn: "Isfahan",
    description: "نصف جهان - شهر هنر و معماری",
    eventCount: 85,
  },

  // استان فارس
  {
    id: "3",
    name: "شیراز",
    nameEn: "Shiraz",
    slug: "shiraz",
    province: "فارس",
    provinceEn: "Fars",
    description: "شهر شعر، گل و بلبل",
    eventCount: 75,
  },

  // استان خراسان رضوی
  {
    id: "4",
    name: "مشهد",
    nameEn: "Mashhad",
    slug: "mashhad",
    province: "خراسان رضوی",
    provinceEn: "Razavi Khorasan",
    description: "پایتخت معنوی ایران",
    eventCount: 95,
  },

  // استان یزد
  {
    id: "5",
    name: "یزد",
    nameEn: "Yazd",
    slug: "yazd",
    province: "یزد",
    provinceEn: "Yazd",
    description: "شهر بادگیرها و کویر",
    eventCount: 45,
  },

  // استان آذربایجان شرقی
  {
    id: "6",
    name: "تبریز",
    nameEn: "Tabriz",
    slug: "tabriz",
    province: "آذربایجان شرقی",
    provinceEn: "East Azerbaijan",
    description: "شهر اولین‌ها",
    eventCount: 60,
  },

  // استان گیلان
  {
    id: "7",
    name: "رشت",
    nameEn: "Rasht",
    slug: "rasht",
    province: "گیلان",
    provinceEn: "Gilan",
    description: "شهر خوش‌باران شمال",
    eventCount: 40,
  },

  // استان خوزستان
  {
    id: "8",
    name: "اهواز",
    nameEn: "Ahvaz",
    slug: "ahvaz",
    province: "خوزستان",
    provinceEn: "Khuzestan",
    description: "دروازه جنوب ایران",
    eventCount: 35,
  },

  // استان مازندران
  {
    id: "9",
    name: "ساری",
    nameEn: "Sari",
    slug: "sari",
    province: "مازندران",
    provinceEn: "Mazandaran",
    description: "مرکز استان مازندران",
    eventCount: 30,
  },

  // استان کرمان
  {
    id: "10",
    name: "کرمان",
    nameEn: "Kerman",
    slug: "kerman",
    province: "کرمان",
    provinceEn: "Kerman",
    description: "شهر تاریخ و فرهنگ",
    eventCount: 38,
  },

  // استان سیستان و بلوچستان
  {
    id: "11",
    name: "زاهدان",
    nameEn: "Zahedan",
    slug: "zahedan",
    province: "سیستان و بلوچستان",
    provinceEn: "Sistan and Baluchestan",
    eventCount: 20,
  },

  // استان قم
  {
    id: "12",
    name: "قم",
    nameEn: "Qom",
    slug: "qom",
    province: "قم",
    provinceEn: "Qom",
    description: "شهر مقدس",
    eventCount: 55,
  },

  // استان همدان
  {
    id: "13",
    name: "همدان",
    nameEn: "Hamedan",
    slug: "hamedan",
    province: "همدان",
    provinceEn: "Hamadan",
    description: "شهر تاریخی",
    eventCount: 28,
  },

  // استان کرمانشاه
  {
    id: "14",
    name: "کرمانشاه",
    nameEn: "Kermanshah",
    slug: "kermanshah",
    province: "کرمانشاه",
    provinceEn: "Kermanshah",
    eventCount: 32,
  },

  // استان اردبیل
  {
    id: "15",
    name: "اردبیل",
    nameEn: "Ardabil",
    slug: "ardabil",
    province: "اردبیل",
    provinceEn: "Ardabil",
    eventCount: 25,
  },

  // استان قزوین
  {
    id: "16",
    name: "قزوین",
    nameEn: "Qazvin",
    slug: "qazvin",
    province: "قزوین",
    provinceEn: "Qazvin",
    eventCount: 22,
  },
];

export const popularCities = iranCities.filter((city) =>
  ["تهران", "اصفهان", "شیراز", "مشهد", "یزد", "تبریز"].includes(city.name)
);

export const getCityBySlug = (slug: string): City | undefined => {
  return iranCities.find((city) => city.slug === slug);
};

export const getCityById = (id: string): City | undefined => {
  return iranCities.find((city) => city.id === id);
};

export const getCitiesByProvince = (province: string): City[] => {
  return iranCities.filter((city) => city.province === province);
};
