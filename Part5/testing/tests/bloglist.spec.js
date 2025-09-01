const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  describe("with 1 user in the database", () => {
    beforeEach(async ({ page, request }) => {
      await page.goto('http://localhost:5173')

      // delete everything in database
      await request.post("http://localhost:5173/api/reset")
      // add admin user in database
      await request.post("http://localhost:5173/api/users", {
        data: {
          username: "Admin",
          password: "123"
        }
      })

    })

    test("Login form is shown", async ({ page }) => {
      await expect(page.getByText("login")).toBeVisible()
    })

    describe("login", () => {
      test("is successful with correct credentials", async ({ page }) => {
        await page.getByTestId("username").fill("Admin")
        await page.getByTestId("password").fill("123")
        await page.getByTestId("submit").click()

        await expect(page.getByText("logged in as", {exact: false})).toBeVisible()
      })

      test("fails with wrong credentials", async ({ page }) => {
        await page.getByTestId("username").fill("Admin")
        await page.getByTestId("password").fill("1234")
        await page.getByTestId("submit").click()

        await expect(page.getByText("logged in as", {exact: false})).not.toBeVisible()
      })

      test("new note can be created" , async ({ page }) => {
        await page.getByTestId("username").fill("Admin")
        await page.getByTestId("password").fill("123")
        await page.getByTestId("submit").click()

        await page.getByText("create blog").click()
        await page.getByTestId("title").fill("Note1")
        await page.getByTestId("url").fill("http://random")
        await page.getByTestId("create").click()

        await expect(page.getByText("Note1 Adminview")).toBeVisible()
      })

    })
    
  })


  describe("with 1 user and 1 note in the database", () => {
    beforeEach(async ({ page, request }) => {
      await page.goto('http://localhost:5173')

      // delete everything in database
      await request.post("http://localhost:5173/api/reset")
      // add admin user in database
      await request.post("http://localhost:5173/api/users", {
        data: {
          username: "Admin",
          password: "123"
        }
      }) 
      // add a note in database
      await page.getByTestId("username").fill("Admin")
      await page.getByTestId("password").fill("123")
      await page.getByTestId("submit").click()

      await page.getByText("create blog").click()
      await page.getByTestId("title").fill("Note1")
      await page.getByTestId("url").fill("http://random")
      await page.getByTestId("create").click()
    })

    test("blog can be liked", async ({ page }) =>{
      await page.getByRole("button", {name: "view"}).click()
      await page.getByRole("button", {name: "like"}).click()

      await expect(page.getByText("likes: 1", {exact: false})).toBeVisible()
    })

    test("blog can be deleted", async ({ page }) => {
      // accept dialog on appearance
      page.on("dialog", (dialog) => dialog.accept())

      await page.getByRole("button", {name: "view"}).click()
      await page.getByRole("button", {name: "delete"}).click()

      await expect(page.getByText("Note1 Adminview")).not.toBeVisible()
    })
  })
})