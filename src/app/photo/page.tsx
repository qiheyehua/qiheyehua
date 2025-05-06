"use client";

import React, { useState, useEffect } from 'react';
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

// 定义Photo类型接口
interface Photo {
  src: string;
  width: number;
  height: number;
}

const Stream: React.FC = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 处理图片加载并获取实际尺寸
  const loadImage = (imageUrl: string): Promise<Photo> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          src: imageUrl,
          width: img.width,
          height: img.height,
        });
      };
      img.onerror = reject;
      img.src = imageUrl;
    });
  };

  // 初始化加载图片
  useEffect(() => {
    const loadPhotos = async (): Promise<void> => {
      try {
        // 从API获取图片数据
        const response = await fetch('/api/photos');
        if (!response.ok) {
          throw new Error('获取图片失败');
        }
        const data = await response.json();
        setPhotos(data);
      } catch (error) {
        console.error('加载图片失败:', error);
        // 在API调用失败时使用备用图片
        const backupImageUrls: string[] = [
          "https://res.cloudinary.com/dqsej8eol/image/upload/v1738564349/image_8_xezjbh.jpg",
          "https://res.cloudinary.com/dqsej8eol/image/upload/v1738566838/image_0_kvtoaq.jpg",
        ];
        
        const backupPhotos = await Promise.all(
          backupImageUrls.map(async (url) => {
            const photo = await loadImage(url);
            return photo;
          })
        );
        
        setPhotos(backupPhotos);
      } finally {
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="mb-12 text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent 
          hover:scale-105 transition-transform duration-300 
          animate-fade-in">
          动态视觉长廊
        </h1>
        <p className="text-gray-600 text-lg tracking-wider leading-relaxed
          hover:text-gray-800 transition-colors duration-300">
          ✨「摄影美学瀑布·幻想维度漫游」
          <span className="inline-block animate-bounce">✨</span>
        </p>
        <div className="w-24 h-1 mx-auto bg-gradient-to-r from-orange-500 to-pink-500 rounded-full 
          transform hover:scale-x-150 transition-transform duration-300"></div>
      </div>

      <MasonryPhotoAlbum
        photos={photos}
        spacing={20}
        columns={(containerWidth: number) => {
          if (containerWidth < 640) return 1;
          if (containerWidth < 1024) return 2;
          return 3;
        }}
        onClick={({ photo, index }: { photo: Photo, index: number }) => {
          console.log('Clicked photo:', photo, 'at index:', index);
        }}
      />
    </div>
  );
};

export default Stream;