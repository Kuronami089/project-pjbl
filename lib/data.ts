export interface Theater {
  id: number;
  name: string;
  city: string;
  type: string;
  price2D: number;
  price3D: number;
  distance: number;
  hasPremiere?: boolean;
}

export const DUMMY_THEATERS: Theater[] = [
  // TASIKMALAYA
  {
    id: 1,
    name: "TASIK XXI",
    city: "Tasikmalaya",
    type: "XXI",
    price2D: 35000,
    price3D: 50000,
    distance: 2.5,
  },
  {
    id: 2,
    name: "TRANSMART TASIKMALAYA XXI",
    city: "Tasikmalaya",
    type: "XXI",
    price2D: 40000,
    price3D: 55000,
    distance: 4.8,
  },
  {
    id: 3,
    name: "CGV PASAR ASIA",
    city: "Tasikmalaya",
    type: "CGV",
    price2D: 30000,
    price3D: 45000,
    distance: 1.2,
  },
  // BEKASI
  {
    id: 4,
    name: "CIPLAZ CIBITUNG XXI",
    city: "Bekasi",
    type: "XXI",
    price2D: 35000,
    price3D: 50000,
    distance: 3.5,
  },
  {
    id: 5,
    name: "CIPUTRA CIBUBUR XXI",
    city: "Bekasi",
    type: "XXI",
    price2D: 40000,
    price3D: 60000,
    distance: 2.1,
    hasPremiere: true,
  },
  {
    id: 6,
    name: "COURTS KHI XXI",
    city: "Bekasi",
    type: "XXI",
    price2D: 35000,
    price3D: 50000,
    distance: 5.2,
  },
  // TANGERANG SELATAN
  {
    id: 7,
    name: "BINTARO XCHANGE XXI",
    city: "Tangerang Selatan",
    type: "XXI",
    price2D: 50000,
    price3D: 75000,
    distance: 3.1,
  },
  {
    id: 8,
    name: "LOTTE BINTARO CGV",
    city: "Tangerang Selatan",
    type: "CGV",
    price2D: 45000,
    price3D: 60000,
    distance: 0.5,
  },
  // JAKARTA
  {
    id: 9,
    name: "GRAND INDONESIA XXI",
    city: "Jakarta",
    type: "XXI",
    price2D: 60000,
    price3D: 80000,
    distance: 1.5,
  },
  {
    id: 10,
    name: "PLAZA SENAYAN XXI",
    city: "Jakarta",
    type: "XXI",
    price2D: 75000,
    price3D: 100000,
    distance: 2.8,
    hasPremiere: true,
  },
];

export const CITIES = [
  "Tasikmalaya",
  "Bekasi",
  "Tangerang Selatan",
  "Jakarta",
];

export const GENRE_MAP: { [key: number]: string } = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

export interface Ticket {
  id: string;
  status: "active" | "past";
  movie: {
    title: string;
    poster_path: string;
  };
  theater: Theater;
  date: string;
  time: string;
  seatCount: number;
  seats: string[];
  bookingCode: string;
  passKey: string;
  orderNumber: string;
  price: number;
  serviceFee: number;
  paymentMethod: string;
  format: string;
  audi: string;
  timestamp?: number;
}

export const DUMMY_TICKETS: Ticket[] = [];
