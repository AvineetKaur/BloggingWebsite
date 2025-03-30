import { Avatar } from "./BlogCard"

export const Appbar = () => {
    return (
        <div className="border-b flex justify-between px-10 border-slate-300 py-4">
            <div className="flex flex-col justify-center">Medium</div>
            <div><Avatar name="Avineet" size="big" /></div>

        </div>
    )
}