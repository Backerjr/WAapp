import { Unit, Progress } from '../../types';

interface SkillTreeProps {
  units: Unit[];
  progress: Progress;
  onStartLesson: (lessonId: string) => void;
}

function SkillTree({ units, progress, onStartLesson }: SkillTreeProps) {
  return (
    <main className="skill-tree">
      <div className="skill-tree-header">
        <h2>🪞 The grass isn't greener on the other side.</h2>
        <p>It's greener where you water it — with words, patience, and presence.</p>
      </div>

      {units.map((unit, unitIndex) => {
        const allPreviousLessonsCompleted = unitIndex === 0 || 
          units.slice(0, unitIndex).every(u => 
            u.lessons.every(l => progress.completedLessons.includes(l.id))
          );

        return (
          <div key={unit.id} className="unit">
            <div className="unit-header">
              <div className="unit-title-section">
                <h3>{unit.title_pl}</h3>
                <span className="cefr-badge">{unit.cefr}</span>
              </div>
              {unit.description_pl && (
                <p className="unit-description">{unit.description_pl}</p>
              )}
            </div>

            <div className="lessons-grid">
              {unit.lessons.map((lesson, lessonIndex) => {
                const isCompleted = progress.completedLessons.includes(lesson.id);
                const prevLessonCompleted = lessonIndex === 0 ||
                  progress.completedLessons.includes(unit.lessons[lessonIndex - 1].id);
                const isLocked = !allPreviousLessonsCompleted || 
                  (lessonIndex > 0 && !prevLessonCompleted);

                return (
                  <div
                    key={lesson.id}
                    className={`lesson-module ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                  >
                    <div className="module-icon">
                      {isLocked ? '🔒' : lesson.icon || '🌙'}
                    </div>
                    
                    <div className="module-content">
                      <h4 className="module-title">{lesson.title_pl}</h4>
                      <p className="module-subtitle">{lesson.title_en}</p>
                      {lesson.description_pl && (
                        <p className="module-description">{lesson.description_pl}</p>
                      )}
                      
                      <div className="module-meta">
                        <div className="xp-display">
                          <span className="xp-icon">✨</span>
                          <span className="xp-value">{lesson.xp} XP</span>
                        </div>
                        
                        <div className="progress-indicator">
                          <div className={`progress-circle ${isCompleted ? 'completed' : isLocked ? 'locked' : 'available'}`}>
                            {isCompleted && <span className="check-mark">✓</span>}
                            {isLocked && <span className="lock-icon">🔒</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      className={`start-btn ${isLocked ? 'disabled' : ''}`}
                      onClick={() => !isLocked && onStartLesson(lesson.id)}
                      disabled={isLocked}
                    >
                      {isCompleted ? (
                        <>
                          <span className="btn-icon">🔄</span>
                          <span>Powtórz</span>
                        </>
                      ) : isLocked ? (
                        <>
                          <span className="btn-icon">🔒</span>
                          <span>Zablokowane</span>
                        </>
                      ) : (
                        <>
                          <span className="btn-icon">🚀</span>
                          <span>Rozpocznij</span>
                        </>
                      )}
                    </button>
                  </div>
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
