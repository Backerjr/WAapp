import { type FC } from 'react';
import { themeTokens } from '../../design-system/tokens';
import { usePlatformState } from '../../lib/state/academics';

interface TeacherConsoleProps {
  cohortId: string;
}

export const TeacherConsole: FC<TeacherConsoleProps> = ({ cohortId }) => {
  const { schedules, updateAttendance } = usePlatformState();
  const schedule = schedules.find((entry) => entry.id === cohortId);

  if (!schedule) {
    return (
      <section
        aria-label="teacher console empty state"
        className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-3xl border border-white/10 bg-white/5 text-center text-white"
        style={{
          background: themeTokens.colors.background.surface,
          boxShadow: themeTokens.shadows.glow,
        }}
      >
        <p className="text-lg font-semibold tracking-wide text-white/80">No cohort selected</p>
        <p className="mt-2 max-w-sm text-sm text-white/60">
          Choose a cohort to orchestrate live feedback, adaptive assignments, and targeted nudges.
        </p>
      </section>
    );
  }

  return (
    <section
      aria-label={`Teacher console for ${schedule.cohortName}`}
      className="grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-xl lg:grid-cols-[1.2fr_1fr]"
      style={{
        background: themeTokens.colors.background.surface,
        boxShadow: themeTokens.shadows.md,
      }}
    >
      <div>
        <header className="flex flex-col gap-1">
          <p className="text-sm uppercase tracking-[0.18em] text-white/50">Instructor cockpit</p>
          <h2 className="text-3xl font-semibold" style={{ fontFamily: themeTokens.typography.fontFamily.display }}>
            {schedule.cohortName}
          </h2>
          <p className="text-white/60">{schedule.schedule} · Guided by {schedule.instructor}</p>
        </header>
        <div className="mt-6 space-y-6">
          <section aria-label="next lessons" className="space-y-4">
            <h3 className="text-lg font-semibold text-white/80">Next lessons</h3>
            <ul className="space-y-3">
              {schedule.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="flex items-start justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-4"
                  style={{ boxShadow: themeTokens.shadows.xs }}
                >
                  <div>
                    <p className="text-base font-semibold text-white/90">{lesson.title}</p>
                    <p className="text-sm text-white/60">{lesson.durationMinutes} min · {lesson.skillLevel}</p>
                    <ul className="mt-3 grid gap-2 text-sm text-white/70">
                      {lesson.objectives.map((objective) => (
                        <li key={objective} className="flex items-center gap-2">
                          <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rounded-full bg-fuchsia-400" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <dl className="grid gap-1 text-right text-xs uppercase text-white/50">
                    <div>
                      <dt className="tracking-[0.24em]">Comprehension</dt>
                      <dd className="text-sm text-white">{Math.round(lesson.metrics.comprehension * 100)}%</dd>
                    </div>
                    <div>
                      <dt className="tracking-[0.24em]">Fluency</dt>
                      <dd className="text-sm text-white">{Math.round(lesson.metrics.fluency * 100)}%</dd>
                    </div>
                    <div>
                      <dt className="tracking-[0.24em]">Retention</dt>
                      <dd className="text-sm text-white">{Math.round(lesson.metrics.retention * 100)}%</dd>
                    </div>
                  </dl>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
      <aside className="space-y-4">
        <h3 className="text-lg font-semibold text-white/80">Live roster control</h3>
        <ul className="space-y-3">
          {schedule.roster.map((entry) => (
            <li
              key={entry.studentId}
              className="rounded-2xl border border-white/10 bg-white/[0.08] p-4 shadow-lg"
              style={{ boxShadow: themeTokens.shadows.sm }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-base font-semibold text-white">{entry.studentName}</p>
                  <p className="text-xs uppercase tracking-[0.32em] text-white/40">{entry.studentId}</p>
                </div>
                <p className="text-sm text-white/70">{entry.progressPercent}% mastery</p>
              </div>
              <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Attendance controls">
                {(['present', 'late', 'absent', 'excused'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => updateAttendance(schedule.id, entry.studentId, status)}
                    className="rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-[0.18em] transition focus:outline-none focus-visible:ring focus-visible:ring-fuchsia-300"
                    style={{
                      backgroundColor:
                        entry.attendance === status ? themeTokens.colors.accent[500] : 'transparent',
                    }}
                  >
                    {status}
                  </button>
                ))}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-white/70">
                {entry.aiAlerts.map((alert) => (
                  <li key={alert.id} className="rounded-xl border border-white/10 bg-white/[0.04] p-3">
                    <p className="font-medium text-white/80">{alert.message}</p>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/40">{alert.severity}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default TeacherConsole;
