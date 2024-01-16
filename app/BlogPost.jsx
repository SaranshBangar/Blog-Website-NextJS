'use client'
import{
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Avatar,
    Heading,
    Text,
    Image,
    Flex,
    Box,
    IconButton,
    Button,
    Spinner,
    Badge,
} from '@chakra-ui/react'

import {useEffect} from 'react'

import { BsThreeDotsVertical } from 'react-icons/bs'
import { BiLike, BiChat, BiShare} from 'react-icons/bi'
import { useState } from 'react'
import { supabase } from './supabase.config'
import { FaCircleInfo } from 'react-icons/fa6'

import { useRouter } from 'next/navigation'

const BlogPost = () => {

    const [BlogPost, setBlogPost] = useState([]);
    const [Loading, setLoading] = useState(false);
    const [Liking, setLiking] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const fetchPosts = async() => {
            setLoading(true);
            const { data: Posts, error} = await supabase
                .from('posts')
                .select('*')

            console.log(Posts);
            if (error) console.log(error);
            else{
                setBlogPost(Posts);
            }
            setLoading(false)
        }

        fetchPosts();
    }, [])

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ')
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        else {
            return text;
        }
    }

    const handleShare = (url) => {
        if (navigator.share) {
            navigator.share ({
                title: "Check out this post",
                url: url
            }) .then(() => console.log('Successful share'))
                .catch((error) => console.log('Error sharing', error));
        }
        else {
            alert('Sorry, sharing does not mean caring')
        }
    }

    const handleLikeCounter = async (voteCount, id) => {
        console.log(voteCount, id);
        const newCount = voteCount+1;
        setLiking(true);
        const { data, error} = await supabase
            .from('posts')
            .update({votes: newCount})
            .eq('id', id)
        if (error) console.log(error)
        else {
            console.log(data)
            const newPosts = BlogPost.map(post => {
                if (post.id === id) {
                    return {...post, votes:newCount}
                }
                else {
                    return post;
                }
            })
            setBlogPost(newPosts);
        }
        setLiking(false);
    }

    const handlePostNavigate = (id) => {
        router.push(`/Explore/${id}`)
    }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-fit gap-4 h-fit justify-evenly md:mx-6 my-4'>
        { Loading && <Spinner size='xl' className='self-center my-6'/>}
        {
            BlogPost.length===0?(
                <div>No Posts</div>
            ) : (
                    BlogPost.map(post => (
                        <Card maxW='md' key={post.id} className='p-4 shadow-md shadow-black'>
                        <CardHeader>
                            <Flex spacing='4'>
                            <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                <Avatar name={post.title} src='https://bit.ly/null' />

                                <Box>
                                <Heading size='sm'>Author</Heading>
                                {/* <Text>Creator, Chakra UI</Text> */}
                                </Box>
                            </Flex>
                            <IconButton
                                variant='solid'
                                colorScheme='gray'
                                aria-label='See More'
                                icon={<FaCircleInfo className='text-gray-600' />}
                                className='hover:cursor-pointer'
                                onClick={() => handlePostNavigate(post.id)}
                            />
                            </Flex>
                        </CardHeader>
                        <Image
                            objectFit='cover'
                            src={post.banner_url}
                            alt={post.title}
                            borderRadius={8}
                        />
                        <CardBody>
                            <Heading size='md'>{post.title}</Heading>
                            <div className='flex flex-row flex-wrap gap-4'>
                                {post.tags && post.tags.map((tag) => (
                                    <Badge varient='subtle' colorScheme='teal' key={tag} className='mx-4 my-2'>
                                        {`#${tag}`}
                                    </Badge>
                                ))}
                            </div>  
                            <Text>
                                {truncateText(post.content, 30)}
                            </Text>
                        </CardBody>

                        <CardFooter
                            justify='space-between'
                            flexWrap='wrap'
                            sx={{
                            '& > button': {
                                minW: '136px',
                            },
                            }}
                        >
                            <Button flex='1' variant='ghost' isLoading={Liking} disabled={Liking} leftIcon={<BiLike />} onClick={() => handleLikeCounter(post.votes, posts.id)}>
                                {post.votes}
                            </Button>

                            <Button flex='1' variant='ghost' leftIcon={<BiShare />} onClick={() => handleShare(`http://localhost:3000/Explore/${post.id}`)}>
                            Share
                            </Button>
                        </CardFooter>
                        </Card>
                    ))
            )
        }
    </div>
  )
}

export default BlogPost
