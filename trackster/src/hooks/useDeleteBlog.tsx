import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { client } from '../lib/axios';
import { useDataFetching } from './useDataFetching';
import { useGetBlogs } from './useGetBlogs';

const deleteBlog = async (id: string): Promise<AxiosResponse<void, any>> => {
  return await client.delete<void>(`/blogs/${id}`);
}

export const useDeleteBlog = () => {
  const { refetch } = useGetBlogs();
  const queryClient = useQueryClient();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (id: string) => {
      return await deleteBlog(id);
    },
    onSuccess: () => {
      // @ts-expect-error - invalidation
      queryClient.invalidateQueries({ queryKey: "blogs" });
      refetch();
    },
  })

  useDataFetching({ isError, error, errorMessage: `Failed to delete blog` });

  return { mutate };
};
