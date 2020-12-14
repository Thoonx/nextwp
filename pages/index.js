import Link from 'next/link'
import Card from './../components/Card'
import Container from './../components/Container'
import Flex from './../components/Flex'
import { url } from './api/url'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Posts = ({ posts, allPosts}) => {
	const router = useRouter();

	let postsToLoad = 2
	let PostsPerPage = 2
	let [load, setLoad] = useState(PostsPerPage);

	useEffect( ()=>{
		if(router.query.posts){
			setLoad(+router.query.posts)
		}
	},[router]) 

	const loadMorePosts = () => {


		let lastPost = posts[load - postsToLoad + 1].title.rendered;
		
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
   
	return(
		<>
		<Head>
			<title>Posts</title>
		</Head>
			<Container>
				<Flex>
						{posts.slice(0,load).map((post) => (
							<Card key={post.id}  id={post.id}>
							<Link href={ `/blog/${ post.slug }` }>
								<a href={ `/blog/${ post.slug }`} className="test" id={post.id}>
						
									<img src={
										post.better_featured_image 
										? post.better_featured_image.media_details.sizes.medium.source_url 
										: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} />
										<p>{post.title.rendered}</p>
								</a>
							</Link>
							</Card>
						))}
					
					
				</Flex>
				<a href="#scroll"><button onClick={loadMorePosts} className={load >= allPosts ? 'erase' : 'active'} >LOAD MORE</button></a>
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

	const res = await fetch(`${url}wp-json/wp/v2/posts?_fields=id,slug,title,acf,content,date,featured_media,better_featured_image`)
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


  