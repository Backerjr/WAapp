import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AttendanceStatus = 'present' | 'late' | 'absent' | 'excused';
export type SkillLevel = 'foundation' | 'intermediate' | 'advanced' | 'mastery';

export interface LessonMetric {
  comprehension: number;
  fluency: number;
  retention: number;
  aiConfidence: number;
}

export interface Lesson {
  id: string;
  title: string;
  skillLevel: SkillLevel;
  durationMinutes: number;
  objectives: string[];
  transcriptUrl?: string;
  metrics: LessonMetric;
}

export interface ClassRosterEntry {
  studentId: string;
  studentName: string;
  avatarUrl?: string;
  progressPercent: number;
  lastCheckIn: string;
  attendance: AttendanceStatus;
  aiAlerts: Array<{
    id: string;
    message: string;
    severity: 'info' | 'warning' | 'critical';
  }>;
}

export interface ClassSchedule {
  id: string;
  cohortName: string;
  language: string;
  instructor: string;
  schedule: string;
  focus: string;
  lessons: Lesson[];
  roster: ClassRosterEntry[];
}

export interface AchievementPulse {
  id: string;
  name: string;
  trend: 'up' | 'flat' | 'down';
  delta: number;
  cohortId: string;
}

export interface PlatformSnapshot {
  date: string;
  activeStudents: number;
  engagedMinutes: number;
  aiRecommendations: number;
  completedAssignments: number;
}

export interface PlatformState {
  schedules: ClassSchedule[];
  achievementPulses: AchievementPulse[];
  snapshots: PlatformSnapshot[];
  lastSyncIso: string;
  updateAttendance: (cohortId: string, studentId: string, status: AttendanceStatus) => void;
  logSnapshot: (snapshot: PlatformSnapshot) => void;
}

const baseSchedules: ClassSchedule[] = [
  {
    id: 'cohort-a',
    cohortName: 'Cosmic Explorers A',
    language: 'Polish',
    instructor: 'Alicja Kowalska',
    schedule: 'Mon · Wed · Fri — 09:00 CET',
    focus: 'Conversational fluency and listening confidence',
    lessons: [
      {
        id: 'lesson-aurora',
        title: 'Navigating City Conversations',
        skillLevel: 'intermediate',
        durationMinutes: 45,
        objectives: [
          'Decode contextual cues in fast-paced dialogue',
          'Respond with culturally aware phrasing',
          'Leverage AI prompts for pronunciation refinement',
        ],
        transcriptUrl: '/transcripts/lesson-aurora.json',
        metrics: {
          comprehension: 0.76,
          fluency: 0.68,
          retention: 0.81,
          aiConfidence: 0.72,
        },
      },
      {
        id: 'lesson-spectrum',
        title: 'Emotion Mapping in Dialogue',
        skillLevel: 'advanced',
        durationMinutes: 50,
        objectives: [
          'Identify tonal shifts in native dialogue',
          'Build empathy-driven responses in Polish',
          'Capture emotions using adaptive journaling',
        ],
        metrics: {
          comprehension: 0.82,
          fluency: 0.7,
          retention: 0.78,
          aiConfidence: 0.69,
        },
      },
    ],
    roster: [
      {
        studentId: 'st-1024',
        studentName: 'Leila Tan',
        progressPercent: 72,
        lastCheckIn: '2024-12-18T08:25:00.000Z',
        attendance: 'present',
        aiAlerts: [
          { id: 'alert-a1', message: 'AI flagged listening fatigue · suggest micro-break', severity: 'info' },
        ],
      },
      {
        studentId: 'st-2038',
        studentName: 'Jamal Rivers',
        progressPercent: 64,
        lastCheckIn: '2024-12-17T18:42:00.000Z',
        attendance: 'late',
        aiAlerts: [
          { id: 'alert-a2', message: 'Attendance dip detected · send supportive nudge', severity: 'warning' },
          { id: 'alert-a3', message: 'Strength spike in vocabulary recall', severity: 'info' },
        ],
      },
    ],
  },
  {
    id: 'cohort-b',
    cohortName: 'Nebula Scholars B',
    language: 'Polish',
    instructor: 'Mateusz Nowak',
    schedule: 'Tue · Thu — 15:00 CET',
    focus: 'Writing brilliance and narrative mastery',
    lessons: [
      {
        id: 'lesson-nimbus',
        title: 'Story Weaving with Idioms',
        skillLevel: 'foundation',
        durationMinutes: 40,
        objectives: [
          'Employ idioms to enrich narrative flow',
          'Balance literal and poetic translations',
          'Leverage AI co-writer for structure critiques',
        ],
        metrics: {
          comprehension: 0.71,
          fluency: 0.63,
          retention: 0.67,
          aiConfidence: 0.79,
        },
      },
    ],
    roster: [
      {
        studentId: 'st-3090',
        studentName: 'Asha Banerjee',
        avatarUrl: 'https://avatars.dicebear.com/api/identicon/asha.svg',
        progressPercent: 88,
        lastCheckIn: '2024-12-18T12:05:00.000Z',
        attendance: 'present',
        aiAlerts: [
          { id: 'alert-b1', message: 'AI applauds writing cadence · share with class', severity: 'info' },
        ],
      },
    ],
  },
];

