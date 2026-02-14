import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAnswers } from '../hooks/useAnswers';
import { loveQuestions } from '../data/loveQuestions';
import { formatDate } from '../lib/dateFormat';
import { Heart } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function SavedAnswersView() {
  const { data: answers, isLoading, isError, error } = useAnswers();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-6 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-1/2" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertDescription>
            {error instanceof Error ? error.message : 'Failed to load saved answers.'}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  if (!answers || answers.length === 0) {
    return (
      <div className="max-w-4xl mx-auto">
        <Card className="text-center py-16 border-2 border-dashed border-rose-200 dark:border-rose-800 bg-white/50 dark:bg-rose-950/50">
          <CardContent className="space-y-4">
            <img
              src="/assets/generated/heart-icon.dim_256x256.png"
              alt=""
              className="w-24 h-24 mx-auto opacity-50"
            />
            <p className="text-xl text-rose-700 dark:text-rose-300">
              No saved answers yet
            </p>
            <p className="text-rose-600 dark:text-rose-400">
              Start answering questions to see them here!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Sort answers by timestamp (most recent first)
  const sortedAnswers = [...answers].sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-rose-900 dark:text-rose-100 mb-2">
          Your Love Story
        </h2>
        <p className="text-rose-700 dark:text-rose-300">
          {answers.length} precious {answers.length === 1 ? 'moment' : 'moments'} saved
        </p>
      </div>

      <div className="space-y-4">
        {sortedAnswers.map((answer) => {
          const question = loveQuestions.find((q) => q.id === answer.questionId);
          const questionText = question?.text || 'Unknown question';

          return (
            <Card
              key={`${answer.questionId}-${answer.timestamp}`}
              className="shadow-lg border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur hover:shadow-xl transition-shadow"
            >
              <CardHeader>
                <CardTitle className="text-lg md:text-xl text-rose-900 dark:text-rose-100 leading-relaxed">
                  {questionText}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="bg-rose-50 dark:bg-rose-900/30 rounded-lg p-4 border border-rose-100 dark:border-rose-800">
                  <p className="text-base text-rose-900 dark:text-rose-100 whitespace-pre-wrap leading-relaxed">
                    {answer.textAnswer}
                  </p>
                </div>
                <div className="text-sm text-rose-600 dark:text-rose-400 flex items-center gap-2">
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                  {formatDate(Number(answer.timestamp))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
