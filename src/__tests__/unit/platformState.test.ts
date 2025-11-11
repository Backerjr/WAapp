import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock persist to bypass localStorage in tests - must be before imports
vi.mock('../../lib/state/zustand-persist-lite', () => ({
  persist: (creator: any) => creator,
}));

import { usePlatformState } from '../../lib/state/academics';

describe('usePlatformState', () => {
  beforeEach(() => {
    const { getState, setState } = usePlatformState;
    setState({
      ...getState(),
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
    const absentAlert = updatedStudent?.aiAlerts.find(alert => alert.message.includes('ABSENT'));
    expect(absentAlert).toBeDefined();
    expect(absentAlert?.message).toContain('ABSENT');
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
