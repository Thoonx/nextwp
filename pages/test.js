import Link from 'next/link'
import Card from './../components/Card'
import Container from './../components/Container'
import Flex from './../components/Flex'
import { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

const Posts = ({ posts }) => {

	const [myPosts, setMyPosts] = useState(posts);

	const [activeFilter, setActiveFilter] = useState({
		title: '',
		title2: ''
	})

	useEffect(() => {
		setMyPosts( 
			posts.filter( post => post.title.toLowerCase().includes(activeFilter.title) 
			   && post.title.toLowerCase().includes(activeFilter.title2)
		    )
		)
	}, [activeFilter])

		function handleOption(e){
			if(e.target.id == 'option'){
				setActiveFilter({...activeFilter, title: e.target.value.toLowerCase()})
			}
			if(e.target.id == 'option2'){
				setActiveFilter({...activeFilter, title2: e.target.value.toLowerCase()})
			}
		}

		useEffect( () => {
			console.log(activeFilter)
		},[activeFilter])
	
	return(
		<>
		<Head>
			<title>Posts</title>
		</Head>
			<Container>
			<Flex>
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
			</Flex>
				<Flex>
					<p style={{textAlign: 'center', width: '100%'}}>{myPosts.length == 0 && 'Nema postova'}</p>
						{myPosts.map( post => (
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


  