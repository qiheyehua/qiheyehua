import { NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";

// 确保明确设置配置参数
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'dqsej8eol',
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || '912724529679598',
  api_secret: '5qpOrP3r3Eyro3jUZYBaVTE5T9M',  // 请在.env.local中设置正确的API密钥
});

// 添加调试代码
console.log('Cloudinary配置状态:', {
  cloud_name: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: !!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: !!process.env.CLOUDINARY_API_SECRET,
});

// 定义Cloudinary资源接口
interface CloudinaryResource {
  secure_url: string;
  width: number;
  height: number;
}

export async function GET() {
  try {
    const { resources } = await cloudinary.search.expression("resource_type:image").execute();
    
    const photos = resources.map((resource: CloudinaryResource) => ({
      src: resource.secure_url,
      width: resource.width,
      height: resource.height,
    }));
    
    return NextResponse.json(photos);
  } catch (error) {
    console.error('获取图片失败:', error);
    
    // 如果API失败，返回备用图片数据
    const backupPhotos = [
      {
        src: "https://res.cloudinary.com/dqsej8eol/image/upload/v1738564349/image_8_xezjbh.jpg",
        width: 800,
        height: 600
      },
      {
        src: "https://res.cloudinary.com/dqsej8eol/image/upload/v1738566838/image_0_kvtoaq.jpg",
        width: 800,
        height: 600
      }
    ];
    
    return NextResponse.json(backupPhotos);
  }
} 