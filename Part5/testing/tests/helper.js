const loginWith = async (page, username, password) => {
	await page.getByTestId("username").fill(username)
	await page.getByTestId("password").fill(password)
	await page.getByTestId("submit").click()
	await page.waitForTimeout(200)
}

const createBlog = async (page, title, url) => {
	const createButton = await page.getByRole("button", {name: "create blog"})
	if (await createButton.isVisible()) {
		await createButton.click()
	}
	await expect(page.getByTestId("title")).toBeVisible()
	await page.getByTestId("title").fill(title)
	await page.getByTestId("url").fill(url)
	await page.getByRole("button", {name: "create"}).click()
}

export { loginWith, createBlog }