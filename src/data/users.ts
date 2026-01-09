import { User } from "@/types";

export const users: User[] = [
  {
    id: 1,
    email: "kim.cs@example.com",
    name: "김철수",
    phone: "010-1234-5678",
    joinDate: "2023-06-15",
    orderCount: 3,
    status: "active",
  },
  {
    id: 2,
    email: "lee.yh@example.com",
    name: "이영희",
    phone: "010-2345-6789",
    joinDate: "2023-08-22",
    orderCount: 2,
    status: "active",
  },
  {
    id: 3,
    email: "park.ms@example.com",
    name: "박민수",
    phone: "010-3456-7890",
    joinDate: "2023-10-10",
    orderCount: 1,
    status: "active",
  },
  {
    id: 4,
    email: "jung.sj@example.com",
    name: "정수진",
    phone: "010-4567-8901",
    joinDate: "2023-11-05",
    orderCount: 4,
    status: "active",
  },
  {
    id: 5,
    email: "choi.dh@example.com",
    name: "최동훈",
    phone: "010-5678-9012",
    joinDate: "2024-01-02",
    orderCount: 1,
    status: "active",
  },
  {
    id: 6,
    email: "kang.my@example.com",
    name: "강미영",
    phone: "010-6789-0123",
    joinDate: "2023-09-18",
    orderCount: 2,
    status: "inactive",
  },
  {
    id: 7,
    email: "yoon.sy@example.com",
    name: "윤서연",
    phone: "010-7890-1234",
    joinDate: "2023-12-01",
    orderCount: 1,
    status: "active",
  },
  {
    id: 8,
    email: "lim.jh@example.com",
    name: "임준혁",
    phone: "010-8901-2345",
    joinDate: "2024-01-10",
    orderCount: 1,
    status: "active",
  },
  {
    id: 9,
    email: "han.jr@example.com",
    name: "한지은",
    phone: "010-9012-3456",
    joinDate: "2023-07-20",
    orderCount: 5,
    status: "active",
  },
  {
    id: 10,
    email: "song.th@example.com",
    name: "송태현",
    phone: "010-0123-4567",
    joinDate: "2023-05-08",
    orderCount: 0,
    status: "blocked",
  },
];

export const getUserById = (id: number): User | undefined => {
  return users.find((u) => u.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return users.find((u) => u.email === email);
};

export const getActiveUsers = (): User[] => {
  return users.filter((u) => u.status === "active");
};

export const getUserStats = () => {
  const total = users.length;
  const active = users.filter((u) => u.status === "active").length;
  const inactive = users.filter((u) => u.status === "inactive").length;
  const blocked = users.filter((u) => u.status === "blocked").length;
  const newToday = users.filter(
    (u) => new Date(u.joinDate).toDateString() === new Date().toDateString()
  ).length;

  return { total, active, inactive, blocked, newToday };
};

export const userStatusLabels: Record<User["status"], string> = {
  active: "활성",
  inactive: "비활성",
  blocked: "차단",
};

export const userStatusColors: Record<User["status"], string> = {
  active: "bg-green-100 text-green-800",
  inactive: "bg-gray-100 text-gray-800",
  blocked: "bg-red-100 text-red-800",
};
