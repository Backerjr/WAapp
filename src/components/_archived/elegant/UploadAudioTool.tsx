import { useState, useRef } from 'react';
import './UploadAudioTool.css';

interface UploadAudioToolProps {
  onClose?: () => void;
}

interface AudioFile {
  id: string;
  name: string;
  size: string;
  duration?: string;
  uploadProgress: number;
  status: 'uploading' | 'completed' | 'error';
  transcript?: string;
}

const UploadAudioTool: React.FC<UploadAudioToolProps> = () => {
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingInterval = useRef<number | null>(null);

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const simulateUpload = (file: AudioFile) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 20;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setAudioFiles(prev => prev.map(f => 
          f.id === file.id 
            ? { ...f, uploadProgress: 100, status: 'completed', transcript: 'Dzień dobry! Jak się masz?' }
            : f
        ));
      } else {
        setAudioFiles(prev => prev.map(f => 
          f.id === file.id ? { ...f, uploadProgress: progress } : f
        ));
      }
    }, 200);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('audio/')) {
        const audioFile: AudioFile = {
          id: `audio-${Date.now()}-${Math.random()}`,
          name: file.name,
          size: formatFileSize(file.size),
          uploadProgress: 0,
          status: 'uploading'
        };

        setAudioFiles(prev => [...prev, audioFile]);
        simulateUpload(audioFile);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const audioFile: AudioFile = {
          id: `recording-${Date.now()}`,
          name: `Recording ${new Date().toLocaleTimeString()}.wav`,
          size: formatFileSize(blob.size),
          duration: formatTime(recordingTime),
          uploadProgress: 0,
          status: 'uploading'
        };

        setAudioFiles(prev => [...prev, audioFile]);
        simulateUpload(audioFile);
        
        // Clean up
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      recordingInterval.current = window.setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Could not access microphone. Please check permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    }
  };

  const removeFile = (id: string) => {
    setAudioFiles(prev => prev.filter(f => f.id !== id));
  };

  return (
    <div className="upload-audio-tool">
      <div className="upload-header">
        <h3>Audio Upload Studio</h3>
        <p>Upload audio files or record directly for your lessons</p>
      </div>

      <div className="upload-methods">
        {/* File Upload Area */}
        <div 
          className={`drop-zone ${isDragOver ? 'drag-over' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
        >
          <div className="drop-icon">🎵</div>
          <div className="drop-text">
            <strong>Drop audio files here</strong> or click to browse
          </div>
          <div className="drop-formats">
            Supports: MP3, WAV, M4A, OGG
          </div>
          
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="audio/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* Recording Area */}
        <div className="recording-section">
          <div className="recording-header">
            <h4>Quick Recording</h4>
            {isRecording && (
              <div className="recording-indicator">
                <span className="recording-dot"></span>
                Recording: {formatTime(recordingTime)}
              </div>
            )}
          </div>

          <div className="recording-controls">
            {!isRecording ? (
              <button className="record-button" onClick={startRecording}>
                <span className="record-icon">🎤</span>
                Start Recording
              </button>
            ) : (
              <button className="stop-button" onClick={stopRecording}>
                <span className="stop-icon">⏹️</span>
                Stop Recording
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Files List */}
      {audioFiles.length > 0 && (
        <div className="files-section">
          <h4>Uploaded Files ({audioFiles.length})</h4>
          <div className="files-list">
            {audioFiles.map(file => (
              <div key={file.id} className={`file-item ${file.status}`}>
                <div className="file-info">
                  <div className="file-icon">
                    {file.status === 'completed' ? '✅' : 
                     file.status === 'error' ? '❌' : '⏳'}
                  </div>
                  <div className="file-details">
                    <div className="file-name">{file.name}</div>
                    <div className="file-meta">
                      {file.size}
                      {file.duration && ` • ${file.duration}`}
                      {file.status === 'uploading' && ` • ${Math.round(file.uploadProgress)}%`}
                    </div>
                    {file.transcript && (
                      <div className="file-transcript">
                        <strong>Transcript:</strong> "{file.transcript}"
                      </div>
                    )}
                  </div>
                </div>

                <div className="file-actions">
                  {file.status === 'uploading' && (
                    <div className="progress-ring">
                      <svg width="24" height="24">
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="rgba(139, 92, 246, 0.3)"
                          strokeWidth="2"
                        />
                        <circle
                          cx="12"
                          cy="12"
                          r="10"
                          fill="none"
                          stroke="#8b5cf6"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeDasharray={`${2 * Math.PI * 10}`}
                          strokeDashoffset={`${2 * Math.PI * 10 * (1 - file.uploadProgress / 100)}`}
                          transform="rotate(-90 12 12)"
                        />
                      </svg>
                    </div>
                  )}
                  
                  <button 
                    className="remove-file-button"
                    onClick={() => removeFile(file.id)}
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="upload-footer">
        <div className="upload-tips">
          <h5>💡 Pro Tips:</h5>
          <ul>
            <li>Record in a quiet environment for best quality</li>
            <li>Speak clearly and at moderate pace</li>
            <li>Files are automatically transcribed for lesson creation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UploadAudioTool;