import { type FC } from 'react';
import { themeTokens } from '../../design-system/tokens';
import { usePlatformState } from '../../lib/state/academics';

export const ManagerDashboard: FC = () => {
  const { achievementPulses, snapshots } = usePlatformState();
  const latest = snapshots.at(-1);

  return (
    <section
      aria-label="operations intelligence overview"
      className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl"
      style={{
        background: themeTokens.colors.background.surface,
        boxShadow: themeTokens.shadows.md,
      }}
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">Operations command</p>
          <h2 className="text-3xl font-semibold" style={{ fontFamily: themeTokens.typography.fontFamily.display }}>
            Adaptive campus telemetry
          </h2>
        </div>
        {latest && (
          <dl className="grid grid-cols-2 gap-4 text-right text-sm">
            <div>
              <dt className="uppercase tracking-[0.2em] text-white/50">Active learners</dt>
              <dd className="text-2xl font-semibold text-white">{latest.activeStudents}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-white/50">Engaged minutes</dt>
              <dd className="text-2xl font-semibold text-white">{latest.engagedMinutes}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-white/50">AI nudges</dt>
              <dd className="text-2xl font-semibold text-white">{latest.aiRecommendations}</dd>
            </div>
            <div>
              <dt className="uppercase tracking-[0.2em] text-white/50">Assignments</dt>
              <dd className="text-2xl font-semibold text-white">{latest.completedAssignments}</dd>
            </div>
          </dl>
        )}
      </header>
      <section aria-label="achievement pulses" className="grid gap-4 md:grid-cols-3">
        {achievementPulses.map((pulse) => (
          <article
            key={pulse.id}
            className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg"
            style={{ boxShadow: themeTokens.shadows.sm }}
          >
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">Pulse</p>
            <h3 className="mt-2 text-xl font-semibold text-white">{pulse.name}</h3>
            <p className="mt-1 text-sm text-white/60">Cohort: {pulse.cohortId}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.28em] text-white/50">trend</span>
              <span className="text-lg font-semibold text-white">
                {pulse.trend === 'up' && '+'}
                {pulse.delta}%
              </span>
            </div>
          </article>
        ))}
      </section>
      <section aria-label="engagement timeline" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
        <h3 className="text-lg font-semibold text-white/80">Seven day trajectory</h3>
        <ul className="mt-4 grid gap-3 text-sm text-white/70 md:grid-cols-3">
          {snapshots.slice(-7).map((snapshot) => (
            <li key={snapshot.date} className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{snapshot.date}</p>
              <p className="mt-1 font-medium text-white">{snapshot.activeStudents} active students</p>
              <p className="text-white/60">{snapshot.engagedMinutes} engaged minutes</p>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default ManagerDashboard;
