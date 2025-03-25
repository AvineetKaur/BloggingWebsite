import { ChangeEvent, useState } from "react"
import { Link } from "react-router-dom"
import { SignupInput } from '@aviinee/bloggingwebsite-common'

export const Auth = ({ type }: { type: "signup" | "Signin" }) => {
    const [postInputs, setPostInputs] = useState<SignupInput>({
        email: '',
        password: "",
        name: ""
    })
    return (<>
        <div className="h-screen flex justify-center flex-col">
            {JSON.stringify(postInputs)}
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-extrabold">
                        Create an Account
                    </div>
                    <div className="text-slate-400 mt-4 mb-10">
                        Already have an account?
                        <Link to={"/signup"} className="text-slate-400 pl-2 underline">Login</Link>
                    </div>
                    <div>
                        <LabelledInput label="Username" placeholder="Username@gmail.com" onChange={(e) => {
                            setPostInputs(postInputs => ({
                                ...postInputs,
                                name: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Password" placeholder="password" type="Password" onChange={(e) => {
                            setPostInputs(postInputs => ({
                                ...postInputs,
                                name: e.target.value
                            }))
                        }} />
                        <LabelledInput label="Name" placeholder="Name" onChange={(e) => {
                            setPostInputs(postInputs => ({
                                ...postInputs,
                                name: e.target.value
                            }))
                        }} />
                        <button type="button" className="w-full text-white bg-gradient-to-r from-gray-500 via-gray-700 to-gray-900 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-semibold rounded-lg text-md px-5 py-2.5 text-center me-2 mb-2 mt-2">{type === "signup" ? "Sign Up" : "Sign In"}</button>
                    </div>
                </div>

            </div>
        </div>
    </>)
}

interface LabelledInputType {
    label: string,
    placeholder: string,
    type?: string
    onChange: (e: ChangeEvent<HTMLInputElement>) => void

}
function LabelledInput({ label, placeholder, type, onChange }: LabelledInputType) {
    return (
        <div>
            <label className="block mb-2 text-sm font-semibold text-slate-700 dark:text-white">{label}</label>
            <input onChange={onChange} type={type} id="first_name" className="mb-4 bg-slate-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-slate-600 focus:border-slate-700 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500 " placeholder={placeholder} required />
        </div>
    )
}