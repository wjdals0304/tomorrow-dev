import { useShortPostsData } from '../hooks/useShortPostsData';
import { ShortPostItem } from './ShortPostItem';
export function ShortPostContent() {
  const { data: posts } = useShortPostsData();

  return posts?.map((post) => <ShortPostItem key={post.id} post={post} />);
}
