import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Achievement } from '@/types';
import { Trophy, X } from 'lucide-react';

interface AchievementUnlockModalProps {
  achievement: Achievement;
  onClose: () => void;
}

export const AchievementUnlockModal = ({ achievement, onClose }: AchievementUnlockModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 100);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300);
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
        show ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`card-glow p-8 max-w-md w-full transform transition-all duration-300 ${
          show ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-success/20 mb-4">
            <Trophy className="w-12 h-12 text-success" />
          </div>
          
          <h2 className="text-2xl font-bold mb-2">
            Achievement Unlocked!
          </h2>
          
          <div className="text-6xl mb-4">
            {achievement.icon}
          </div>
          
          <h3 className="text-xl font-semibold mb-2">
            {achievement.name}
          </h3>
          
          <p className="text-muted-foreground mb-6">
            {achievement.description}
          </p>

          <Button 
            onClick={handleClose}
            className="w-full gradient-primary text-white hover:opacity-90"
          >
            Awesome!
          </Button>
        </div>
      </div>
    </div>
  );
};
