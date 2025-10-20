import { Unit, Progress } from '../types';

interface SkillTreeProps {
  units: Unit[];
  progress: Progress;
  onStartLesson: (lessonId: string) => void;
}

function SkillTree({ units, progress, onStartLesson }: SkillTreeProps) {
  return (
    <main className="skill-tree">
      <div className="skill-tree-header">
        <h2>Words Between Worlds</h2>
        <p>Where every conversation leaves a trace of light.</p>
      </div>

      {units.map((unit, unitIndex) => {
        const allPreviousLessonsCompleted = unitIndex === 0 || 
          units.slice(0, unitIndex).every(u => 
            u.lessons.every(l => progress.completedLessons.includes(l.id))
          );

        return (
          <div key={unit.id} className="unit">
            <div className="unit-header">
              <h3>{unit.title_pl}</h3>
              <span className="cefr-badge">{unit.cefr}</span>
            </div>

            <div className="lessons">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const prevLessonCompleted = lessonIndex === 0 ||
                  progress.completedLessons.includes(unit.lessons[lessonIndex - 1].id);
                const isLocked = !allPreviousLessonsCompleted || 
                  (lessonIndex > 0 && !prevLessonCompleted);

                return (
                  <button
                    key={lesson.id}
                    className={`lesson-card ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                    onClick={() => !isLocked && onStartLesson(lesson.id)}
                    disabled={isLocked}
                  >
                    <div className="lesson-icon">
                      {isLocked ? '🔒' : isCompleted ? '✨' : '🌙'}
                    </div>
                    <div className="lesson-info">
                      <h4>{lesson.title_pl}</h4>
                      <p className="lesson-subtitle">{lesson.title_en}</p>
                      <div className="lesson-meta">
                        <span>✨ {lesson.xp} XP</span>
                        <span>📝 {lesson.exercises.length} ćwiczeń</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </main>
  );
}

export default SkillTree;
