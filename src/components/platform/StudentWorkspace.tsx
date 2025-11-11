import { type FC } from 'react';
import { themeTokens } from '../../design-system/tokens';
import { usePlatformState } from '../../lib/state/academics';

interface StudentWorkspaceProps {
  studentId: string;
}

export const StudentWorkspace: FC<StudentWorkspaceProps> = ({ studentId }) => {
  const { schedules } = usePlatformState();
  const cohort = schedules.find((schedule) => schedule.roster.some((entry) => entry.studentId === studentId));
  const student = cohort?.roster.find((entry) => entry.studentId === studentId);

  if (!cohort || !student) {
    return (
      <section
        aria-label="student workspace empty state"
        className="flex h-full min-h-[240px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-white"
        style={{
          background: themeTokens.colors.background.surface,
          boxShadow: themeTokens.shadows.sm,
        }}
      >
        <p className="text-lg font-semibold text-white/80">Workspace ready for activation</p>
        <p className="mt-2 max-w-sm text-center text-sm text-white/60">
          Choose a student profile to unlock their adaptive learning lane, live AI co-pilot, and upcoming milestones.
        </p>
      </section>
    );
  }

  const nextLesson = cohort.lessons[0];

  return (
    <section
      aria-label={`workspace for ${student.studentName}`}
      className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr]"
      style={{
        background: themeTokens.colors.background.surface,
        boxShadow: themeTokens.shadows.lg,
      }}
    >
      <article className="space-y-5">
        <header>
          <p className="text-sm uppercase tracking-[0.2em] text-white/50">Student workspace</p>
          <h2 className="text-3xl font-semibold" style={{ fontFamily: themeTokens.typography.fontFamily.display }}>
            {student.studentName}
          </h2>
          <p className="text-white/60">{cohort.cohortName} · {cohort.focus}</p>
        </header>
        <section aria-label="progress pulse" className="rounded-2xl border border-white/10 bg-white/[0.06] p-4 shadow-lg">
          <h3 className="text-lg font-semibold text-white/80">Progress pulse</h3>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-white/50">Mastery</p>
              <p className="text-4xl font-semibold text-white">{student.progressPercent}%</p>
              <p className="text-sm text-white/60">Daily streak intact · keep momentum alive</p>
            </div>
            {nextLesson && (
              <div className="rounded-xl border border-white/10 bg-white/[0.05] p-4">
                <p className="text-xs uppercase tracking-[0.28em] text-white/50">Next mission</p>
                <p className="mt-2 text-lg font-semibold text-white">{nextLesson.title}</p>
                <p className="text-sm text-white/60">{nextLesson.durationMinutes} minutes · {nextLesson.skillLevel}</p>
              </div>
            )}
          </div>
        </section>
      </article>
      <aside className="space-y-4">
        <section aria-label="ai cues" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="text-lg font-semibold text-white/80">AI cues</h3>
          <ul className="mt-3 space-y-3 text-sm text-white/70">
            {student.aiAlerts.map((alert) => (
              <li key={alert.id} className="rounded-xl border border-white/10 bg-white/[0.03] p-3">
                <p className="font-medium text-white/80">{alert.message}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">{alert.severity}</p>
              </li>
            ))}
          </ul>
        </section>
        <section aria-label="daily ritual" className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
          <h3 className="text-lg font-semibold text-white/80">Daily ritual</h3>
          <ol className="mt-3 space-y-3 text-sm text-white/70">
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="font-medium text-white">Warm-up · breathing cadence + shadow reading</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="font-medium text-white">Dive into lesson stream with live AI hints</p>
            </li>
            <li className="rounded-xl border border-white/10 bg-white/[0.02] p-3">
              <p className="font-medium text-white">Reflect & journal using translation coach</p>
            </li>
          </ol>
        </section>
      </aside>
    </section>
  );
};

export default StudentWorkspace;
