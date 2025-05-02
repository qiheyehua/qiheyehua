import Link from 'next/link';

export default function PhotoPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">照片页面</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 照片卡片 */}
        {Array.from({length: 6}).map((_, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg bg-white">
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">照片 {index + 1}</span>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">照片标题 {index + 1}</h3>
              <p className="text-gray-600">照片的描述文字...</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex justify-center">
        <Link href="/" className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors">
          返回首页
        </Link>
      </div>
    </div>
  );
} 