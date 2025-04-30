import React from 'react';
import { OrbitingCircles } from "@/components/magicui/orbiting-circles";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { Icons } from "../app/data/icons";
import { Meteors } from "@/components/magicui/meteors";

const Main: React.FC = () => {
  return (
    <div className="relative overflow-hidden w-full text-white h-full flex items-center justify-center bg-white">
      {/* 流星容器 */}
      <Meteors number={20} />
      {/* 3D卡片容器 */}
      <CardContainer className="inter-var z-100">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          Make things float in air
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          Hover over this card to unleash the power of CSS perspective
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
            Sign up
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            Sign up
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