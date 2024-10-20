import { useStore } from '@/store';
import type { CustomError } from '@/types/error';
import { useErrorNotification } from './useErrorNotification';
import { useLoading } from './useLoading';

type Props = {
  isLoading?: boolean;
  isError: boolean;
  error: CustomError | null;
  errorMessage: string;
}

export const useDataFetching = ({ isLoading = false, isError, error, errorMessage }: Props) => {
  const { setIsLoading } = useStore();
  useErrorNotification(isError, errorMessage, error);
  useLoading(isLoading, setIsLoading);
};
