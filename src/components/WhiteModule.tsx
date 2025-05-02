import { IconCloud } from "@/components/magicui/icon-cloud";
import { Lens } from "@/components/magicui/lens";
import { SpinningText } from "@/components/magicui/spinning-text";
import { PinContainer } from "@/components/ui/3d-pin";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import ColourfulText from "@/components/ui/colourful-text";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Pointer } from "@/components/magicui/pointer";
const slugs = [
  "typescript",
  "javascript",
  "dart",
  "java",
  "react",
  "flutter",
  "android",
  "html5",
  "css3",
  "nodedotjs",
  "express",
  "nextdotjs",
  "prisma",
  "amazonaws",
  "postgresql",
  "firebase",
  "nginx",
  "vercel",
  "testinglibrary",
  "jest",
  "cypress",
  "docker",
  "git",
  "jira",
  "github",
  "gitlab",
  "visualstudiocode",
  "androidstudio",
  "sonarqube",
  "figma",
];

export function WhiteModule() {
  const images = slugs.map(
    (slug) => `https://cdn.simpleicons.org/${slug}/${slug}`,
  );

  return (
    <div className="relative flex size-full">
      {/* 背景水滴 - BackgroundBeamsWithCollision 组件 */}
      <BackgroundBeamsWithCollision>
      {/* 指针 - Pointer 组件 */}
      <Pointer className="fill-blue-500" />
      {/* 左侧面板 - Lens 组件 */}
      <div className="w-1/2 h-full flex items-center justify-center p-8 bg-white">
        <Card className="relative max-w-md shadow-none">
          <CardHeader>
            <Lens
              zoomFactor={2}
              lensSize={150}
              isStatic={false}
              ariaLabel="Zoom Area"
            >
              <img
                src="https://res.cloudinary.com/dqsej8eol/image/upload/v1738573813/674aa6090ebe5_vhudzp.jpg"
                alt="image placeholder"
                width={500}
                height={500}
              />
            </Lens>
          </CardHeader>
          <CardContent>
            <CardTitle className="text-2xl">七禾页话</CardTitle>
            <CardDescription>
              为什么是七禾页话？
              因为七禾页是一个字,<ColourfulText text="锋芒内敛之意" />，我想说的话都在这个字里。
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      {/* 右侧面板 - IconCloud 组件 */}
      <div className="w-1/2 h-full flex items-center justify-center p-8 bg-white">      
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">心灯已似风灯冷</h2>
          <p className="text-gray-600 mb-6">希望终从以下生</p>
          <IconCloud images={images} />
        </div>
      </div>
      </BackgroundBeamsWithCollision>
    </div>
  );
}
export default WhiteModule;
