import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AppLayoutProps {
  children: React.ReactNode;
  currentView: 'question' | 'saved';
  onViewChange: (view: 'question' | 'saved') => void;
}

export function AppLayout({ children, currentView, onViewChange }: AppLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 dark:from-rose-950 dark:via-pink-950 dark:to-red-950">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img
            src="/assets/generated/love-hero.dim_1600x600.png"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative container mx-auto px-4 py-12 md:py-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img
              src="/assets/generated/heart-icon.dim_256x256.png"
              alt=""
              className="w-12 h-12 md:w-16 md:h-16"
            />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-rose-900 dark:text-rose-100">
              Love Questions
            </h1>
          </div>
          <p className="text-center text-lg md:text-xl text-rose-700 dark:text-rose-300 max-w-2xl mx-auto">
            Express your love through thoughtful questions and heartfelt answers
          </p>
          
          {/* Navigation */}
          <nav className="flex justify-center gap-3 mt-8">
            <Button
              variant={currentView === 'question' ? 'default' : 'outline'}
              onClick={() => onViewChange('question')}
              className="rounded-full"
            >
              <Heart className="w-4 h-4 mr-2" />
              Ask Question
            </Button>
            <Button
              variant={currentView === 'saved' ? 'default' : 'outline'}
              onClick={() => onViewChange('saved')}
              className="rounded-full"
            >
              Saved Answers
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 md:py-12">
        {children}
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-sm text-rose-600 dark:text-rose-400">
        <p>
          © {new Date().getFullYear()} · Built with{' '}
          <Heart className="inline w-4 h-4 text-rose-500 fill-rose-500" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-rose-700 dark:hover:text-rose-300"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
