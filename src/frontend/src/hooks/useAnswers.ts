import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Answer } from '../backend';

export function useAnswers() {
  const { actor, isFetching: isActorFetching } = useActor();

  return useQuery<Answer[]>({
    queryKey: ['answers'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAnswers();
    },
    enabled: !!actor && !isActorFetching,
  });
}
