import { useOnlineStatus } from '../../hooks';
import './StatusBeacon.css';

interface StatusBeaconProps {
  showLabel?: boolean;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'inline';
}

const StatusBeacon = ({ showLabel = false, position = 'top-right' }: StatusBeaconProps) => {
  const isOnline = useOnlineStatus();

  const positionClass = position !== 'inline' ? `beacon-${position}` : '';

  return (
    <div className={`status-beacon ${positionClass} ${isOnline ? 'online' : 'offline'}`}>
      <div className="beacon-dot" title={isOnline ? 'Connected' : 'Offline'}>
        <div className="beacon-pulse"></div>
      </div>
      {showLabel && (
        <span className="beacon-label">
          {isOnline ? '● Online' : '○ Offline'}
        </span>
      )}
    </div>
  );
};

export default StatusBeacon;
