export default function StatsTab() {
  return (
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
  );
}
