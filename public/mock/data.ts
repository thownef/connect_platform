interface Service {
  id: number;
  icon: any;
  link: string;
  title: string;
  category: string;
}

export const serviceData: Service[] = [
  {
    id: 1,
    icon: "fas fa-plane-departure",
    link: "search?keyword=&country=Japan&category=3&pages=1",
    title: "Travel, Entertainment and Design",
    category: "Travel%2C+Entertainment+and+Design",
  },
  {
    id: 2,
    icon: "fa-solid fa-utensils",
    link: "search?keyword=&country=Japan&category=4&pages=1",
    title: "Food and service industry",
    category: "Food+and+service+industry",
  },
  {
    id: 3,
    icon: "fa-solid fa-arrow-trend-up",
    link: "search?keyword=&country=Japan&category=5&pages=1",
    title: "Trend-Following Business",
    category: "Trend-Following+Business",
  },
  {
    id: 4,
    icon: "fab fa-dev",
    link: "search?keyword=&country=Japan&category=6&pages=1",
    title: "Related to Information Technology",
    category: "Related+to+Information+Technology",
  },
  {
    id: 5,
    icon: "fa-solid fa-gears",
    link: "search?keyword=&country=Japan&category=7&pages=1",
    title: "Related to Technical Interns",
    category: "Related+to+Technical+Interns",
  },
  {
    id: 6,
    icon: "fa-solid fa-school",
    link: "search?keyword=&country=Japan&category=8&pages=1",
    title: "Education and Care",
    category: "Education+and+Care",
  },
  {
    id: 7,
    icon: "fa-solid fa-globe",
    link: "search?keyword=&country=Japan&category=9&pages=1",
    title: "Expansion to Viet Nam",
    category: "Expansion+to+Viet+Nam",
  },
  {
    id: 8,
    icon: "fas fa-industry",
    link: "search?keyword=&country=Japan&category=99&pages=1",
    title: "Other",
    category: "Others",
  },
];
