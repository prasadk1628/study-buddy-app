import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, X } from 'lucide-react';

interface LevelUpModalProps {
  level: number;
  xpGained: number;
  onClose: () => void;
}

export const LevelUpModal = ({ level, xpGained, onClose }: LevelUpModalProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Animate in
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
        className={`card-glow p-8 max-w-md w-full animate-level-up transform transition-all duration-300 ${
          show ? 'scale-100' : 'scale-95'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full gradient-primary-intense mb-4 animate-pulse-glow">
            <Sparkles className="w-12 h-12 text-white" />
          </div>
          
          <h2 className="text-3xl font-bold mb-2 text-gradient-primary">
            Level Up!
          </h2>
          
          <div className="text-5xl font-bold mb-4 animate-bounce">
            {level}
          </div>
          
          <p className="text-lg mb-6 text-muted-foreground">
            +{xpGained} XP earned
          </p>
          
          <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 mb-6">
            <p className="text-sm">
              You're making incredible progress! Keep up the amazing work! 🎉
            </p>
          </div>

          <Button 
            onClick={handleClose}
            className="w-full gradient-primary text-white hover:opacity-90"
          >
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};
