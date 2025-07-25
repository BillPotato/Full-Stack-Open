const _ = require("lodash")
const logger = require("../utils/logger.js")

const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, blog) => {
		return sum + blog.likes
	}

	return blogs.reduce(reducer, 0)
}

const favouriteBlog = (blogs) => {
	let Mi = -1

	for (let i = 0; i < blogs.length; i++) {
		Mi = (Mi == -1)
			? i
			: (blogs[Mi].likes < blogs[i].likes)
				? i
				: Mi
	}

	return blogs[Mi]
}

const mostBlogs = (blogs) => {
	const groupedAuthors = _
		.groupBy(blogs, "author")
	// logger.info(groupedAuthors)

	let M_author = null // string
	let M_posts = null // number

	for (const [author, posts] of Object.entries(groupedAuthors)) {
		if (!M_author || M_posts < posts.length) {
			M_author = author
			M_posts = posts.length
		}
	}

	const result = {
		author: M_author,
		blogs: M_posts
	}	

	return result
}

const mostLikes = (blogs) => {
	const sumLikes = (posts) => {
		return posts.reduce((sum, post) => sum + post.likes, 0)
	}

	const groupedAuthors = _
		.groupBy(blogs, "author")
	// logger.info(groupedAuthors)

	let M_author = null // string
	let M_likes = null // number

	for (const [author, posts] of Object.entries(groupedAuthors)) {
		// logger.info(posts)
		// logger.info(author)
		const likes = sumLikes(posts)
		if (!M_author || M_likes < likes) {
			M_author = author
			M_likes = likes
		}
	}

	const res = {
		author: M_author,
		likes: M_likes
	}

	return res
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
}