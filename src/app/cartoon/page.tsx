import Link from 'next/link';

export default function CartoonPage() {
  const animeList = [
    { title: '鬼灭之刃', studio: 'ufotable', genre: '动作/奇幻', episodes: 26, year: 2019 },
    { title: '进击的巨人', studio: 'WIT Studio/MAPPA', genre: '动作/剧情', episodes: 87, year: 2013 },
    { title: '间谍过家家', studio: 'WIT Studio/CloverWorks', genre: '喜剧/动作', episodes: 25, year: 2022 },
    { title: '咒术回战', studio: 'MAPPA', genre: '动作/奇幻', episodes: 24, year: 2020 },
    { title: '蓝色监狱', studio: '8bit', genre: '运动', episodes: 25, year: 2022 },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">动漫页面</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700">探索精彩的动漫世界</p>
      </div>
      
      {/* 动漫列表 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {animeList.map((anime, index) => (
          <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center">
              <h3 className="text-xl font-bold text-white">{anime.title}</h3>
            </div>
            <div className="p-5">
              <p className="mb-2"><span className="font-semibold">制作公司：</span>{anime.studio}</p>
              <p className="mb-2"><span className="font-semibold">类型：</span>{anime.genre}</p>
              <p className="mb-2"><span className="font-semibold">集数：</span>{anime.episodes}</p>
              <p className="mb-2"><span className="font-semibold">年份：</span>{anime.year}</p>
              <button className="mt-4 w-full py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* 季度推荐 */}
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6">2023年度最佳动漫</h2>
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white p-8 rounded-lg">
          <h3 className="text-2xl font-bold mb-3">《链锯人》</h3>
          <p className="mb-4">独特的视觉表现和引人入胜的叙事，使其成为2023年不可错过的动漫作品。</p>
          <div className="flex space-x-4">
            <button className="px-4 py-2 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
              观看预告片
            </button>
            <button className="px-4 py-2 border border-white text-white font-semibold rounded-lg hover:bg-white/20 transition-colors">
              了解更多
            </button>
          </div>
        </div>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
} 