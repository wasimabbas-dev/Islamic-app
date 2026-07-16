import {
  Landmark,
  HandHelping,
  Handshake,
  Users,
  Heart,
  Wallet,
  Grid2x2,
  MessageCircleQuestion,
  BadgeCheck,
  UserRound,
} from "lucide-react";

export interface Category {
  id: number;
  title: string;
  questions: number;
  icon: React.ElementType;
  iconColor: string;
}

export interface Stat {
  id: number;
  title: string;
  value: string;
  icon: React.ElementType;
  iconColor: string;
}

export const categories: Category[] = [
  {
    id: 1,
    title: "Aqidah",
    questions: 12,
    icon: Landmark,
    iconColor: "text-sky-500",
  },
  {
    id: 2,
    title: "Ibadah",
    questions: 18,
    icon: HandHelping,
    iconColor: "text-indigo-500",
  },
  {
    id: 3,
    title: "Muamalat",
    questions: 24,
    icon: Handshake,
    iconColor: "text-amber-500",
  },
  {
    id: 4,
    title: "Family & Relationships",
    questions: 36,
    icon: Users,
    iconColor: "text-violet-500",
  },
  {
    id: 5,
    title: "Marriage",
    questions: 22,
    icon: Heart,
    iconColor: "text-rose-500",
  },
  {
    id: 6,
    title: "Finance & Economics",
    questions: 16,
    icon: Wallet,
    iconColor: "text-yellow-600",
  },
  {
    id: 7,
    title: "Others",
    questions: 10,
    icon: Grid2x2,
    iconColor: "text-purple-500",
  },
];

export const stats: Stat[] = [
  {
    id: 1,
    title: "Questions Asked",
    value: "2,584+",
    icon: MessageCircleQuestion,
    iconColor: "text-rose-500",
  },
  {
    id: 2,
    title: "Answers Provided",
    value: "1,325+",
    icon: BadgeCheck,
    iconColor: "text-amber-500",
  },
  {
    id: 3,
    title: "Verified Scholars",
    value: "56+",
    icon: Users,
    iconColor: "text-blue-500",
  },
  {
    id: 4,
    title: "Happy Users",
    value: "10,000+",
    icon: UserRound,
    iconColor: "text-sky-500",
  },
];
