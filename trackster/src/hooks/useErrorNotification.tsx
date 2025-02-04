import type { CustomError } from '@/types/error';
import { errorNotification } from '@/utils/toast';
import { useEffect } from 'react';

export const useErrorNotification = (isError: boolean, title: string, error: CustomError | null = null) => {
  useEffect(() => {
    errorNotification(isError, title, error);
  }, [isError, title, error]);
};
