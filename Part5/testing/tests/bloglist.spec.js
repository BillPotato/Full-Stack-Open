const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require("./helper.js")

describe('Blog app', () => {
  describe("with 1 user in the database", () => {
    beforeEach(async ({ page, request }) => {
      // delete everything in database
      await request.post("http://localhost:5173/api/reset")
      // go to page      
      await page.goto('http://localhost:5173')
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
        await loginWith(page, "Admin", "123")

        await expect(page.getByText("logged in as", {exact: false})).toBeVisible()
      })

      test("fails with wrong credentials", async ({ page }) => {
        await loginWith(page, "Admin", "1234")

        await expect(page.getByText("logged in as", {exact: false})).not.toBeVisible()
      })

      test.only("new note can be created" , async ({ page }) => {
        
        await loginWith(page, "Admin", "123")

        await createBlog(page, "Note1", "http://random")

        await expect(page.getByText("Note1 Adminview")).toBeVisible()
      })

    })
    
  })


  describe("with 1 user and 1 note in the database", () => {
    beforeEach(async ({ page, request }) => {

      // delete everything in database
      await request.post("http://localhost:5173/api/reset")
      // go to page
      await page.goto('http://localhost:5173')
      // add admin user in database
      await request.post("http://localhost:5173/api/users", {
        data: {
          username: "Admin",
          password: "123"
        }
      }) 
      // add a note in database
      // await page.getByTestId("username").fill("Admin")
      // await page.getByTestId("password").fill("123")
      // await page.getByTestId("submit").click()
      await loginWith(page, "Admin", "123")

      // await page.getByText("create blog").click()
      // await page.getByTestId("title").fill("Note1")
      // await page.getByTestId("url").fill("http://random")
      // await page.getByTestId("create").click()
      await createBlog(page, "Note1", "http://random")
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


    test("blogs are sorted by likes", async ({ page }) => {
      // create 2 more blogs
      // await page.waitForTimeout(500)
      await createBlog(page, "Note2", "http://random2") 

      // await page.waitForTimeout(500)
      await createBlog(page, "Note3", "http://random3")

      await page.waitForTimeout(500)
      await page.goto('http://localhost:5173')
      // await page.waitForTimeout(500)
      await page.pause()

      const blogs = await page.getByTestId("blog").all()

      // like the blogs
      let cur_like = 1
      for (let blogElem of blogs) {
        await blogElem.getByRole("button", {name: "view"}).click()
        for (let i = 0; i < cur_like; i++) {
          await page.waitForTimeout(200)
          await blogElem.getByRole("button", {name: "like"}).click()
        }
        cur_like++
      }

      await page.waitForTimeout(500)
      await page.goto('http://localhost:5173')
      await page.waitForTimeout(500)
      await page.pause()

      for (let blogElem of blogs) {
        await page.waitForTimeout(500)
        await blogElem.getByRole("button", {name: "view"}).click()
      }

      let likeTexts = []
      for (let blogElem of blogs) {
        likeTexts.push(await blogElem.getByText("likes: ", {exact: false}).textContent())
      }
      const likes = likeTexts.map(likeText => likeText.replace("likes: ", "").replace("like", ""))
      // console.log(likes)

      expect(likes).toStrictEqual(["3","2","1"])

    })
  })


  describe("with 2 users and 2 notes in the database (logged in as user 2)", () => {
    beforeEach(async ({ page, request }) => {

      // delete everything in database
      await request.post("http://localhost:5173/api/reset")
      // go to page
      await page.goto('http://localhost:5173')
      // add admin user in database
      await request.post("http://localhost:5173/api/users", {
        data: {
          username: "Admin",
          password: "123"
        }
      }) 
      await request.post("http://localhost:5173/api/users", {
        data: {
          username: "Admin2",
          password: "123"
        }
      }) 
      // add a note in database
      // await page.getByTestId("username").fill("Admin")
      // await page.getByTestId("password").fill("123")
      // await page.getByTestId("submit").click()
      await loginWith(page, "Admin", "123")

      // await page.getByText("create blog").click()
      // await page.getByTestId("title").fill("Note1")
      // await page.getByTestId("url").fill("http://random")
      // await page.getByTestId("create").click() 
      await createBlog(page, "Note1", "http://random")

      await page.waitForTimeout(50)

      // log in as user 2
      await page.getByRole("button", {name: "logout"}).click()
      // await page.getByTestId("username").fill("Admin2")
      // await page.getByTestId("password").fill("123")
      // await page.getByTestId("submit").click()
      await loginWith(page, "Admin2", "123")

      // await page.getByRole("button", {name: "create blog"}).click()
      // await page.getByTestId("title").fill("Note2")
      // await page.getByTestId("url").fill("http://random2")
      // await page.getByTestId("create").click() 
      await createBlog(page, "Note2", "http://random2")
    })


    test("another user cannot delete one's blog", async ({ page }) => {
      await page.on("dialog", (dialog) => dialog.accept())

      await page.getByRole("button", {name: "view"}).click()
      await expect(page.getByRole("button", {name: "delete"})).not.toBeVisible()
    })

    // test.only("blogs are sorted by likes in descending order", async ({ page }) => {
    //   // create a third blog for good measure
    //   await page.getByTestId("title").fill("Note3")
    //   await page.getByTestId("url").fill("http://random3")
    //   await page.getByTestId("create").click() 

    //   await page.waitForTimeout(50)

    //   const blogs = await page.getByTestId("blog").all()

    //   // like the blogs
    //   const cur_like = 1
    //   for (let blogElem of blogs) {
    //     await blogElem.getByRole("button", {name: "view"}).click()
    //     for (let i = 0; i <= cur_like; i++) {
    //       await page.waitForTimeout(50)
    //       await blogElem.getByRole("button", {name: "like"}).click()
    //     }
    //     cur_like++
    //   }
    //   await page.pause()

    //   // get the likes
    //   const likeText = []
    //   for (let blogElem of blogs) {
    //     likeText.push(await blogElem.getByText("likes: ", {exact: false}).textContent())
    //   }
    //   console.log(likeText)
    //   const likes = likeText.map(liketext => liketext.replace("likes: ", "").replace("like", ""))
    //   console.log(likes)


    // })

  })
})