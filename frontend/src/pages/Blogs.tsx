import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"

export const Blogs = () => {

    return <div>
        <Appbar />
        <div className="flex justify-center">
            <div className="max-w-xl">
                <BlogCard authorName={"Avineet Kaur"}
                    title={"hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.."}
                    content={"hello hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good."}
                    publishedDate={"2nd Feb 2024"} />
                <BlogCard authorName={"Avineet Kaur"}
                    title={"hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.."}
                    content={"hello hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good."}
                    publishedDate={"2nd Feb 2024"} />
                <BlogCard authorName={"Avineet Kaur"}
                    title={"hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.."}
                    content={"hello hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good.hope you are doing good."}
                    publishedDate={"2nd Feb 2024"} />
            </div>
        </div>
    </div>
}