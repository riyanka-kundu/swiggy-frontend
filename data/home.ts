import { Bike, Clock, Star } from "lucide-react";

import {
  CarouselSlide,
  DineOutSpot,
  Dish,
  Feature,
  MartProduct,
  StepContent,
} from "@/type/home";

export const dishes: Dish[] = [
  {
    emoji: "🍕",
    name: "Pizza",
    desc: "Cheesy & fresh",
    tag: "Best seller",
  },
  {
    emoji: "🍔",
    name: "Burger",
    desc: "Juicy & loaded",
    tag: "Trending",
  },
  {
    emoji: "🍜",
    name: "Noodles",
    desc: "Spicy & hot",
    tag: "",
  },
  {
    emoji: "🍛",
    name: "Biryani",
    desc: "Rich & aromatic",
    tag: "Top rated",
  },
  {
    emoji: "🍣",
    name: "Sushi",
    desc: "Rolled & fresh",
    tag: "",
  },
  {
    emoji: "🌮",
    name: "Tacos",
    desc: "Crunchy & tasty",
    tag: "",
  },
  {
    emoji: "🍝",
    name: "Pasta",
    desc: "Creamy & rich",
    tag: "",
  },
  {
    emoji: "🍰",
    name: "Dessert",
    desc: "Sweet treats",
    tag: "New",
  },
];

export const features: Feature[] = [
  {
    icon: Bike,
    title: "Fast delivery",
    desc: "Riders average 28 minutes, door to door.",
  },
  {
    icon: Clock,
    title: "Order anytime",
    desc: "Kitchens open early, close late, every day.",
  },
  {
    icon: Star,
    title: "Top-rated food",
    desc: "Only restaurants rated 4.3 and above.",
  },
];

export const martProducts: MartProduct[] = [
  {
    emoji: "🥛",
    name: "Milk 1L",
    price: "₹75",
    eta: "12 minutes",
  },
  {
    emoji: "🍞",
    name: "Bread loaf",
    price: "₹60",
    eta: "12 minutes",
  },
  {
    emoji: "🥚",
    name: "Eggs (12)",
    price: "₹140",
    eta: "12 minutes",
  },
  {
    emoji: "🍚",
    name: "Rice 5kg",
    price: "₹420",
    eta: "18 minutes",
  },
  {
    emoji: "🧅",
    name: "Onion 1kg",
    price: "₹55",
    eta: "15 minutes",
  },
  {
    emoji: "🍅",
    name: "Tomato 1kg",
    price: "₹70",
    eta: "15 minutes",
  },
  {
    emoji: "🧴",
    name: "Cooking oil",
    price: "₹210",
    eta: "15 minutes",
  },
  {
    emoji: "🍫",
    name: "Chocolate bar",
    price: "₹90",
    eta: "10 minutes",
  },
  {
    emoji: "🧻",
    name: "Tissue pack",
    price: "₹120",
    eta: "12 minutes",
  },
  {
    emoji: "☕",
    name: "Coffee jar",
    price: "₹350",
    eta: "15 minutes",
  },
];

export const carouselSlides: CarouselSlide[] = [
  {
    emoji: "🍕",
    title: "Wood-fired Pizza",
    subtitle: "Stone-baked, extra cheese",
    gradient: "from-[#E4572E] to-[#8f2d13]",
  },
  {
    emoji: "🍣",
    title: "Fresh Sushi Platter",
    subtitle: "Chef's special selection",
    gradient: "from-[#2e6f6e] to-[#123a3a]",
  },
  {
    emoji: "🍛",
    title: "Hyderabadi Biryani",
    subtitle: "Slow-cooked, saffron rice",
    gradient: "from-[#b8511f] to-[#4a1f0c]",
  },
  {
    emoji: "🍰",
    title: "Chocolate Dessert",
    subtitle: "Rich, layered, indulgent",
    gradient: "from-[#6a3b8f] to-[#241333]",
  },
  {
    emoji: "🌮",
    title: "Street-style Tacos",
    subtitle: "Crunchy shell, bold salsa",
    gradient: "from-[#c9932e] to-[#4a3308]",
  },
];

export const dineOutSpots: DineOutSpot[] = [
  {
    emoji: "🍽️",
    name: "The Grillhouse",
    cuisine: "Steaks & BBQ",
    rating: "4.6",
    distance: "1.2 km",
    offer: "20% off dine-in",
  },
  {
    emoji: "🍷",
    name: "Bistro Luna",
    cuisine: "Italian, Wine bar",
    rating: "4.4",
    distance: "2.0 km",
    offer: "",
  },
  {
    emoji: "🍲",
    name: "Spice Route",
    cuisine: "North Indian",
    rating: "4.7",
    distance: "0.8 km",
    offer: "Flat ৳200 off",
  },
  {
    emoji: "🍱",
    name: "Sakura Table",
    cuisine: "Japanese",
    rating: "4.5",
    distance: "3.1 km",
    offer: "",
  },
];

export const STEP_CONTENT: StepContent = {
  login: {
    title: "Welcome back",
    description: "Sign in to continue ordering your favorites food.",
  },
  register: {
    title: "Create an account",
    description: "Sign up to start ordering your favorites food.",
  },
  otp: {
    title: "Verify your mobile",
    description: "Enter the OTP sent to your email.",
  },
};
