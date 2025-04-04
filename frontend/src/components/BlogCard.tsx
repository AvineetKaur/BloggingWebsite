import { Appbar } from "./Appbar"

interface BlogCardProps {
    authorName: string,
    title: string,
    content: string,
    publishedDate: string
}

export const BlogCard = ({
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {
    return <div className=" border-b border-slate-200 pb-4 pt-4">
        <div className="flex">
            <Avatar name={authorName} />
            <div className="font-semibold text-slate-600 pl-3 text-sm flex justify-center flex-col">
                {authorName}
            </div>
            <div className="font-semibold text-slate-600 pl-3 flex justify-center flex-col"><Circle /></div>
            <div className="font-light text-slate-400 pl-3 text-sm flex justify-center flex-col">{publishedDate}</div>
        </div>
        <div className="text-xl font-semibold pt-3">
            {title}
        </div>
        <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
        </div>
        <div className="text-slate-400 text-sm font-thin pt-4">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
        </div>
    </div>
}
function Circle() {
    return <div className="h-1 w-1 rounded-full bg-slate-400"></div>

}
type avatarTypes = {
    name: string,
    size: "small" | "big"
}

export function Avatar({ name, size = "small" }: avatarTypes) {
    return (
        <div className={`relative inline-flex items-center justify-center ${size === "small" ? "w-6 h-6" : "w-10 h-10"} overflow-hidden bg-slate-300 rounded-full dark:bg-gray-600`}>
            <span className={`${size === "small" ? "text-sm" : "text-md"} font-bold text-gray-600 dark:text-gray-300`}>
                {name[0]}
            </span>
        </div>
    )



}