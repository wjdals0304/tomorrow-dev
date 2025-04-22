import { Article } from './Article/Article';
import { Chart } from './Chart';
import { ShortPost } from './ShortPost/ShortPost';

export function Main() {
  return (
    <main className="bg-dark h-full pt-[60px]">
      <div className="flex justify-between px-5 m-auto w-full mb-3">
        <Chart />
        <ShortPost />
      </div>
      <Article />
    </main>
  );
}
