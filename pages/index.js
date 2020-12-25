import Link from 'next/link'
import Card from './../components/Card'
import Container from './../components/Container'
import Flex from './../components/Flex'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Checkbox from './../components/Checkbox'

const Posts = ({ posts, allPosts}) => {
	const router = useRouter();

	let postsToLoad = 2
	let PostsPerPage = 2
	const [load, setLoad] = useState(PostsPerPage);
	const [myPosts, setMyPosts] = useState(posts);

	useEffect( ()=>{
		if(router.query.posts){
			setLoad(+router.query.posts)
		}
	},[router]) 

	const loadMorePosts = () => {
		let lastPost = posts[load - postsToLoad + 1].title;
		
		const allA = document.querySelectorAll('.test')
		allA.forEach( x => {
			if(x.querySelector('p').innerText == lastPost){
				x.setAttribute('id', 'scroll');
			}else{
				x.removeAttribute("id")
			}
		})

		setLoad(load + postsToLoad)
		router.push(`?posts=${load + postsToLoad}`)
	}

		function filterPosts(e){
			setMyPosts( posts.filter( post => post.title.toUpperCase().includes(e.target.value.toUpperCase())) )
		}
	
	return(
		<>
		<Head>
			<title>Posts</title>
		</Head>
			<Container>
			
			<select onChange={filterPosts}>
			<option value="">--</option>
				<option value="new">New</option>
				<option value="post">Post</option>
				<option value="17">17</option>
			</select>

				<input type="search" onChange={filterPosts} placeholder="Search Posts"/>
				
				
				<Flex>
						{myPosts.slice(0,load).map( post => (
							<Card key={post.id}  id={post.id}>
								<Link href={ `/blog/${ post.slug }` }>
									<a className="test" id={post.id}>
										<div className="bg">
									      <Image src={post.featured_image.next_post_size} alt={post.title} unsized/>
									      <p>{post.title}</p>
										</div>
									</a>
								</Link>
							</Card>
						))}
				</Flex>
				<a href="#scroll"><button onClick={loadMorePosts} className={load >= myPosts ? 'erase' : 'active'} >LOAD MORE</button></a>
			</Container>
			<style global jsx>
   {`
       html {
          scroll-behavior: smooth;
        }
  `}
  </style>
	  </>
)
}

  export async function getStaticProps() {

	const res = await fetch(process.env.API)
	const posts = await res.json()
	const allPosts = posts.length;

	return {
	  props: {
		posts,
		allPosts
	  },
	  revalidate: 30
	}
  }

  export default Posts


  