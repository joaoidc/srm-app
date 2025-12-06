export interface Supplier {
  id: string;
  name: string; // The main bold name (e.g. 00, 000, 00salvador1)
  fantasy?: string; // The fantasy name/number (e.g. 1, 2, 111)
  city: string; // e.g. Salvador - BA
  lastLoad: string; // e.g. Há 47 dias
  daysWithoutLoad: number; // for logic
  status: "active" | "inactive" | "alert";
  hasAlert?: boolean; // Red exclamation icon
}

export const mockSuppliers: Supplier[] = [
  {
    id: "1",
    name: "00",
    fantasy: "1",
    city: "Salvador - BA",
    lastLoad: "Há 47 dias",
    daysWithoutLoad: 47,
    status: "active",
    hasAlert: false,
  },
  {
    id: "2",
    name: "000",
    fantasy: "2",
    city: "Salvador - BA",
    lastLoad: "Há 47 dias",
    daysWithoutLoad: 47,
    status: "active",
    hasAlert: false,
  },
  {
    id: "3",
    name: "001",
    fantasy: "",
    city: "Salvador - BA",
    lastLoad: "Há 47 dias",
    daysWithoutLoad: 47,
    status: "active",
    hasAlert: false,
  },
  {
    id: "4",
    name: "00salvador1",
    fantasy: "111",
    city: "Salvador - BA",
    lastLoad: "Há 19 dias",
    daysWithoutLoad: 19,
    status: "alert",
    hasAlert: true,
  },
  {
    id: "5",
    name: "00salvador2",
    fantasy: "",
    city: "Salvador - BA",
    lastLoad: "Há 47 dias",
    daysWithoutLoad: 47,
    status: "active",
    hasAlert: false,
  },
  {
    id: "6",
    name: "00salvador3",
    fantasy: "",
    city: "Salvador - BA",
    lastLoad: "Há 46 dias",
    daysWithoutLoad: 46,
    status: "active",
    hasAlert: false,
  },
  {
    id: "7",
    name: "00salvador4",
    fantasy: "",
    city: "Salvador - BA",
    lastLoad: "Há 47 dias",
    daysWithoutLoad: 47,
    status: "alert",
    hasAlert: true,
  },
  {
    id: "8",
    name: "01",
    fantasy: "",
    city: "Salvador - BA",
    lastLoad: "Há 50 dias",
    daysWithoutLoad: 50,
    status: "alert",
    hasAlert: true,
  },
];
