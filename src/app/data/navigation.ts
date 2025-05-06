import { FaGithub, } from 'react-icons/fa';
import { SiBilibili, SiCsdn, SiTiktok, SiNeteasecloudmusic } from 'react-icons/si';
import { LuAperture } from 'react-icons/lu';


export const navLinks = [
  {
    name: 'Favorites',
    href: '/',
    icon: LuAperture
  },
  {
    name: '项目',
    href: 'project',
  },
  {
    name: 'Code',
    href: 'code',
  },
  {
    name: '留言墙',
    href: 'Messagewall',
   
  },
  {
    name: '文章',
    href: 'article',
   
  },
  {
    name: '照片',
    href: 'photo',
    
  }
];

export const socialLinks = [
  {
    name: 'GitHub',
    href: 'https://github.com/qiheyehua',
    icon: FaGithub
  },
  
  {
    name: 'Bilibili',
    href: 'https://space.bilibili.com/1909203014?spm_id_from=333.1007.0.0',
    icon: SiBilibili
  },
  {
    name: 'CSDN',
    href: 'https://blog.csdn.net/2302_77276867?spm=1000.2115.3001.5343', // 请替换成你的CSDN主页链接
    icon: SiCsdn
  },
  {
    name: 'TikTok',
    href: 'https://www.douyin.com/user/self?from_tab_name=main', // 请替换成你的抖音主页链接
    icon: SiTiktok
  },
  {
    name: '网易云音乐',
    href: 'https://music.163.com/#/user/home?id=3581904428',  // 替换成你的网易云音乐主页
    icon: SiNeteasecloudmusic
  }
]; 