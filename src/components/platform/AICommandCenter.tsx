import { type FC } from 'react';
import { themeTokens } from '../../design-system/tokens';
import { usePlatformState } from '../../lib/state/academics';

interface AICommandCenterProps {
  onBroadcast?: (message: string) => void;
}

const recommendations = [
  {
    id: 'rec-1',
    title: 'Reinforce pronunciation for Cohort A',
    detail: 'Deploy immersive listening loop · highlight dip at 72% comprehension',
  },
  {
    id: 'rec-2',
    title: 'Trigger celebration for Nebula Scholars',
    detail: 'Achievement “Pronunciation Masters” trending flat · schedule recognition moment',
  },
  {
    id: 'rec-3',
    title: 'Offer asynchronous micro-lesson',
    detail: 'Late attendance spike detected · release 8-minute resilience module',
  },
];

export const AICommandCenter: FC<AICommandCenterProps> = ({ onBroadcast }) => {
  const { lastSyncIso } = usePlatformState();

  return (
    <section
      aria-label="ai orchestration hub"
      className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl"
      style={{
        background: themeTokens.colors.background.overlay,
        boxShadow: themeTokens.shadows.glow,
      }}
    >
      <header className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">AI command center</p>
          <h2 className="text-3xl font-semibold" style={{ fontFamily: themeTokens.typography.fontFamily.display }}>
            Cognitive automation stream
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">Synced {new Date(lastSyncIso).toLocaleString()}</p>
      </header>
      <section aria-label="recommended automations" className="space-y-4">
        <h3 className="text-lg font-semibold text-white/80">Recommended automations</h3>
        <ul className="space-y-3">
          {recommendations.map((recommendation) => (
            <li
              key={recommendation.id}
              className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-lg"
              style={{ boxShadow: themeTokens.shadows.sm }}
            >
              <p className="text-sm uppercase tracking-[0.28em] text-white/40">{recommendation.id}</p>
              <h4 className="mt-1 text-xl font-semibold text-white">{recommendation.title}</h4>
              <p className="mt-2 text-sm text-white/70">{recommendation.detail}</p>
              <button
                type="button"
                onClick={() => onBroadcast?.(recommendation.title)}
                className="mt-4 inline-flex items-center justify-center rounded-full border border-white/20 px-4 py-2 text-sm font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-white/10 focus:outline-none focus-visible:ring focus-visible:ring-fuchsia-300"
              >
                Broadcast protocol
              </button>
            </li>
          ))}
        </ul>
      </section>
    </section>
  );
};

export default AICommandCenter;
