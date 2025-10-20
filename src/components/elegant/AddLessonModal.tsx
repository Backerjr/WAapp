import { useState } from 'react';
import { Lesson, Exercise, ExerciseType } from '../../types';
import './AddLessonModal.css';

interface AddLessonModalProps {
  onClose?: () => void;
}

const exerciseTypeOptions: { value: ExerciseType; label: string }[] = [
  { value: 'multiple_choice', label: 'Multiple Choice' },
  { value: 'type_answer', label: 'Type Answer' },
  { value: 'listen_and_select', label: 'Listen and Select' },
  { value: 'listen_and_type', label: 'Listen and Type' },
  { value: 'drag_words', label: 'Drag Words' },
  { value: 'image_match', label: 'Image Match' },
  { value: 'fill_blanks', label: 'Fill Blanks' }
];

const AddLessonModal: React.FC<AddLessonModalProps> = ({ onClose }) => {
  const [lesson, setLesson] = useState<Partial<Lesson>>({
    title_pl: '',
    title_en: '',
    icon: '📚',
    description_pl: '',
    description_en: '',
    exercises: [],
    xp: 10
  });

  const [currentExercise, setCurrentExercise] = useState<Partial<Exercise>>({
    type: 'multiple_choice',
    prompt_en: '',
    prompt_pl: '',
    correctAnswer: '',
    options: ['', '', '', '']
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle');

  const addExercise = () => {
    if (!currentExercise.prompt_en || !currentExercise.prompt_pl || !currentExercise.correctAnswer) {
      alert('Please fill in all required fields for the exercise.');
      return;
    }

    const exercise: Exercise = {
      id: `ex-${Date.now()}`,
      type: currentExercise.type as ExerciseType,
      prompt_en: currentExercise.prompt_en,
      prompt_pl: currentExercise.prompt_pl,
      correctAnswer: currentExercise.correctAnswer,
      options: currentExercise.options?.filter(opt => opt.trim() !== ''),
      hint_pl: currentExercise.hint_pl,
      audioText: currentExercise.audioText
    };

    setLesson(prev => ({
      ...prev,
      exercises: [...(prev.exercises || []), exercise]
    }));

    // Reset current exercise
    setCurrentExercise({
      type: 'multiple_choice',
      prompt_en: '',
      prompt_pl: '',
      correctAnswer: '',
      options: ['', '', '', '']
    });
  };

  const removeExercise = (index: number) => {
    setLesson(prev => ({
      ...prev,
      exercises: prev.exercises?.filter((_, i) => i !== index) || []
    }));
  };

  const saveLesson = async () => {
    if (!lesson.title_en || !lesson.title_pl || !lesson.exercises?.length) {
      alert('Please fill in lesson title and add at least one exercise.');
      return;
    }

    setIsSaving(true);
    setSaveStatus('saving');

    try {
      // Simulate saving to JSON (in real app, this would be an API call)
      const newLesson: Lesson = {
        id: `lesson-${Date.now()}`,
        title_pl: lesson.title_pl,
        title_en: lesson.title_en,
        icon: lesson.icon || '📚',
        description_pl: lesson.description_pl,
        description_en: lesson.description_en,
        exercises: lesson.exercises as Exercise[],
        xp: lesson.xp || 10
      };

      // Auto-save to localStorage for demo purposes
      const savedLessons = JSON.parse(localStorage.getItem('custom-lessons') || '[]');
      savedLessons.push(newLesson);
      localStorage.setItem('custom-lessons', JSON.stringify(savedLessons));

      setSaveStatus('success');
      
      // Auto-close after success
      setTimeout(() => {
        onClose?.();
      }, 2000);

    } catch (error) {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="add-lesson-modal">
      <div className="lesson-form">
        <div className="form-header">
          <h3>Create New Lesson</h3>
          <div className="auto-save-indicator">
            {saveStatus === 'saving' && <span className="saving">💾 Saving...</span>}
            {saveStatus === 'success' && <span className="success">✅ Saved!</span>}
            {saveStatus === 'error' && <span className="error">❌ Error</span>}
          </div>
        </div>

        <div className="lesson-details">
          <div className="form-row">
            <div className="form-group">
              <label>Title (English)</label>
              <input
                type="text"
                value={lesson.title_en}
                onChange={(e) => setLesson(prev => ({ ...prev, title_en: e.target.value }))}
                placeholder="Enter lesson title in English"
              />
            </div>
            
            <div className="form-group">
              <label>Title (Polish)</label>
              <input
                type="text"
                value={lesson.title_pl}
                onChange={(e) => setLesson(prev => ({ ...prev, title_pl: e.target.value }))}
                placeholder="Enter lesson title in Polish"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Icon</label>
              <input
                type="text"
                value={lesson.icon}
                onChange={(e) => setLesson(prev => ({ ...prev, icon: e.target.value }))}
                placeholder="📚"
                maxLength={2}
              />
            </div>
            
            <div className="form-group">
              <label>XP Reward</label>
              <input
                type="number"
                value={lesson.xp}
                onChange={(e) => setLesson(prev => ({ ...prev, xp: Number(e.target.value) }))}
                min="1"
                max="100"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description (English)</label>
            <textarea
              value={lesson.description_en}
              onChange={(e) => setLesson(prev => ({ ...prev, description_en: e.target.value }))}
              placeholder="A poetic description of this lesson's journey..."
              rows={2}
            />
          </div>
        </div>

        <div className="exercises-section">
          <h4>Exercises ({lesson.exercises?.length || 0})</h4>
          
          <div className="exercise-form">
            <div className="form-group">
              <label>Exercise Type</label>
              <select
                value={currentExercise.type}
                onChange={(e) => setCurrentExercise(prev => ({ 
                  ...prev, 
                  type: e.target.value as ExerciseType 
                }))}
              >
                {exerciseTypeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Prompt (English)</label>
                <input
                  type="text"
                  value={currentExercise.prompt_en}
                  onChange={(e) => setCurrentExercise(prev => ({ 
                    ...prev, 
                    prompt_en: e.target.value 
                  }))}
                  placeholder="What is this in Polish?"
                />
              </div>
              
              <div className="form-group">
                <label>Prompt (Polish)</label>
                <input
                  type="text"
                  value={currentExercise.prompt_pl}
                  onChange={(e) => setCurrentExercise(prev => ({ 
                    ...prev, 
                    prompt_pl: e.target.value 
                  }))}
                  placeholder="Co to jest po polsku?"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Correct Answer</label>
              <input
                type="text"
                value={currentExercise.correctAnswer}
                onChange={(e) => setCurrentExercise(prev => ({ 
                  ...prev, 
                  correctAnswer: e.target.value 
                }))}
                placeholder="The correct answer"
              />
            </div>

            {(currentExercise.type === 'multiple_choice' || currentExercise.type === 'listen_and_select') && (
              <div className="options-section">
                <label>Options</label>
                {currentExercise.options?.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => {
                      const newOptions = [...(currentExercise.options || [])];
                      newOptions[index] = e.target.value;
                      setCurrentExercise(prev => ({ ...prev, options: newOptions }));
                    }}
                    placeholder={`Option ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <button className="add-exercise-button" onClick={addExercise}>
              <span className="button-icon">➕</span>
              Add Exercise
            </button>
          </div>

          <div className="exercises-list">
            {lesson.exercises?.map((exercise, index) => (
              <div key={index} className="exercise-item">
                <div className="exercise-info">
                  <span className="exercise-type">{exercise.type}</span>
                  <span className="exercise-prompt">{exercise.prompt_en}</span>
                </div>
                <button 
                  className="remove-exercise"
                  onClick={() => removeExercise(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button className="cancel-button" onClick={() => onClose?.()}>
            Cancel
          </button>
          <button 
            className="save-button" 
            onClick={saveLesson}
            disabled={isSaving}
          >
            {isSaving ? '💾 Saving...' : '💫 Save Lesson'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLessonModal;