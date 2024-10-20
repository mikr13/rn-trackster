import type { Blog } from '@/types/blog';
import { create, type StateCreator } from 'zustand';

export type LoaderState = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

const createLoadSlice: StateCreator<LoaderState> = (set) => ({
  isLoading: false,
  setIsLoading: (isLoading: boolean) => set({ isLoading }),
});

type BlogState = {
  blogs: Blog[];
  setBlogs: (blogs: Blog[]) => void;
  addBlog: (blog: Blog) => void;
  editBlog: (blog: Blog) => void;
  deleteBlog: (id: string) => void;
}

const createBlogSlice: StateCreator<BlogState> = (set) => ({
  blogs: [],
  setBlogs: (blogs: Blog[]) => set({ blogs }),
  addBlog: (blog: Blog) => set((state) => ({
    blogs: [...state.blogs, blog]
  })),
  editBlog: (blog: Blog) => set((state) => ({ blogs: state.blogs.map((b) => b.id === blog.id ? blog : b) })),
  deleteBlog: (id: string) => set((state) => ({ blogs: state.blogs.filter((b) => b.id !== id) })),
});

export const useStore = create<LoaderState & BlogState>()((...args) => ({
  ...createLoadSlice(...args),
  ...createBlogSlice(...args),
}))
