import { type LoaderState } from '@/store';
import { hideToast, loadNotification } from '@/util/toast';
import { useEffect } from 'react';

export const useLoading = (isLoading: LoaderState["isLoading"], setIsLoading: LoaderState["setIsLoading"]) => {
  useEffect(() => {
    setIsLoading(isLoading);
    if (isLoading) {
      loadNotification()
    } else {
      hideToast();
    }
  }, [isLoading]);
};
