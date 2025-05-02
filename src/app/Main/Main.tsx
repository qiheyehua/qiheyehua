"use client"
import React from 'react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Icons } from "../data/icons";
import { Meteors } from "@/components/magicui/meteors";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from 'react';

const Main: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [showEnglish, setShowEnglish] = useState(true);
  const [lineAnimated, setLineAnimated] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  useEffect(() => {
    
    const interval = setInterval(() => {
      setShowEnglish(prev => !prev);
    }, 3000); // 改为3秒（包含动画时间）

    return () => clearInterval(interval);
  }, []);
  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.2 // 稍微加快单字显示速度
      }
    }
  };
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    },
    exit: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 0.8,
        delay: 2, // 改为2秒
        ease: "easeOut"
      }
    }
  };
  return (
    <div className="relative overflow-hidden w-full text-white h-full flex items-center justify-center bg-white">
      {/* 流星容器 */}
      <Meteors number={20} maxDuration={8}  />
      {/* 3D卡片容器 */}
      <CardContainer className="inter-var z-100">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          <div className="text-base !m-0 !p-0 font-normal h-20 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {showEnglish ? (
                  <motion.div
                    key="english"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex flex-col items-center"
                  >
                    <div className="flex text-6xl font-bold text-[#334155]">
                      {"Qiheyehua".split('').map((char, index) => (
                        <motion.span
                          key={index}
                          variants={item}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="chinese"
                    variants={container}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="flex flex-col items-center"
                  >
                    <div className="flex text-6xl font-bold text-[#334155]">
                      {"七禾页话".split('').map((char, index) => (
                        <motion.span
                          key={index}
                          variants={item}
                          className="inline-block"
                        >
                          {char}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* 横线放在 AnimatePresence 外部，只执行一次动画 */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                onAnimationComplete={() => setLineAnimated(true)}
                className="absolute bottom-0 left-0 w-full h-0.5 bg-black"
              />
            </div>  
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
            一个记录生活、分享想法、展示作品的网站
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://res.cloudinary.com/dqsej8eol/image/upload/v1733123006/xudvwbx5jgao15uqzegy.jpg"
            height="1000"
            width="1000"
            className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
            alt="thumbnail"
          />
        </CardItem>
        <div className="flex justify-between items-center mt-20">
        <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            去注册
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            去留言
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
    {/* 轨道容器 */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <OrbitingCircles
          radius={350}
          reverse={true}
          iconSize={40}
        >
          <Icons.gitHub/>
          <Icons.edfe/>
          <Icons.openai />
        </OrbitingCircles>

        <OrbitingCircles
          radius={375}
          speed={1.5}
          path={false}
          iconSize={40}
        >
          <Icons.chrome/>
          <Icons.notion />
        </OrbitingCircles>

        <OrbitingCircles
          radius={400}
          iconSize={40}
        />
      </div>

      {/* 头像轨道 - 单独的层级 */}
      <div className="absolute inset-0 flex items-center justify-center z-40 pointer-events-none">
        <OrbitingCircles 
          path={false} 
          iconSize={200} 
          radius={400} 
          reverse 
          speed={2} 
        >
          <Icons.avatar/>
        </OrbitingCircles>
      </div>
    </div>
  );
};

export default Main;