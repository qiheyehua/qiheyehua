import Link from 'next/link';

export default function MusicPage() {
  const musicList = [
    { title: '春日限定', artist: '黄霄雲', genre: '流行', duration: '03:45' },
    { title: '起风了', artist: '买辣椒也用券', genre: '流行', duration: '05:11' },
    { title: '溯', artist: 'CORSAK胡梦周', genre: '电子', duration: '04:27' },
    { title: '白月光与朱砂痣', artist: '大籽', genre: '流行', duration: '03:15' },
    { title: '苏幕遮', artist: '徐良', genre: '古风', duration: '04:38' },
  ];

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">音乐页面</h1>
      
      <div className="mb-8">
        <p className="text-lg text-gray-700">发现并欣赏来自不同艺术家的音乐作品</p>
      </div>
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">歌曲</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">艺术家</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">类型</th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">时长</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {musicList.map((music, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md flex items-center justify-center">
                      <span className="text-gray-500 text-sm">♪</span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{music.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{music.artist}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {music.genre}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {music.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
} 