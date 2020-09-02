import Link from 'next/link'

export async function getStaticProps() {

	const res = await fetch('https://antuncrnja.com/w/wp-json/wp/v2/posts')
	const posts = await res.json()
  
	return {
	  props: {
		posts,
	  },
	  revalidate: 60
	}
  }


  function Blog({ posts }) {
	return (
	  <ul>
		{posts.map((post) => (
			<div key={post.id}>
			<Link href={ `/posts/${ post.id }` }>
				<a  href={ `/posts/${ post.id }` }>
					<li>{post.title.rendered}</li>
				</a>
			</Link>
			</div>
		))}
	  </ul>
	)
  }

  export default Blog