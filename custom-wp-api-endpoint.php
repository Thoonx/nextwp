<?php

function ac_posts() {
	$args = [
		'numberposts' => 99999,
		'post_type' => 'post'
	];

	$posts = get_posts($args);

	$data = [];
	$i = 0;

	foreach($posts as $post) {
		$data[$i]['acf']['title'] = get_field('neki', $post->ID);
		$data[$i]['acf']['gallery'] = get_field('gal', $post->ID);
		$data[$i]['date'] = $post->post_date;
		$data[$i]['id'] = $post->ID;
		$data[$i]['title'] = $post->post_title;
		$data[$i]['content'] = $post->post_content;
		$data[$i]['slug'] = $post->post_name;
		$data[$i]['featured_image']['thumbnail'] = get_the_post_thumbnail_url($post->ID, 'thumbnail');
		$data[$i]['featured_image']['medium'] = get_the_post_thumbnail_url($post->ID, 'medium');
		$data[$i]['featured_image']['large'] = get_the_post_thumbnail_url($post->ID, 'large');
		$data[$i]['featured_image']['next_post_size'] = get_the_post_thumbnail_url($post->ID, 'next-post-size');
		$data[$i]['featured_image']['new_image_size'] = get_the_post_thumbnail_url($post->ID, 'new-image-size');
		$data[$i]['featured_image']['next_thumbnail'] = get_the_post_thumbnail_url($post->ID, 'next-thumbnail');
		$data[$i]['category'] = get_the_category($post->ID)[0]->name;
		$i++;
	}

	return $data;
}

function ac_post( $slug ) {
	$args = [
		'name' => $slug['slug'],
		'post_type' => 'post'
	];

	$post = get_posts($args);

    $data['acf']['title'] = get_field( "neki", $post[0]->ID );
	$data['acf']['gallery'] = get_field( "gal", $post[0]->ID );
	$data['date'] = $post[0]->post_date;
	$data['id'] = $post[0]->ID;
	$data['title'] = $post[0]->post_title;
	$data['content'] = $post[0]->post_content;
	$data['slug'] = $post[0]->post_name;
	$data['featured_image']['thumbnail'] = get_the_post_thumbnail_url($post[0]->ID, 'thumbnail');
	$data['featured_image']['medium'] = get_the_post_thumbnail_url($post[0]->ID, 'medium');
	$data['featured_image']['large'] = get_the_post_thumbnail_url($post[0]->ID, 'large');
	$data['category'] = get_the_category($post[0]->ID)[0]->name;

	return $data;
}

add_action('rest_api_init', function() {
	register_rest_route('ac/v1', 'posts', [
		'methods' => 'GET',
		'callback' => 'ac_posts',
	]);

	register_rest_route( 'ac/v1', 'posts/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'ac_post',
    ) );
    
});

?>