"use client";
import React, { useEffect, useState } from "react";
import { client } from "@/lib/sanity/lib/client";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

export function PhotoBlock() {
  const [items, setItems] = useState([
    {
      title: "地平线",
      image: "https://res.cloudinary.com/dqsej8eol/image/upload/v1738573977/679e36269d0e4_xtwb4s.jpg",
      className: "absolute top-10 left-[20%] rotate-[-5deg]",
    },
    {
      title: "星空",
      image:
        "https://res.cloudinary.com/dqsej8eol/image/upload/v1738573847/67a0533f3102a_lyyvvl.jpg",
      className: "absolute top-40 left-[25%] rotate-[-7deg]",
    },
    {
      title: "人生照片",
      image:
        "https://res.cloudinary.com/dqsej8eol/image/upload/v1746285789/ns2ipxj8lcbr19nu7r0n.jpg",
      className: "absolute top-5 left-[40%] rotate-[8deg]",
    },
    {
      title: "人生照片",
      image:
        "https://res.cloudinary.com/dqsej8eol/image/upload/v1746285789/ns2ipxj8lcbr19nu7r0n.jpg",
      className: "absolute top-5 left-[20%] rotate-[10deg]",
    },
    {
      title: "日落树",
      image:
        "https://res.cloudinary.com/dqsej8eol/image/upload/v1746285995/rxob8m5kzb6v4y5aunml.jpg",
      className: "absolute top-32 left-[55%] rotate-[10deg]",
    },
    
    {
      title: "New Zealand",
      image:
        "https://images.unsplash.com/photo-1505142468610-359e7d316be0?q=80&w=3070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      className: "absolute top-24 left-[45%] rotate-[-7deg]",
    },
   
  ]);
  
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
