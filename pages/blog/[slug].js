import { useRouter } from 'next/router'
import Container from '../../components/Container'
import Image from 'next/image'
import Head from 'next/head'
import { useRef } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Autoplay, Pagination } from 'swiper';
SwiperCore.use([Navigation, Autoplay, Pagination]);



const Post = ({post}) => {
const popUp = useRef()
	const router = useRouter()
	if (router.isFallback) return <div>loading...</div>
  
	return (
		<Container>
			<Head>
				<title>{post.title}</title>
			</Head>
			<h1 onClick={()=> popUp.current.style.color="red"}>{post.title}</h1>
			<small style={{marginBottom:'25px',display:'block'}}>{post.date}</small>
			<div className="bg">
			<img src={post.featured_image.large} /> 
			</div>
			<h1 ref={popUp}>POPUSP</h1>
			<div dangerouslySetInnerHTML={ {__html: post.content } } />
			<p className="acf">ACF: {post.acf.title ? post.acf.title : ''}</p>

			<Swiper
				navigation
				pagination
				spaceBetween={10}
				slidesPerView={2}
				autoplay={{ delay: 3000 }}
				>
					{post.acf.gallery && post.acf.gallery.map( image => (
						<SwiperSlide><Image src={image} unsized/></SwiperSlide>
					))}
			</Swiper>

			<button style={{background: '#ff4c4c'}} onClick={ () => router.back()}>BACK</button>
		</Container>
	)
  }
  
  export async function getStaticPaths() {
	const res = await fetch(`https://antuncrnja.com/w/wp-json/ac/v1/posts/`)
	const posts = await res.json();

	const paths = posts.map((post) => ({
	  params: { slug: post.slug },
	}))

	return { paths, fallback: true }
  }
  
  export async function getStaticProps({ params }) {

	const res = await fetch(`https://antuncrnja.com/w/wp-json/ac/v1/posts/${params.slug}`)
	const post = await res.json()

	return { 
		props: { 
		post,
	 },
	 revalidate: 1
	}
  }
  
  export default Post