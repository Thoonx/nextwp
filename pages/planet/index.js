import Link from 'next/link'
import Head from 'next/head'
import Card from '../../components/Card'
import ContainerFront from '../../components/ContainerFront'
import Flex from '../../components/Flex'



 const Blog = ({posts}) => {
	return (
		
	  <ContainerFront>
      <div>
      
		  <Flex>
					{posts.map((post) => (
						<Card key={post.id}>
						<Link href={ `/planet/${ post.id }` }>
							<a  href={ `/planet/${ post.id }` }>
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
    </div>
	  </ContainerFront>
	)
  }

  Blog.getServerSideProps = async () => {

	const res = await fetch(`https://native.tportal.hr/planet-b/wp-json/wp/v2/posts?_fields=id,slug,title,content,date,featured_media,better_featured_image.media_details.sizes&per_page=4`)
	const posts = await res.json()
  
	return {
	  props: {
		posts,
	  }
	  }
  }

  export default Blog