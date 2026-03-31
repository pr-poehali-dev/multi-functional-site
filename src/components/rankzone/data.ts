export const GAMES = ["Все игры", "Valorant", "CS2", "Dota 2", "League of Legends", "Apex Legends"];
export const DIFFICULTIES = ["Все уровни", "Новичок", "Любитель", "Эксперт", "Мастер", "Грандмастер"];

export const PLAYERS = [
  { id: 1, rank: 1, name: "ShadowBlade", game: "Valorant", level: "Грандмастер", rating: 9842, wins: 1204, winrate: 78, trend: "up", country: "RU", achievements: 47 },
  { id: 2, rank: 2, name: "NightFury_X", game: "CS2", level: "Мастер", rating: 9615, wins: 987, winrate: 74, trend: "up", country: "UA", achievements: 38 },
  { id: 3, rank: 3, name: "QuantumPeak", game: "Dota 2", level: "Грандмастер", rating: 9401, wins: 1102, winrate: 71, trend: "stable", country: "RU", achievements: 52 },
  { id: 4, rank: 4, name: "IceBreaker77", game: "Valorant", level: "Эксперт", rating: 9188, wins: 843, winrate: 69, trend: "down", country: "KZ", achievements: 29 },
  { id: 5, rank: 5, name: "RedPhoenix", game: "Apex Legends", level: "Мастер", rating: 8977, wins: 756, winrate: 67, trend: "up", country: "RU", achievements: 33 },
  { id: 6, rank: 6, name: "VoidWalker", game: "League of Legends", level: "Мастер", rating: 8720, wins: 698, winrate: 65, trend: "stable", country: "BY", achievements: 41 },
  { id: 7, rank: 7, name: "CyberStrike", game: "CS2", level: "Эксперт", rating: 8501, wins: 621, winrate: 63, trend: "up", country: "RU", achievements: 27 },
  { id: 8, rank: 8, name: "StarDust99", game: "Valorant", level: "Эксперт", rating: 8244, wins: 579, winrate: 61, trend: "down", country: "UA", achievements: 22 },
  { id: 9, rank: 9, name: "IronWill", game: "Dota 2", level: "Эксперт", rating: 7988, wins: 534, winrate: 59, trend: "stable", country: "RU", achievements: 31 },
  { id: 10, rank: 10, name: "TurboMax", game: "Apex Legends", level: "Любитель", rating: 7741, wins: 489, winrate: 57, trend: "up", country: "KZ", achievements: 18 },
];

export const STATS = [
  { label: "Игроков", value: "48 291", icon: "Users" },
  { label: "Матчей", value: "1.2М", icon: "Swords" },
  { label: "Игр", value: "5", icon: "Gamepad2" },
  { label: "Достижений", value: "320", icon: "Trophy" },
];

export const ACHIEVEMENTS = [
  { icon: "🏆", name: "Легенда", desc: "Топ-10 мирового рейтинга" },
  { icon: "⚡", name: "Молния", desc: "100 побед подряд" },
  { icon: "🎯", name: "Снайпер", desc: "Winrate выше 75%" },
  { icon: "🔥", name: "В огне", desc: "30-дневная серия побед" },
  { icon: "💎", name: "Бриллиант", desc: "10 000+ рейтинга" },
  { icon: "🌟", name: "Звезда", desc: "Выбор сообщества" },
];

export type Player = typeof PLAYERS[0];
export type TabType = "leaderboard" | "stats" | "achievements" | "profile";
