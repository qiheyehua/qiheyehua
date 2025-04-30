import Main from '@/components/Main';
import WhiteModule from '@/components/WhiteModule';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <section className="h-[150vh] pt-16">
        <Main />
      </section>
      <section className="h-screen">
        <WhiteModule />
      </section>
    </div>
  );
}
