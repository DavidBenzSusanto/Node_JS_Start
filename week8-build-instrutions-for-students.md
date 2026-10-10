# Week8 Practice by yourself

## S29. Build it: watching a real request/response cycle

No new project this session — everything below uses tools and projects that already exist.

### Node.js is JavaScript, without a browser

Create a scratch file anywhere (it doesn't need to be inside any existing project) called `hello.js`:

```js
console.log("Hello from Node.js!");

console.log("Does `window` exist here?", typeof window);
console.log("Does `document` exist here?", typeof document);

console.log("Node version:", process.version);
console.log("Current folder:", process.cwd());
```

Run it from the terminal:

```bash
node hello.js
```

You should see something like:

```
Hello from Node.js!
Does `window` exist here? undefined
Does `document` exist here? undefined
Node version: v20.11.0
Current folder: /Users/you/wherever-you-ran-this
```

No `<script>` tag, no HTML file, no browser tab — this ran as its own program. `window` and `document` are `undefined` because nothing here ever loaded a browser environment to provide them; `process.version` and `process.cwd()` are things Node adds instead, which no browser would ever give a webpage.

### Watching a real request and response

Open the deployed `PokéDex Mini` (or run it locally with `npm run dev`), then:

1. Open the browser's DevTools and switch to the **Network** tab.
2. Click into any Pokémon's detail page.
3. Find the request to `pokeapi.co` in the list that just appeared.
4. Click it, and look at two things: the **Headers** section (the request method — `GET` — and the response's status code, `200`), and the **Response** or **Preview** section (the actual JSON body that `response.json()` turned into `pokemon` in your component).

This is the exact request/response cycle, made visible — the same one that's been happening invisibly every time any `fetch` in this project has run.

---

## S30. Build it: Exploring HTTP Methods, Headers, and Status Codes with Hoppscotch

### 🎯 Lab Objectives
In this lab, you will act as a client interacting with a backend REST API. By the end of this activity, you will be able to:
1. Construct and send different HTTP requests (`GET`, `POST`, `PUT`, `DELETE`).
2. Pass custom **Request Headers** and **Request Bodies** (JSON).
3. Inspect and interpret **Response Status Codes** (`200`, `201`, `404`) and **Response Headers**.

---

### 🛠️ Tools Required
* **Browser**: Google Chrome, Edge, or Firefox.
* **API Client**: [Hoppscotch](https://hoppscotch.io) *(Free, web-based API testing tool)*.
* **Mock API Service**: [ReqRes](https://reqres.in) *(A hosted REST API for testing)*.

---

### Part 1: Exploring `GET` Requests & Status Codes

#### Task 1.1: Fetch a List of Resources (`200 OK`)
1. Open [Hoppscotch](https://hoppscotch.io) in your browser.
2. Set the HTTP Method dropdown to **`GET`**.
3. Enter the URL: `https://reqres.in/api/users`
4. Click **Send**.
5. **Observe**:
   * **Status Code**: Check the top right of the response panel. You should see `200 OK`.
   * **Response Body**: Look at the JSON data returned under the `Body` tab. Note the array of user objects.

#### Task 1.2: Fetch a Non-Existent Resource (`404 Not Found`)
1. Change the URL to: `https://reqres.in/api/users/23`
2. Click **Send**.
3. **Observe**:
   * What is the returned **Status Code**? (It should be `404 Not Found`).
   * What is in the **Response Body**? Why is it empty?

---

### Part 2: Creating Data with `POST` & Custom Headers

#### Task 2.1: Create a New Resource (`201 Created`)
1. Change the HTTP Method dropdown to **`POST`**.
2. Set the URL to: `https://reqres.in/api/users`
3. Navigate to the **Body** tab below the URL bar:
   * Select **`application/json`** as the Content Type.
   * Enter the following JSON payload into the editor:
     ```json
     {
       "name": "Sussie",
       "job": "Full-Stack Developer"
     }
     ```
4. Click **Send**.
5. **Observe**:
   * **Status Code**: Notice that the server returned `201 Created` instead of `200 OK`.
   * **Response Body**: Look at the generated `id` and `createdAt` timestamp returned by the server.

#### Task 2.2: Add Custom Request Headers
1. Navigate to the **Headers** tab under the request URL bar.
2. Add a new standard header key-value pair:
   * **Key**: `Accept-Language`
   * **Value**: `id-ID,id`
3. Click **Send**.
4. **Observe**: 
   * Verify that the status code returns **`201 Created`**. 
   * The server successfully accepts the request along with your specified language preference (Indonesian).
---

### Part 3: Updating & Deleting Resources (`PUT` & `DELETE`)

#### Task 3.1: Update an Existing Resource (`PUT`)
1. Change the HTTP Method dropdown to **`PUT`**.
2. Set the URL to: `https://reqres.in/api/users/2`
3. In the **Body** tab (`application/json`), update the payload:
   ```json
   {
     "name": "Sussie",
     "job": "Senior Lead Engineer"
   }

4. Click Send.

5. Observe: Check the Status Code (200 OK) and verify the updated updatedAt timestamp in the response body.

#### Task 3.2: Delete a Resource (DELETE)
1. Change the HTTP Method dropdown to DELETE.

2. Keep the URL as: https://reqres.in/api/users/2

3. Click Send.

4. Observe: What is the Status Code? (It should be 204 No Content). Is there any data returned in the Response Body? Explain why.

### Think about the following Questions
1. What is the key difference between status codes 200 OK and 201 Created? Which HTTP methods typically return each?

2. When you sent a DELETE request, what status code did the server return, and what was inside the response body?

## S31. Build it: the Excuses API

### Set up the project

```bash
// make sure your terminal is in right path at first
mkdir excuses-api
cd excuses-api
npm init -y
npm install express
npm install --save-dev nodemon
```

`npm init -y` creates `package.json` with defaults, so there's somewhere for dependencies and scripts to live.

### `package.json` (read your package.json file and add the `dev` script)

```json
  "scripts": {
    "dev": "nodemon server.js"
  }
```


### `server.js` (new file)

```js
const express = require("express");
const app = express();
const PORT = 3000;

let excuses = [
  { id: 1, text: "My cat sat on my keyboard and deleted the file." },
  { id: 2, text: "GitHub was down. (It wasn't.)" },
  { id: 3, text: "I pushed to the wrong branch and it vanished." },
];

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Late Homework Excuses API" });
});

app.get("/api/excuses", (req, res) => {
  res.json(excuses);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

`excuses` is a plain array sitting in memory — no database yet, on purpose (that's S32's cliffhanger). Both routes just hand back data; neither reads anything from `req`.

### Run it and test both endpoints

```bash
npm run dev
```

Click http://localhost:3000/ and what will you observe? Why?

```bash
curl -i http://localhost:3000/
curl -i http://localhost:3000/api/excuses
```

Both should return `200`, `Content-Type: application/json`, and the expected JSON body. Also try `http://localhost:3000/api/excuses` directly in a browser tab — same result, different tool.

**Try this yourself:** add a fourth excuse directly in the `excuses` array in your code, save the file, and watch nodemon restart the server on its own. Re-run the `curl` command — the new excuse should appear, with no manual restart.

---

## S32. Build it: adding POST to the Excuses API

### What changes here

Everything happens inside the same `excuses-api/` project from S31 — no new folder, no new files. You're updating `server.js` only.

### Step 1 — Update `server.js`

Open `excuses-api/server.js` and make it match the complete code from Section 5 in the slides. The specific changes from S31's version:

1. Add `app.use(express.json());` **after** `const PORT = 3000;` and **before** any routes
2. Add `let nextId = 4;` after the `excuses` array
3. Add the entire `app.post("/api/excuses", ...)` route after the existing `app.get` routes

Or you can check the complete `server.js` here:

```js
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.json());              // NEW — middleware: unwrap JSON bodies

let excuses = [
  { id: 1, text: "My cat sat on my keyboard and deleted the file." },
  { id: 2, text: "GitHub was down. (It wasn't.)" },
  { id: 3, text: "I pushed to the wrong branch and it vanished." },
];
let nextId = 4;                       // NEW — persistent counter, not derived from .length

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Late Homework Excuses API" });
});

app.get("/api/excuses", (req, res) => {
  res.json(excuses);
});

// NEW — everything below this line
app.post("/api/excuses", (req, res) => {
  const { text } = req.body;          // Read from the unwrapped body

  if (!text || text.trim() === "") {  // Validate before storing
    return res.status(400).json({ error: "`text` is required and cannot be empty." });
  }

  const newExcuse = { id: nextId, text: text.trim() };
  nextId++;
  excuses.push(newExcuse);

  res.status(201).json(newExcuse);    // 201 = "created," not just "ok"
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

If your server is already running via `npm run dev`, nodemon will restart automatically when you save.

### Step 2 — Run the test sequence

```bash
# 1. Missing `text` — should fail with 400
curl -i -X POST http://localhost:3000/api/excuses \
  -H "Content-Type: application/json" \
  -d '{}'

# 2. A real excuse — should succeed with 201
curl -i -X POST http://localhost:3000/api/excuses \
  -H "Content-Type: application/json" \
  -d '{"text": "My WiFi went out during the exact commit."}'

# 3. Confirm it's there
curl -i http://localhost:3000/api/excuses
```

Check that Step 1 returns `400` with an error message, Step 2 returns `201` with `{"id": 4, "text": "..."}`, and Step 3's list now has four items.

### Step 3 — The restart test

This is Section 4's lesson made real:

1. Confirm the new excuse is in the list (Step 3 above)
2. Stop the server (`Ctrl+C`) and start it again (`npm run dev`), or save a trivial edit to `server.js` and let nodemon restart
3. Run `curl -i http://localhost:3000/api/excuses` again — only the original three remain

### Try these yourself

- Send `{"text": "   "}` (only spaces) — confirm your `.trim()` validation catches it and returns 400
- Add two more excuses in a row — confirm their ids are 4 and 5, not both 4
- Try sending a POST without the `-H "Content-Type: application/json"` header — what happens? (`req.body` stays `undefined` because `express.json()` doesn't know to parse it — the middleware checks the header first)

---

# S31–S32 Challenge · Build Your Own Mini API
### Group challenge — pick a topic, build it, open it to the class

## The challenge

In class, you followed along as we built the **Excuses API** — a server with GET (view all) and POST (add new, with validation). Now your group builds the same shape for a completely different topic, and then **opens your server to the whole class** so everyone can try it.

**Pick one topic** from the list below. Work in your group. You have **10–15 minutes** to build and test locally.

No example code is provided — you're applying S31 and S32's pattern to a new resource, not copying. If you get stuck, the shape you built in class for `excuses` is the shape you need here too.

---

## Topics — pick one per group

Each group picks a topic.

### A. Boba Run 🧋

Resource: `orders` — track a group boba order

| Field | Type | Required? |
|---|---|---|
| `id` | number | generated by the server |
| `name` | string | **yes** |
| `drink` | string | **yes** |
| `sugarLevel` | string | no — default `"100%"` |
| `iceLevel` | string | no — default `"normal ice"` |

Example valid POST body:
```json
{ "name": "Alex", "drink": "Brown Sugar Milk Tea", "sugarLevel": "50%" }
```
→ `201`, with `iceLevel` filled in from the default since it wasn't sent.

Missing `name` or `drink` → `400`.

---

### B. Class Meme Board

Resource: `memes` — a running wall of captions

| Field | Type | Required? |
|---|---|---|
| `id` | number | generated by the server |
| `caption` | string | **yes**, can't be empty or just whitespace |

Example valid POST body:
```json
{ "caption": "When the deploy works on the first try" }
```

Empty or whitespace-only `caption` → `400`.

---

### C. Song Request Queue 🎵

Resource: `requests` — a class playlist / karaoke queue

| Field | Type | Required? |
|---|---|---|
| `id` | number | generated by the server |
| `title` | string | **yes** |
| `artist` | string | **yes** |
| `requestedBy` | string | no — default `"Anonymous"` |

Example valid POST body:
```json
{ "title": "APT.", "artist": "ROSÉ & Bruno Mars", "requestedBy": "Andi" }
```

Missing `title` or `artist` → `400`.

---

### D. Campus Food Review 🍜

Resource: `reviews` — rate the food around campus

| Field | Type | Required? |
|---|---|---|
| `id` | number | generated by the server |
| `place` | string | **yes** |
| `rating` | number | **yes**, must be 1–5 |
| `comment` | string | no — default `""` |

Example valid POST body:
```json
{ "place": "Kantin Gedung A", "rating": 4, "comment": "Nasi goreng delicious!" }
```

Missing `place` → `400`. `rating` missing, not a number, or outside 1–5 → `400`.

*(This one has slightly trickier validation — a good stretch if your group is feeling confident.)*

---

## What "done" looks like

- [ ] `npm run dev` starts the server with no errors
- [ ] `GET /` returns a welcome JSON message
- [ ] `GET /api/<resource>` returns the current list (seed it with 1–2 items)
- [ ] `POST /api/<resource>` with valid data returns **201** and the created item
- [ ] A follow-up `GET` shows the new item in the list
- [ ] `POST` with a required field missing or invalid returns **400** with a clear error message, and does **not** add anything to the list
- [ ] You can explain, live, why the data disappears if the server restarts

---

## How to present — open your restaurant to the class

This is not a curl-only demo. Your group **runs the server and invites everyone to connect.**

### Preparation (before you're called up)

1. Change `app.listen` so the whole network can reach your server:

   ```js
   app.listen(PORT, "0.0.0.0", () => {
     console.log(`Server running at http://localhost:${PORT}`);
   });
   ```

2. Find your machine's LAN IP:

   ```bash
   # macOS
   ipconfig getifaddr en0

   # Windows — look for "IPv4 Address" under Wi-Fi
   ipconfig

   # Linux
   hostname -I
   ```

### Live demo (when called up)

1. **Announce your topic and IP** — write `http://<your-ip>:3000` on the board.
2. **Show the empty-ish list** — run `GET /api/<resource>` on the projector so the class sees the seed data.
3. **Invite the class** — "Everyone open your terminal and POST something." Give the class 1–2 minutes to submit entries.
4. **Show the full list** — `GET` again, projected. The list should now have entries from multiple classmates. Read a few out loud.
5. **Show validation works** — POST something deliberately invalid (missing a required field). Show the `400` response on the projector.
6. **Explain one thing** — pick any one of these and explain it in your own words:
   - Why does `return` matter before `res.status(400).json(...)`?
   - Why use a `nextId` counter instead of `array.length + 1`?
   - Why does the data disappear on restart?

### The groups who finish the small project within time and present well will get bonus!
