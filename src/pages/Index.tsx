import { useState } from "react";
import Icon from "@/components/ui/icon";

const GAMES = ["Все игры", "Valorant", "CS2", "Dota 2", "League of Legends", "Apex Legends"];
const DIFFICULTIES = ["Все уровни", "Новичок", "Любитель", "Эксперт", "Мастер", "Грандмастер"];

const PLAYERS = [
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

const STATS = [
  { label: "Игроков", value: "48 291", icon: "Users" },
  { label: "Матчей", value: "1.2М", icon: "Swords" },
  { label: "Игр", value: "5", icon: "Gamepad2" },
  { label: "Достижений", value: "320", icon: "Trophy" },
];

const ACHIEVEMENTS = [
  { icon: "🏆", name: "Легенда", desc: "Топ-10 мирового рейтинга" },
  { icon: "⚡", name: "Молния", desc: "100 побед подряд" },
  { icon: "🎯", name: "Снайпер", desc: "Winrate выше 75%" },
  { icon: "🔥", name: "В огне", desc: "30-дневная серия побед" },
  { icon: "💎", name: "Бриллиант", desc: "10 000+ рейтинга" },
  { icon: "🌟", name: "Звезда", desc: "Выбор сообщества" },
];

function RankBadge({ rank }: { rank: number }) {
  if (rank === 1) return <span className="font-display text-lg rank-gold font-bold">01</span>;
  if (rank === 2) return <span className="font-display text-lg rank-silver font-bold">02</span>;
  if (rank === 3) return <span className="font-display text-lg rank-bronze font-bold">03</span>;
  return <span className="font-display text-lg text-muted-foreground font-medium">{String(rank).padStart(2, "0")}</span>;
}

function TrendIcon({ trend }: { trend: string }) {
  if (trend === "up") return <Icon name="TrendingUp" size={14} className="neon-text" />;
  if (trend === "down") return <Icon name="TrendingDown" size={14} className="text-destructive" />;
  return <Icon name="Minus" size={14} className="text-muted-foreground" />;
}

function LevelBadge({ level }: { level: string }) {
  const colors: Record<string, string> = {
    "Грандмастер": "text-amber-400 bg-amber-400/10 border-amber-400/30",
    "Мастер": "text-purple-400 bg-purple-400/10 border-purple-400/30",
    "Эксперт": "text-blue-400 bg-blue-400/10 border-blue-400/30",
    "Любитель": "text-teal-400 bg-teal-400/10 border-teal-400/30",
    "Новичок": "text-slate-400 bg-slate-400/10 border-slate-400/30",
  };
  return (
    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${colors[level] || "text-slate-400"}`}>
      {level}
    </span>
  );
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<"leaderboard" | "stats" | "achievements" | "profile">("leaderboard");
  const [selectedGame, setSelectedGame] = useState("Все игры");
  const [selectedLevel, setSelectedLevel] = useState("Все уровни");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlayer, setSelectedPlayer] = useState<typeof PLAYERS[0] | null>(null);

  const filtered = PLAYERS.filter((p) => {
    const matchGame = selectedGame === "Все игры" || p.game === selectedGame;
    const matchLevel = selectedLevel === "Все уровни" || p.level === selectedLevel;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchGame && matchLevel && matchSearch;
  });

  return (
    <div className="min-h-screen bg-background grid-bg">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded bg-primary/20 border border-primary/40 flex items-center justify-center animate-pulse-neon">
              <Icon name="Zap" size={14} className="neon-text" />
            </div>
            <span className="font-display text-lg tracking-widest neon-text uppercase">RankZone</span>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {(["leaderboard", "stats", "achievements", "profile"] as const).map((tab) => {
              const labels: Record<string, string> = {
                leaderboard: "Лидерборд",
                stats: "Статистика",
                achievements: "Достижения",
                profile: "Профиль",
              };
              const icons: Record<string, string> = {
                leaderboard: "List",
                stats: "BarChart2",
                achievements: "Star",
                profile: "User",
              };
              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded text-sm transition-all ${
                    activeTab === tab
                      ? "bg-primary/15 neon-text border border-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon name={icons[tab]} size={14} />
                  {labels[tab]}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground hidden sm:block">31 Мар 2026</span>
            <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
              <Icon name="User" size={14} className="neon-text" />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">

        {/* Hero Strip */}
        <div className="mb-6 animate-fade-up stagger-1">
          <div className="flex items-end gap-4 mb-1">
            <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground uppercase">
              Мировой <span className="neon-text">Рейтинг</span>
            </h1>
          </div>
          <p className="text-muted-foreground text-sm">Топ игроков по играм, уровням и достижениям</p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`bg-card border border-border/60 rounded-lg px-4 py-3 flex items-center gap-3 animate-fade-up stagger-${i + 1}`}
            >
              <div className="w-8 h-8 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                <Icon name={s.icon} size={16} className="neon-text" />
              </div>
              <div>
                <div className="font-display text-xl tracking-tight neon-text">{s.value}</div>
                <div className="text-xs text-muted-foreground">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile nav */}
        <div className="flex md:hidden gap-1 mb-4 overflow-x-auto pb-1">
          {(["leaderboard", "stats", "achievements", "profile"] as const).map((tab) => {
            const labels: Record<string, string> = {
              leaderboard: "Лидерборд",
              stats: "Статистика",
              achievements: "Достижения",
              profile: "Профиль",
            };
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`whitespace-nowrap px-3 py-1.5 rounded text-xs transition-all ${
                  activeTab === tab
                    ? "bg-primary/15 neon-text border border-primary/30"
                    : "text-muted-foreground bg-card border border-border/40"
                }`}
              >
                {labels[tab]}
              </button>
            );
          })}
        </div>

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="animate-fade-up stagger-2">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <div className="relative flex-1">
                <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Поиск игрока..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border/60 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedGame}
                onChange={(e) => setSelectedGame(e.target.value)}
                className="bg-card border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
              >
                {GAMES.map((g) => <option key={g}>{g}</option>)}
              </select>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="bg-card border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
              >
                {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
              </select>
            </div>

            {/* Table Header */}
            <div className="grid grid-cols-[40px_1fr_120px_80px_80px_60px] md:grid-cols-[48px_1fr_140px_100px_90px_80px_60px] gap-2 px-4 mb-2 text-xs text-muted-foreground uppercase tracking-wider">
              <span>#</span>
              <span>Игрок</span>
              <span className="hidden md:block">Игра</span>
              <span>Рейтинг</span>
              <span>Побед</span>
              <span className="hidden md:block">Win%</span>
              <span>Тренд</span>
            </div>

            {/* Player rows */}
            <div className="space-y-1.5">
              {filtered.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Icon name="SearchX" size={32} className="mx-auto mb-2 opacity-30" />
                  <p>Игроки не найдены</p>
                </div>
              )}
              {filtered.map((player, idx) => (
                <div
                  key={player.id}
                  onClick={() => { setSelectedPlayer(player); setActiveTab("profile"); }}
                  className={`grid grid-cols-[40px_1fr_120px_80px_80px_60px] md:grid-cols-[48px_1fr_140px_100px_90px_80px_60px] gap-2 items-center px-4 py-3 rounded-lg border cursor-pointer card-hover animate-fade-up
                    ${player.rank <= 3
                      ? "border-primary/20 bg-card"
                      : "border-border/40 bg-card/60"
                    }`}
                  style={{ animationDelay: `${idx * 0.04}s`, opacity: 0 }}
                >
                  <RankBadge rank={player.rank} />
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                      player.rank === 1 ? "bg-amber-400/20 text-amber-400 border border-amber-400/30" :
                      player.rank === 2 ? "bg-slate-400/20 text-slate-300 border border-slate-400/30" :
                      player.rank === 3 ? "bg-orange-700/20 text-orange-400 border border-orange-700/30" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {player.name[0]}
                    </div>
                    <div className="min-w-0">
                      <div className="font-medium text-sm truncate">{player.name}</div>
                      <div className="text-xs text-muted-foreground">{player.country} · {player.achievements} 🏅</div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <span className="text-xs text-muted-foreground bg-secondary px-2 py-0.5 rounded">{player.game}</span>
                  </div>
                  <div className="font-display text-sm neon-text font-medium">{player.rating.toLocaleString()}</div>
                  <div className="text-sm text-foreground">{player.wins.toLocaleString()}</div>
                  <div className="hidden md:flex items-center gap-1">
                    <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full progress-bar rounded-full" style={{ width: `${player.winrate}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground w-8 text-right">{player.winrate}%</span>
                  </div>
                  <div className="flex justify-center">
                    <TrendIcon trend={player.trend} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Stats Tab */}
        {activeTab === "stats" && (
          <div className="animate-fade-up stagger-2">
            <h2 className="font-display text-2xl uppercase mb-4 text-foreground">Статистика платформы</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {/* Top games */}
              <div className="bg-card border border-border/60 rounded-lg p-5">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Топ игр по игрокам</h3>
                <div className="space-y-3">
                  {[
                    { game: "Valorant", players: 14820, pct: 92 },
                    { game: "CS2", players: 12310, pct: 76 },
                    { game: "Dota 2", players: 10450, pct: 65 },
                    { game: "League of Legends", players: 7200, pct: 44 },
                    { game: "Apex Legends", players: 3511, pct: 22 },
                  ].map((g) => (
                    <div key={g.game} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className="text-foreground">{g.game}</span>
                        <span className="text-muted-foreground">{g.players.toLocaleString()}</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full progress-bar rounded-full transition-all duration-700" style={{ width: `${g.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Level distribution */}
              <div className="bg-card border border-border/60 rounded-lg p-5">
                <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Распределение по уровням</h3>
                <div className="space-y-3">
                  {[
                    { level: "Грандмастер", count: 142, color: "bg-amber-400", pct: 8 },
                    { level: "Мастер", count: 1204, color: "bg-purple-400", pct: 22 },
                    { level: "Эксперт", count: 8750, color: "bg-blue-400", pct: 48 },
                    { level: "Любитель", count: 24100, color: "bg-teal-400", pct: 72 },
                    { level: "Новичок", count: 14095, color: "bg-slate-400", pct: 40 },
                  ].map((l) => (
                    <div key={l.level} className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${l.color} shrink-0`} />
                      <span className="text-sm text-foreground w-32">{l.level}</span>
                      <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div className={`h-full ${l.color} rounded-full opacity-80`} style={{ width: `${l.pct}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground w-16 text-right">{l.count.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent activity */}
            <div className="bg-card border border-border/60 rounded-lg p-5">
              <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Активность за 7 дней</h3>
              <div className="flex items-end gap-2 h-28">
                {[42, 78, 65, 91, 55, 83, 100].map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm progress-bar transition-all duration-500"
                      style={{ height: `${h}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{["Пн","Вт","Ср","Чт","Пт","Сб","Вс"][i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Achievements Tab */}
        {activeTab === "achievements" && (
          <div className="animate-fade-up stagger-2">
            <h2 className="font-display text-2xl uppercase mb-4 text-foreground">Достижения</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <div
                  key={a.name}
                  className={`bg-card border border-border/60 rounded-lg p-5 flex flex-col items-start gap-3 card-hover animate-fade-up`}
                  style={{ animationDelay: `${i * 0.07}s`, opacity: 0 }}
                >
                  <span className="text-3xl">{a.icon}</span>
                  <div>
                    <div className="font-display text-base uppercase tracking-wide text-foreground">{a.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{a.desc}</div>
                  </div>
                  <div className="mt-auto w-full">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Получено</span>
                      <span className="neon-text">{Math.floor(Math.random() * 4800 + 200)}</span>
                    </div>
                    <div className="h-1 bg-secondary rounded-full overflow-hidden">
                      <div className="h-full progress-bar" style={{ width: `${Math.floor(Math.random() * 60 + 30)}%` }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="animate-fade-up stagger-2">
            {selectedPlayer ? (
              <>
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-5 transition-colors"
                >
                  <Icon name="ChevronLeft" size={16} />
                  Назад к рейтингу
                </button>
                <div className="grid md:grid-cols-3 gap-4">
                  {/* Player card */}
                  <div className="bg-card border border-border/60 rounded-lg p-6 flex flex-col items-center text-center gap-3">
                    <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold border-2 ${
                      selectedPlayer.rank === 1 ? "border-amber-400 bg-amber-400/10 text-amber-400" :
                      selectedPlayer.rank === 2 ? "border-slate-400 bg-slate-400/10 text-slate-300" :
                      selectedPlayer.rank === 3 ? "border-orange-600 bg-orange-700/10 text-orange-400" :
                      "border-primary/40 bg-primary/10 neon-text"
                    }`}>
                      {selectedPlayer.name[0]}
                    </div>
                    <div>
                      <h2 className="font-display text-2xl uppercase tracking-wide">{selectedPlayer.name}</h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{selectedPlayer.country} · {selectedPlayer.game}</p>
                    </div>
                    <LevelBadge level={selectedPlayer.level} />
                    <div className="w-full border-t border-border/40 pt-3 mt-1">
                      <div className="font-display text-3xl neon-text">{selectedPlayer.rating.toLocaleString()}</div>
                      <div className="text-xs text-muted-foreground">Рейтинговых очков</div>
                    </div>
                    <div className="w-full grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="font-display text-lg text-foreground">#{selectedPlayer.rank}</div>
                        <div className="text-xs text-muted-foreground">Место</div>
                      </div>
                      <div>
                        <div className="font-display text-lg text-foreground">{selectedPlayer.wins}</div>
                        <div className="text-xs text-muted-foreground">Побед</div>
                      </div>
                      <div>
                        <div className="font-display text-lg text-foreground">{selectedPlayer.achievements}</div>
                        <div className="text-xs text-muted-foreground">Медалей</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="md:col-span-2 space-y-3">
                    <div className="bg-card border border-border/60 rounded-lg p-5">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-4">Игровая статистика</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Winrate", value: `${selectedPlayer.winrate}%`, icon: "Target" },
                          { label: "Матчей", value: Math.floor(selectedPlayer.wins / (selectedPlayer.winrate / 100)).toLocaleString(), icon: "Swords" },
                          { label: "Победная серия", value: `${Math.floor(Math.random() * 15 + 3)}`, icon: "Flame" },
                          { label: "Часов в игре", value: `${Math.floor(selectedPlayer.wins * 0.8 + 200)}`, icon: "Clock" },
                        ].map((s) => (
                          <div key={s.label} className="bg-secondary/40 rounded-lg p-3 flex items-center gap-3">
                            <Icon name={s.icon} size={18} className="neon-text shrink-0" />
                            <div>
                              <div className="font-display text-xl text-foreground">{s.value}</div>
                              <div className="text-xs text-muted-foreground">{s.label}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-card border border-border/60 rounded-lg p-5">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Прогресс рейтинга</h3>
                      <div className="flex items-end gap-1.5 h-20">
                        {[60, 45, 72, 58, 80, 67, 88, 75, 91, 85, 95, 100].map((h, i) => (
                          <div
                            key={i}
                            className="flex-1 rounded-sm progress-bar opacity-70 hover:opacity-100 transition-opacity"
                            style={{ height: `${h}%` }}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Динамика за последние 12 недель</p>
                    </div>

                    <div className="bg-card border border-border/60 rounded-lg p-5">
                      <h3 className="font-medium text-sm text-muted-foreground uppercase tracking-wider mb-3">Достижения игрока</h3>
                      <div className="flex flex-wrap gap-2">
                        {ACHIEVEMENTS.slice(0, selectedPlayer.achievements > 40 ? 6 : selectedPlayer.achievements > 30 ? 5 : 4).map((a) => (
                          <div key={a.name} title={a.desc} className="flex items-center gap-1.5 bg-secondary/50 border border-border/40 rounded-full px-3 py-1 text-xs">
                            <span>{a.icon}</span>
                            <span className="text-foreground">{a.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-16 h-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <Icon name="User" size={28} className="neon-text" />
                </div>
                <h2 className="font-display text-xl uppercase mb-2">Профиль игрока</h2>
                <p className="text-muted-foreground text-sm mb-6">Выбери игрока из лидерборда, чтобы посмотреть профиль</p>
                <button
                  onClick={() => setActiveTab("leaderboard")}
                  className="bg-primary/15 border border-primary/30 neon-text px-5 py-2 rounded-lg text-sm hover:bg-primary/25 transition-colors"
                >
                  Открыть лидерборд
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 mt-12 py-6 text-center">
        <p className="text-xs text-muted-foreground">
          <span className="neon-text font-display tracking-widest">RANKZONE</span>
          {" "}· Мировые игровые рейтинги · 2026
        </p>
      </footer>
    </div>
  );
}
