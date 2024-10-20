import type { CustomError } from '@/types/error';
import Toast, { type ToastType } from 'react-native-toast-message';

export const showToast = (type: ToastType, summary: string, detail?: string, autoHide = true, visibilityTime: number = 5000) => {
  Toast.show({
    type,
    text1: summary,
    text2: detail,
    autoHide,
    visibilityTime,
    position: 'bottom',
  });
};

export const hideToast = () => {
  Toast.hide();
};


export const loadNotification = () => {
  showToast("info", "Loading", "Please wait...", false);
};

export const errorNotification = (isError: boolean, title: string, error: CustomError | null = null) => {
  if (isError && error) {
    showToast("error", `${error.status}: ${title}`, error.message);
  }
};
