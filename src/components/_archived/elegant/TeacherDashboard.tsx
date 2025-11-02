import { useState, useEffect } from 'react';
import { Progress } from '../../types';
import './TeacherDashboard.css';

interface TeacherDashboardProps {
  onProgressUpdate?: (progress: Progress) => void;
}

interface AnalyticsData {
  totalStudents: number;
  activeToday: number;
  averageProgress: number;
  lessonsCompleted: number;
  customLessons: number;
  audioUploads: number;
}

const TeacherDashboard: React.FC<TeacherDashboardProps> = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalStudents: 0,
    activeToday: 0,
    averageProgress: 0,
    lessonsCompleted: 0,
    customLessons: 0,
    audioUploads: 0
  });

  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  useEffect(() => {
    // Simulate loading analytics data
    const loadAnalytics = () => {
      const customLessons = JSON.parse(localStorage.getItem('custom-lessons') || '[]');
      const progress = JSON.parse(localStorage.getItem('progress') || '{}');
      
      setAnalytics({
        totalStudents: Math.floor(Math.random() * 150) + 50,
        activeToday: Math.floor(Math.random() * 30) + 10,
        averageProgress: Math.floor(Math.random() * 40) + 30,
        lessonsCompleted: progress.completedLessons?.length || 0,
        customLessons: customLessons.length,
        audioUploads: Math.floor(Math.random() * 25) + 5
      });

      setRecentActivity([
        '🎯 Student completed "Basic Greetings" lesson',
        '📝 New custom lesson "Advanced Conversations" created',
        '🎵 Audio file uploaded for pronunciation practice',
        '⭐ 5-star rating received on "Food & Dining" lesson',
        '📊 Weekly progress report generated',
        '🔔 Reminder sent to inactive students'
      ]);
    };

    loadAnalytics();
    const interval = setInterval(loadAnalytics, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    { icon: '📝', label: 'Create Lesson', action: 'lesson' },
    { icon: '🎵', label: 'Upload Audio', action: 'audio' },
    { icon: '📊', label: 'View Reports', action: 'reports' },
    { icon: '👥', label: 'Manage Students', action: 'students' },
    { icon: '🎯', label: 'Set Goals', action: 'goals' },
    { icon: '📢', label: 'Send Notification', action: 'notify' }
  ];

  const performQuickAction = (action: string) => {
    // Simulate quick action
    const messages = {
      reports: '📊 Generating comprehensive analytics report...',
      students: '👥 Loading student management interface...',
      goals: '🎯 Opening goal setting wizard...',
      notify: '📢 Notification sent to all active students!'
    };

    if (messages[action as keyof typeof messages]) {
      alert(messages[action as keyof typeof messages]);
    }
  };

  return (
    <div className="teacher-dashboard">
      <div className="dashboard-header">
        <h3>Teaching Command Center</h3>
        <div className="last-updated">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="analytics-grid">
        <div className="metric-card students">
          <div className="metric-icon">👥</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.totalStudents}</div>
            <div className="metric-label">Total Students</div>
            <div className="metric-change">+{analytics.activeToday} active today</div>
          </div>
        </div>

        <div className="metric-card progress">
          <div className="metric-icon">📈</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.averageProgress}%</div>
            <div className="metric-label">Avg Progress</div>
            <div className="metric-change">↗️ +5% this week</div>
          </div>
        </div>

        <div className="metric-card lessons">
          <div className="metric-icon">📚</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.customLessons}</div>
            <div className="metric-label">Custom Lessons</div>
            <div className="metric-change">{analytics.lessonsCompleted} completed</div>
          </div>
        </div>

        <div className="metric-card audio">
          <div className="metric-icon">🎵</div>
          <div className="metric-content">
            <div className="metric-value">{analytics.audioUploads}</div>
            <div className="metric-label">Audio Files</div>
            <div className="metric-change">💽 2.3GB used</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions-section">
        <h4>Quick Actions</h4>
        <div className="quick-actions-grid">
          {quickActions.map((action, index) => (
            <button
              key={index}
              className="quick-action-button"
              onClick={() => performQuickAction(action.action)}
            >
              <span className="action-icon">{action.icon}</span>
              <span className="action-label">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="recent-activity-section">
        <h4>Recent Activity</h4>
        <div className="activity-feed">
          {recentActivity.map((activity, index) => (
            <div key={index} className="activity-item">
              <div className="activity-time">
                {new Date(Date.now() - index * 1800000).toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </div>
              <div className="activity-text">{activity}</div>
            </div>
          ))}
        </div>
      </div>

      {/* System Status */}
      <div className="system-status">
        <h4>System Status</h4>
        <div className="status-items">
          <div className="status-item healthy">
            <span className="status-icon">🟢</span>
            <span>Audio Processing: Operational</span>
          </div>
          <div className="status-item healthy">
            <span className="status-icon">🟢</span>
            <span>Speech Recognition: Active</span>
          </div>
          <div className="status-item healthy">
            <span className="status-icon">🟢</span>
            <span>Data Sync: Connected</span>
          </div>
          <div className="status-item warning">
            <span className="status-icon">🟡</span>
            <span>Storage: 78% used</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;