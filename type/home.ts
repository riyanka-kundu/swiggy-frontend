import { LucideIcon } from "lucide-react";

export type Dish = {
  emoji: string;
  name: string;
  desc: string;
  tag: string;
};

export type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
};

export type MartProduct = {
  emoji: string;
  name: string;
  price: string;
  eta: string;
};

export type CarouselSlide = {
  emoji: string;
  title: string;
  subtitle: string;
  gradient: string;
};

export type DineOutSpot = {
  emoji: string;
  name: string;
  cuisine: string;
  rating: string;
  distance: string;
  offer: string;
};

export type AuthStep = "login" | "register" | "otp";

export type StepContent = Record<
  AuthStep,
  {
    title: string;
    description: string;
  }
>;
