import Link from 'next/link'
import Card from './../components/Card'
import Container from './../components/Container'
import Flex from './../components/Flex'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Posts = ({ posts, allPosts}) => {
	const router = useRouter();
	const { locale } = router;

	let postsToLoad = 2
	let PostsPerPage = 2
	const [load, setLoad] = useState(PostsPerPage);
	const [activeFilter, setActiveFilter] = useState({
		title: '',
		title2: ''
	})
	const [myPosts, setMyPosts] = useState(posts);

	useEffect(() => {
		if(activeFilter.title != '' || activeFilter.title2 != ''){
			setMyPosts(
				posts.filter( post => 
					post.title.toLowerCase().includes(activeFilter.title)
					&& post.title.toLowerCase().includes(activeFilter.title2)
				)
			)
		}
		if(activeFilter.title == '' && activeFilter.title2 == ''){
			setMyPosts(posts)

		}
	}, [activeFilter])

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

		function handleSearch(e){
			setMyPosts(posts)
			setMyPosts( posts.filter( post => post.title.toUpperCase().includes(e.target.value.toUpperCase())) )
		}

		function handleOption(e){
			if(e.target.id== 'option'){
				setActiveFilter({...activeFilter, title: e.target.value.toLowerCase()})
			}
			if(e.target.id== 'option2'){
				setActiveFilter({...activeFilter, title2: e.target.value.toLowerCase()})
			}
		}
	
	return(
		<>
		<Head>
			<title>Posts</title>
		</Head>
			<Container>
			{locale}
			<select onChange={handleOption} id="option">
				<option value="" selected>Select option</option>
				<option value="New">New</option>
				<option value="Post">Post</option>
			</select>

			<select onChange={handleOption} id="option2">
				<option value="" selected>Select option</option>
				<option value="New">New</option>
				<option value="17">17</option>
			</select>

				<input type="search" onChange={handleSearch} placeholder="Search Posts"/>
				
				
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


  