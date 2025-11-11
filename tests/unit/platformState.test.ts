import { beforeEach, describe, expect, it, vi } from 'vitest';
import { usePlatformState } from '../../src/lib/state/academics';

vi.mock('zustand/middleware', async (importOriginal) => {
  const actual = await importOriginal<typeof import('zustand/middleware')>();
  return {
    ...actual,
    persist: (creator: Parameters<typeof actual.persist>[0]) => (set: any, get: any, api: any) =>
      creator(set, get, api),
  };
});

describe('usePlatformState', () => {
  beforeEach(() => {
    const { getState, setState } = usePlatformState;
    setState({
      ...getState(),
      schedules: getState().schedules,
      achievementPulses: getState().achievementPulses,
      snapshots: getState().snapshots,
      lastSyncIso: new Date('2024-12-18T00:00:00.000Z').toISOString(),
    });
  });

  it('updates attendance with ai alert injection', () => {
    const state = usePlatformState.getState();
    const firstCohort = state.schedules[0];
    const targetStudent = firstCohort.roster[0];

    usePlatformState.getState().updateAttendance(firstCohort.id, targetStudent.studentId, 'absent');

    const updatedStudent = usePlatformState
      .getState()
      .schedules[0].roster.find((entry) => entry.studentId === targetStudent.studentId);

    expect(updatedStudent?.attendance).toBe('absent');
    expect(updatedStudent?.aiAlerts[0].message).toContain('ABSENT');
  });

  it('logs snapshot and advances sync timestamp', () => {
    const previousSync = usePlatformState.getState().lastSyncIso;
    usePlatformState.getState().logSnapshot({
      date: '2024-12-19',
      activeStudents: 174,
      engagedMinutes: 3895,
      aiRecommendations: 79,
      completedAssignments: 256,
    });

    const store = usePlatformState.getState();
    expect(store.snapshots.at(-1)?.date).toBe('2024-12-19');
    expect(new Date(store.lastSyncIso).getTime()).toBeGreaterThan(new Date(previousSync).getTime());
  });
});
