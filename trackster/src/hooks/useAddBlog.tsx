import { useStore } from '@/store';
import type { Blog } from '@/types/blog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { randomUUID } from 'expo-crypto';
import { client } from '../lib/axios';
import { useDataFetching } from './useDataFetching';
import { useGetBlogs } from './useGetBlogs';

type UseAddBlogMutationData = Omit<Blog, 'id'>

const addBlogAPI = async (data: Blog): Promise<AxiosResponse<void, any>> => {
  return await client.post<void>('/blogs', data);
}

export const useAddBlog = () => {
  const { refetch } = useGetBlogs();
  const addBlog = useStore((state) => state.addBlog);
  const queryClient = useQueryClient();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: UseAddBlogMutationData) => {
      const dataToSubmit = {
        ...data,
        id: randomUUID(),
        imageURL: 'https://picsum.photos/500/300',
      };
      addBlog(dataToSubmit);
      return await addBlogAPI(dataToSubmit);
    },
    onSuccess: () => {
      // @ts-expect-error - invalidation
      queryClient.invalidateQueries({ queryKey: "blogs" });
      refetch();
    },
  })

  useDataFetching({ isError, error, errorMessage: `Failed to create blog` });

  return { mutate };
};
