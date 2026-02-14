import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { toast } from 'sonner';

interface SaveAnswerParams {
  id: string;
  questionId: string;
  textAnswer: string;
  timestamp: number;
}

export function useSaveAnswer() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, questionId, textAnswer, timestamp }: SaveAnswerParams) => {
      if (!actor) {
        throw new Error('Backend connection not available');
      }

      const trimmedAnswer = textAnswer.trim();
      if (!trimmedAnswer) {
        throw new Error('Answer cannot be empty');
      }

      await actor.saveAnswer(id, questionId, trimmedAnswer, BigInt(timestamp));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['answers'] });
      toast.success('Your answer has been saved!', {
        description: 'View it in the Saved Answers section.',
      });
    },
    onError: (error: Error) => {
      toast.error('Failed to save answer', {
        description: error.message || 'Please try again.',
      });
    },
  });
}
