import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppLayout } from './components/AppLayout';
import { QuestionCard } from './components/QuestionCard';
import { SavedAnswersView } from './views/SavedAnswersView';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';

const queryClient = new QueryClient();

type View = 'question' | 'saved';

function AppContent() {
  const [currentView, setCurrentView] = useState<View>('question');

  return (
    <AppLayout currentView={currentView} onViewChange={setCurrentView}>
      {currentView === 'question' ? (
        <QuestionCard />
      ) : (
        <SavedAnswersView />
      )}
    </AppLayout>
  );
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <Toaster />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
