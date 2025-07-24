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
		// console.log(`i: ${i} - Mi: ${Mi}`)
		Mi = (Mi == -1)
			? i
			: (blogs[Mi].likes < blogs[i].likes)
				? i
				: Mi
	}

	return blogs[Mi]
}

module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
}