const baseAchievementPulses: AchievementPulse[] = [
  { id: 'pulse-1', name: 'Streak Guardians', trend: 'up', delta: 12, cohortId: 'cohort-a' },
  { id: 'pulse-2', name: 'Pronunciation Masters', trend: 'flat', delta: 0, cohortId: 'cohort-b' },
  { id: 'pulse-3', name: 'Feedback Loop Champions', trend: 'down', delta: -5, cohortId: 'cohort-a' },
];

const baseSnapshots: PlatformSnapshot[] = [
  { date: '2024-12-16', activeStudents: 142, engagedMinutes: 3260, aiRecommendations: 58, completedAssignments: 214 },
  { date: '2024-12-17', activeStudents: 151, engagedMinutes: 3445, aiRecommendations: 66, completedAssignments: 228 },
  { date: '2024-12-18', activeStudents: 169, engagedMinutes: 3712, aiRecommendations: 72, completedAssignments: 245 },
];

export const usePlatformState = create<PlatformState>()(
  persist(
    (set, get) => ({
      schedules: baseSchedules,
      achievementPulses: baseAchievementPulses,
      snapshots: baseSnapshots,
      lastSyncIso: new Date().toISOString(),
      updateAttendance: (cohortId, studentId, status) => {
        set((state) => ({
          ...state,
          schedules: state.schedules.map((schedule) => {
            if (schedule.id !== cohortId) return schedule;
            return {
              ...schedule,
              roster: schedule.roster.map((entry) => {
                if (entry.studentId !== studentId) return entry;
                return {
                  ...entry,
                  attendance: status,
                  aiAlerts: [
                    {
                      id: `auto-${Date.now()}`,
                      message: `Attendance updated to ${status.toUpperCase()} at ${new Date().toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`,
                      severity: status === 'absent' ? 'critical' : 'info',
                    },
                    ...entry.aiAlerts,
                  ],
                };
              }),
            };
          }),
          lastSyncIso: new Date().toISOString(),
        }));
      },
      logSnapshot: (snapshot) => {
        const previousSnapshots = get().snapshots;
        set({
          snapshots: [...previousSnapshots, snapshot],
          lastSyncIso: new Date().toISOString(),
        });
      },
    }),
    {
      name: 'rozmowa-platform-state',
      version: 1,
      partialize: (state) => ({
        schedules: state.schedules,
        achievementPulses: state.achievementPulses,
        snapshots: state.snapshots.slice(-7),
        lastSyncIso: state.lastSyncIso,
      }),
    },
  ),
);
