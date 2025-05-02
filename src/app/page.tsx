import Main from '@/app/Main/Main';
import dynamic from 'next/dynamic';

// 懒加载 WhiteModule 组件
const LazyWhiteModule = dynamic(() => import('@/components/WhiteModule'), {
  loading: () => <div>加载中...</div>,  // 加载时显示的内容
  ssr: true  // 是否在服务器端渲染，默认为 true
});
const LazyPhotoBlock = dynamic(() => import('@/components/photo'), {
  loading: () => <div>加载中...</div>,  // 加载时显示的内容
  ssr: true  // 是否在服务器端渲染，默认为 true
});

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="h-[150vh]">
        <Main />
      </section>
      <section className="h-screen">
        <LazyWhiteModule />
      </section>
      <section className="h-screen">
        <LazyPhotoBlock />
      </section>
    </div>
  );
}
