import Link from 'next/link';

export default function CodePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">代码页面</h1>
      
      <div className="mb-10 bg-gray-100 p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">代码示例</h2>
        <pre className="bg-gray-800 text-green-400 p-4 rounded overflow-x-auto">
          <code>{`
// 示例代码
function helloWorld() {
  console.log("你好，世界！");
}

// React组件示例
function ExampleComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>你点击了 {count} 次</p>
      <button onClick={() => setCount(count + 1)}>
        点击我
      </button>
    </div>
  );
}
          `}</code>
        </pre>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">前端技术</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>React</li>
            <li>Next.js</li>
            <li>TailwindCSS</li>
            <li>TypeScript</li>
          </ul>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h3 className="text-lg font-bold mb-2">后端技术</h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Node.js</li>
            <li>Express</li>
            <li>MongoDB</li>
            <li>GraphQL</li>
          </ul>
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