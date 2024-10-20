import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

type Props = {
  children: React.ReactNode;
};

export const ReactQueryProvider = ({ children }: Props) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: true,
      }
    },
    queryCache: new QueryCache({
      onError: (error: any) => {
        console.error(JSON.stringify(error));
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: any) => {
        console.error(JSON.stringify(error));
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <Toast />
    </QueryClientProvider>
  );
}
