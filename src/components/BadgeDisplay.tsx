
import React from 'react';
import { Badge as BadgeType, BadgeLevel } from '../types';

interface BadgeDisplayProps {
  badge: BadgeType;
  size?: 'sm' | 'md' | 'lg';
  showDetails?: boolean;
  earnedAt?: string;
}

const BadgeDisplay: React.FC<BadgeDisplayProps> = ({ 
  badge, 
  size = 'md', 
  showDetails = false,
  earnedAt
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };
  
  const levelColors = {
    [BadgeLevel.Bronze]: 'badge-bronze',
    [BadgeLevel.Silver]: 'badge-silver',
    [BadgeLevel.Gold]: 'badge-gold',
    [BadgeLevel.Platinum]: 'badge-platinum',
    [BadgeLevel.Diamond]: 'badge-diamond',
  };
  
  // Format the date if provided
  const formattedDate = earnedAt ? new Date(earnedAt).toLocaleDateString('pt-BR') : '';
  
  return (
    <div className="flex flex-col items-center">
      <div className={`rounded-full border-4 ${levelColors[badge.level]} ${sizeClasses[size]} flex items-center justify-center`}>
        {badge.imageUrl ? (
          <img src={badge.imageUrl} alt={badge.name} className="w-full h-full rounded-full" />
        ) : (
          <span className="text-white font-bold text-xs">{badge.level.charAt(0).toUpperCase()}</span>
        )}
      </div>
      {showDetails && (
        <div className="text-center mt-2">
          <p className="font-pixel text-xs">{badge.name}</p>
          <p className="text-xs text-muted-foreground">{badge.description}</p>
          {earnedAt && <p className="text-xs text-accent">Obtido em: {formattedDate}</p>}
        </div>
      )}
    </div>
  );
};

export default BadgeDisplay;
