'use client';

import { useQuery } from '@tanstack/react-query';

export interface ShortPostData {
  title: string;
  updated_at: string;
  tagname: string | null;
}

async function fetchShortPosts(): Promise<ShortPostData[]> {
  const response = await fetch('/api/shortPosts');
  if (!response.ok) {
    throw new Error('Failed to fetch short posts');
  }
  return response.json();
}

export function useShortPostsData() {
  return useQuery<ShortPostData[], Error>({
    queryKey: ['shortPosts'],
    queryFn: fetchShortPosts,
  });
}
