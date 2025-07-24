const _ = require("lodash")

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

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
}