import { Article } from './Article';
import { Chart } from './Chart';
import { Orders } from './Orders';
import { ShortPost } from './ShortPost';

export function Main() {
  return (
    <main className="bg-dark h-screen pt-[60px]">
      <div className="flex justify-between px-5 m-auto w-full mb-3">
        <Chart />
        <ShortPost />
      </div>
      <Orders />
      <Article />
    </main>
  );
}
