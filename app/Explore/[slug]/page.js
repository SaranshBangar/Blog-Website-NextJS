'use client'
import Footer from "@/app/Footer"
import Navbar from "@/app/Navbar"
import { supabase } from "@/app/supabase.config"
import { Badge, Spinner } from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import {
    BiSolidUpvote
} from 'react-icons/bi'

export default function Page ({params}) {
    const [BlogPost, setBlogPost] = useState([])
    const [Loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchPost = async() => {
            setLoading(true);
            const { data: Posts, error} = await supabase
                .from('posts')
                .select('*')
                .eq('id', params.slug)

            console.log(Posts);
            if (error) console.log(error);
            else{
                setBlogPost(Posts);
            }
            setLoading(false)
        }

        fetchPost();
    }, [])

    return (
        <main className="flex flex-col min-h-screen">
            <section className="w-screen h-[420px] md:h-[500px] lg:h-[720px] overflow-hidden bg-slug-pattern object-cover bg-center bg-cover bg-no-repeat bg-blend-soft-light">
                <Navbar />
            </section>
            { Loading && <Spinner size='xl' className='self-center my-6'/>}
            <section>
                {BlogPost.map((post) => (
                    <section key={post.id} className="w-screen h-auto flex flex-1 flex-col sm:items-center md:items-start md:flex-row md:justify-around mx-4 md:mx-12 gap-6 my-12 lg:my-24">
                        <Image src={post.banner_url || 'https://placehold.co/500x500'} alt={post.title} width={500} height={500}
                        className="w-full h-1/3 md:w-1/3 md:h-auto rounded-lg"/>
                        <div className="font-Neon space-y-10 w-full md:w-1/2">
                            <h2 className="font-extrabold text-2xl flex flex-row justify-between">
                                {post.title}
                                <span className="flex items-center mx-8 gap-2">
                                    <BiSolidUpvote />{post.votes}
                                </span>
                            </h2>
                            {post.tags && post.tags.map((tag) => (
                                <Badge varient='subtle' colorScheme='teal' key={tag} className='mx-4 my-2'>
                                    {`#${tag}`}
                                </Badge>
                            ))}
                            <p className="font-medium text-url text-left w-11/12">
                                {post.content}
                            </p>
                        </div>
                    </section>
                ))}
            </section>
            <Footer />
        </main>
    )
}