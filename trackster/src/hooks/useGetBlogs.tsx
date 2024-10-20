import { useStore } from '@/store';
import type { Blogs } from '@/types/blog';
import { useQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { client } from '../lib/axios';
import { useDataFetching } from './useDataFetching';

const fetchBlogs = async (): Promise<AxiosResponse<Blogs, any>> => {
  return await client.get<Blogs>('/blogs');
};

export const useGetBlogs = () => {
  const setBlogs = useStore((state) => state.setBlogs);
  const { data, isLoading, isError, error, refetch } = useQuery<Blogs, any>({
    queryFn: async () => {
      try {
        const { data } = await fetchBlogs();
        if (data && data.length > 0) {
          setBlogs(data);
        }
        return data;
      } catch (error) {
        return Promise.reject(error);
      }
    },
    queryKey: ['blogs'],
  });

  useDataFetching({ isLoading, isError, error, errorMessage: 'Failed to fetch blogs' });

  return { data, isLoading, isError, error, refetch };
};
