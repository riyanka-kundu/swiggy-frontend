export interface Restaurant {
  openingClosing: OpeningClosing;
  contract: Contract;
  _id: string;
  owner: string;
  ownerName: string;
  restaurantName: string;
  location: string;
  email: string;
  phone: string;
  whatsappNumber: string;
  workingDays: string[];
  onboardingStep: number;
  isOpen: boolean;
  pushSubscription: null;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  bankAccountNumber: string;
  fssaiNumber: string;
  gstin: string;
  ifscCode: string;
  outletType: string;
  panNumber: string;
}

export interface Contract {
  signatory: Signatory;
  accepted: boolean;
  acceptedAt: Date;
  contractVersion: string;
  reviewedSections: string[];
  declarationAccepted: boolean;
  ipAddress: string;
  deviceInfo: string;
}

export interface Signatory {
  fullName: string;
  designation: string;
  place: string;
}

export interface OpeningClosing {
  sameForAllDays: boolean;
  slots: Slot[];
}

export interface Slot {
  open: string;
  close: string;
  _id: string;
}

// ============ Food & User types ============

export interface Food {
  _id: string;
  itemName: string;
  basePrice: number;
  discountPrice: number;
  image?: string;
  foodType: string;
  isVeg: boolean;
  category: string;
  cuisine: string;
  isAvailable: boolean;
  isDeleted: boolean;
  approvalStatus: "pending" | "approved" | "rejected";
  restaurant: RestaurantListItem;
  createdAt: Date;
  updatedAt: Date;
}

export interface RestaurantListItem {
  _id: string;
  restaurantName: string;
  location: string;
  status: string;
  outletType?: string;
  workingDays?: string[];
  openingClosing?: OpeningClosing;
  isOpen?: boolean;
}

// ============ Cart ============

export interface CartItem {
  _id: string;
  food: Food;
  quantity: number;
  price: number;
}

export interface Cart {
  _id: string;
  user: string;
  restaurant: RestaurantListItem;
  items: CartItem[];
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ============ Orders ============

export interface OrderItem {
  food: Food;
  quantity: number;
  price: number;
  _id: string;
}

export interface Order {
  _id: string;
  user: { _id: string; full_name: string; email: string } | string;
  restaurant: RestaurantListItem | string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "confirmed" | "preparing" | "out_for_delivery" | "delivered" | "cancelled";
  address: string;
  paymentMethod: string;
  isPaid: boolean;
  createdAt: Date;
  updatedAt: Date;
}

