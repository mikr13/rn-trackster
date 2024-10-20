import { useStore } from '@/store';
import type { Blog } from '@/types/blog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { client } from '../lib/axios';
import { useDataFetching } from './useDataFetching';
import { useGetBlogs } from './useGetBlogs';

type UseEditBlogMutationData = Blog;

const editBlogAPI = async (data: Blog): Promise<AxiosResponse<void, any>> => {
  return await client.put<void>(`/blogs/${data.id}`, data);
}

export const useEditBlog = () => {
  const { refetch } = useGetBlogs();
  const editBlog = useStore((state) => state.editBlog);
  const queryClient = useQueryClient();
  const { isError, error, isPending, mutate } = useMutation({
    mutationFn: async (data: UseEditBlogMutationData) => {
      editBlog(data);
      return await editBlogAPI(data);
    },
    onSuccess: () => {
      // @ts-expect-error - invalidation
      queryClient.invalidateQueries({ queryKey: "blogs" });
      refetch();
    },
  })

  useDataFetching({ isError, error, errorMessage: `Failed to edit blog` });

  return { mutate };
};
