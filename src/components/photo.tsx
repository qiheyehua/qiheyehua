"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanity/lib/client";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

interface PhotoItem {
  title: string;
  image: string;
  className: string;
}

export function PhotoBlock() {
  const [items, setItems] = useState<PhotoItem[]>([]);
  
  const positionClasses = [
    "absolute top-10 left-[20%] rotate-[-5deg]",
    "absolute top-40 left-[25%] rotate-[-7deg]",
    "absolute top-5 left-[40%] rotate-[8deg]",
    "absolute top-32 left-[55%] rotate-[10deg]",
    "absolute top-20 right-[35%] rotate-[2deg]",
    "absolute top-24 left-[45%] rotate-[-7deg]",
    "absolute top-8 left-[30%] rotate-[4deg]",
    "absolute top-16 left-[60%] rotate-[-3deg]",
    "absolute top-36 left-[15%] rotate-[6deg]",
    "absolute top-28 right-[25%] rotate-[-8deg]",
    "absolute top-12 left-[50%] rotate-[9deg]",
    "absolute top-48 left-[35%] rotate-[-4deg]",
  ];
  
  // 随机打乱数组函数
  const shuffleArray = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  
  useEffect(() => {
    // 定义Sanity查询
    const query = `*[_type == "photo"] {
      title,
      "image": image.asset->url,
      className
    }`;
    
    // 打乱位置数组
    const randomPositions = shuffleArray(positionClasses);
    
    // 执行查询
    client.fetch(query).then((photos) => {
      if (photos && photos.length > 0) {
        const newItems = photos.map((photo: any, index: number) => ({
          title: photo.title,
          image: photo.image,
          className: photo.className || randomPositions[index % randomPositions.length]
        }));
        
        setItems(newItems);
      }
    }).catch(error => {
      console.error("Failed to fetch photos from Sanity:", error);
    });
  }, []);

  return (
    <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
      <p className="absolute top-1/2 mx-auto max-w-sm -translate-y-3/4 text-center text-2xl font-black text-neutral-400 md:text-4xl dark:text-neutral-800">
        辞暮尔尔,烟火年年
      </p>
      {items.map((item, index) => (
        <DraggableCardBody key={index} className={item.className}>
          <img
            src={item.image}
            alt={item.title}
            className="pointer-events-none relative z-10 h-80 w-80 object-cover"
          />
          <h3 className="mt-4 text-center text-2xl font-bold text-neutral-700 dark:text-neutral-300">
            {item.title}
          </h3>
        </DraggableCardBody>
      ))}
    </DraggableCardContainer>
  );
}

export default PhotoBlock;
