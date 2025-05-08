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
  
  useEffect(() => {
    // 定义Sanity查询
    const query = `*[_type == "photo"] {
      title,
      "image": image.asset->url,
      className
    }`;
    
    // 执行查询
    client.fetch(query).then((photos) => {
      if (photos && photos.length > 0) {
        // 直接通过索引赋值给items数组
        const newItems = [...items]; // 创建items的副本
        
        // 确保数组长度足够
        while (newItems.length < photos.length) {
          newItems.push({ title: "", image: "", className: "" });
        }
        
        // 使用索引方式逐个赋值
        for (let i = 0; i < photos.length; i++) {
          newItems[i] = {
            title: photos[i].title,
            image: photos[i].image,
            className: photos[i].className || `absolute top-${10 + i * 5} left-[${20 + i * 5}%] rotate-[${i * 2}deg]`,
          };
        }
        
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
