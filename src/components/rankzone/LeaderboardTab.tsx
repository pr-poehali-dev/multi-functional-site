import Icon from "@/components/ui/icon";
import { GAMES, DIFFICULTIES, type Player } from "./data";

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

export function LevelBadge({ level }: { level: string }) {
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

interface LeaderboardTabProps {
  filtered: Player[];
  searchQuery: string;
  selectedGame: string;
  selectedLevel: string;
  onSearchChange: (v: string) => void;
  onGameChange: (v: string) => void;
  onLevelChange: (v: string) => void;
  onPlayerClick: (player: Player) => void;
}

export default function LeaderboardTab({
  filtered,
  searchQuery,
  selectedGame,
  selectedLevel,
  onSearchChange,
  onGameChange,
  onLevelChange,
  onPlayerClick,
}: LeaderboardTabProps) {
  return (
    <div className="animate-fade-up stagger-2">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Поиск игрока..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-card border border-border/60 rounded-lg pl-9 pr-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20"
          />
        </div>
        <select
          value={selectedGame}
          onChange={(e) => onGameChange(e.target.value)}
          className="bg-card border border-border/60 rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:border-primary/50 appearance-none cursor-pointer"
        >
          {GAMES.map((g) => <option key={g}>{g}</option>)}
        </select>
        <select
          value={selectedLevel}
          onChange={(e) => onLevelChange(e.target.value)}
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
            onClick={() => onPlayerClick(player)}
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
  );
}
