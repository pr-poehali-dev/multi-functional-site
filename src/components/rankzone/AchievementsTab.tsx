import Icon from "@/components/ui/icon";
import { ACHIEVEMENTS, type Player, type TabType } from "./data";
import { LevelBadge } from "./LeaderboardTab";

export function AchievementsTab() {
  return (
    <div className="animate-fade-up stagger-2">
      <h2 className="font-display text-2xl uppercase mb-4 text-foreground">Достижения</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {ACHIEVEMENTS.map((a, i) => (
          <div
            key={a.name}
            className="bg-card border border-border/60 rounded-lg p-5 flex flex-col items-start gap-3 card-hover animate-fade-up"
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
  );
}

interface ProfileTabProps {
  selectedPlayer: Player | null;
  onBack: () => void;
  onOpenLeaderboard: () => void;
}

export function ProfileTab({ selectedPlayer, onBack, onOpenLeaderboard }: ProfileTabProps) {
  return (
    <div className="animate-fade-up stagger-2">
      {selectedPlayer ? (
        <>
          <button
            onClick={onBack}
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
            onClick={onOpenLeaderboard}
            className="bg-primary/15 border border-primary/30 neon-text px-5 py-2 rounded-lg text-sm hover:bg-primary/25 transition-colors"
          >
            Открыть лидерборд
          </button>
        </div>
      )}
    </div>
  );
}

export default AchievementsTab;
