import Link from 'next/link'
import Card from '../../components/Card'
import Container from '../../components/Container'
import Flex from '../../components/Flex'
import { useRouter } from 'next/router'
import { url } from '../api/url'

const postsPerPage = 2

const Planet = ({ posts, page, countPages }) => {
const router = useRouter()
	return(
	  <Container>
		  <Flex>
					{posts.map((post) => (
						<Card key={post.id}>
							<Link href={ `/posts/${ post.id }` }>
								<a  href={ `/posts/${ post.id }` }>
									<p>{post.title.rendered}</p>
									<img src={
									post.better_featured_image 
									? post.better_featured_image.media_details.sizes.medium.source_url 
									: 'https://www.ilac.com/wp-content/uploads/2019/06/placeholder-600x400.png'} 
								/>
								</a>
							</Link>
						</Card>
					))}
		</Flex>
			<button onClick={ () => router.push(`/planet/test?page=${page - 1}`)} disabled={page<=1}>Prev</button>
			<button onClick={ () => router.push(`/planet/test?page=${page + 1}`)} disabled={page>=countPages}>Next</button>
			<button onClick={ () => router.push(`/posts/`)}>Posts</button>
			<small>page: {page}</small>
		
	  </Container>
	)
}

  export async function getServerSideProps({query: { page = 1 }}) {

	const allPages = await fetch(`https://antuncrnja.com/w/wp-json/wp/v2/posts?_fields=id`)
		const resPages = await allPages.json();
		const countPages = resPages.length / postsPerPage

	const res = await fetch(`https://antuncrnja.com/w/wp-json/wp/v2/posts?_fields=id,slug,title,content,date,featured_media,better_featured_image.media_details.sizes&per_page=${postsPerPage}&page=${page}`)
	const posts = await res.json()
  
	return {
	  props: {
		posts,
		page: +page,
		countPages
	  }
	}
  }

  export default Planet