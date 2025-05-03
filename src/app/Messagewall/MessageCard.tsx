import { cn } from "@/lib/utils";

export const MessageCard = ({
  avatar,
  username,
  content,
  date,
}: {
  avatar: string | null;
  username: string;
  content: string;
  date: string | Date;
}) => {
  // 处理avatar为null的情况
  const avatarUrl = avatar || `https://avatar.vercel.sh/${username}`;
  // 格式化日期
  const formattedDate = date instanceof Date ? 
    date.toISOString().split('T')[0] : date;
  
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={avatarUrl} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {username}
          </figcaption>
        </div>
        <div className="ml-auto text-xs text-gray-500">{formattedDate}</div>
      </div>
      <blockquote className="mt-2 text-sm">{content}</blockquote>
    </figure>
  );
};