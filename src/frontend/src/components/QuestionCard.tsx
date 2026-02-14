import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { loveQuestions } from '../data/loveQuestions';
import { getNextQuestion, getPreviousQuestion, getRandomQuestion } from '../lib/questionNavigation';
import { useSaveAnswer } from '../hooks/useSaveAnswer';
import { ChevronLeft, ChevronRight, Shuffle, Save, CheckCircle2 } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

export function QuestionCard() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerText, setAnswerText] = useState<string>('');
  const [lastRandomIndex, setLastRandomIndex] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string>('');
  
  const { mutate: saveAnswer, isPending, isSuccess, isError, error } = useSaveAnswer();

  const currentQuestion = loveQuestions[currentIndex];

  const handleNext = () => {
    setCurrentIndex(getNextQuestion(currentIndex, loveQuestions.length));
    setAnswerText('');
    setValidationError('');
  };

  const handlePrevious = () => {
    setCurrentIndex(getPreviousQuestion(currentIndex, loveQuestions.length));
    setAnswerText('');
    setValidationError('');
  };

  const handleRandom = () => {
    const newIndex = getRandomQuestion(loveQuestions.length, lastRandomIndex);
    setCurrentIndex(newIndex);
    setLastRandomIndex(newIndex);
    setAnswerText('');
    setValidationError('');
  };

  const handleSave = () => {
    const trimmedAnswer = answerText.trim();
    
    if (!trimmedAnswer) {
      setValidationError('Please write an answer before saving.');
      return;
    }
    
    setValidationError('');
    const timestamp = Date.now();
    const id = `${currentQuestion.id}-${timestamp}`;
    
    saveAnswer({
      id,
      questionId: currentQuestion.id,
      textAnswer: trimmedAnswer,
      timestamp
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Card className="shadow-xl border-2 border-rose-200 dark:border-rose-800 bg-white/90 dark:bg-rose-950/90 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="text-sm font-medium text-rose-600 dark:text-rose-400">
            Question {currentIndex + 1} of {loveQuestions.length}
          </div>
          <CardTitle className="text-2xl md:text-3xl lg:text-4xl text-rose-900 dark:text-rose-100 leading-relaxed">
            {currentQuestion.text}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Written Answer Input */}
          <div className="flex flex-col gap-3">
            <Label htmlFor="answer-text" className="text-lg font-medium text-rose-800 dark:text-rose-200">
              Write your answer:
            </Label>
            <Textarea
              id="answer-text"
              value={answerText}
              onChange={(e) => {
                setAnswerText(e.target.value);
                if (validationError) setValidationError('');
              }}
              placeholder="Share your thoughts..."
              className="min-h-[150px] resize-y text-base"
              disabled={isPending}
            />
            {validationError && (
              <Alert variant="destructive">
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            <Button
              variant="outline"
              onClick={handlePrevious}
              className="rounded-full"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              onClick={handleRandom}
              className="rounded-full"
            >
              <Shuffle className="w-4 h-4 mr-1" />
              Random
            </Button>
            <Button
              variant="outline"
              onClick={handleNext}
              className="rounded-full"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          {/* Save Button */}
          <div className="flex justify-center">
            <Button
              onClick={handleSave}
              disabled={!answerText.trim() || isPending}
              size="lg"
              className="rounded-full px-8"
            >
              {isPending ? (
                <>Saving...</>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 className="w-5 h-5 mr-2" />
                  Saved!
                </>
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Save Answer
                </>
              )}
            </Button>
          </div>

          {/* Success/Error Messages */}
          {isSuccess && (
            <Alert className="border-green-200 bg-green-50 dark:bg-green-950/30">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800 dark:text-green-200">
                Your answer has been saved successfully!
              </AlertDescription>
            </Alert>
          )}

          {isError && (
            <Alert variant="destructive">
              <AlertDescription>
                {error instanceof Error ? error.message : 'Failed to save answer. Please try again.'}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
