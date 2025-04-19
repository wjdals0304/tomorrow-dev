import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 z-[9] w-full h-[60px] bg-dark-background">
      <div className="flex items-center justify-between p-[0 20px] m-[auto] h-full">
        <div className="flex items-center">
          <Link href="/">
            <span className="font-size-[14px] font-[700] text-[#ffffffb3] line-height-[1]">
              Tomorrow
              <br /> Dev
            </span>
          </Link>
        </div>
        <div className="flex items-center">
          <div className="font-size-[14px] text-[#fff] line-height-[1] text-right flex items-center gap-[8px]">
            <div className="whitespace-nowrap">
              <span className="font-size-[24px] font-[700] text-right">8</span>
              <span>명</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
