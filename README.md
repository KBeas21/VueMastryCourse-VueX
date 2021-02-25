# real-world-vue

This application came from [lesson11-vuex-start](https://github.com/Code-Pop/real-world-vue/releases/tag/lesson11-vuex-start) and is the Vue Mastery class, [Mastering VueX](https://www.vuemastery.com/courses/mastering-vuex/intro-to-vuex). I will be using this to learn VueX for work. The initial commit to master has Basic state & getters inside of it. The getters are used through computed values inside of [EventCreate.vue](src/views/EventCreate.vue) & [store.js](src/store.js).

## Project setup

```
npm install
```

### Running a mock server

Since our app will be making API calls, we’ll be using [json-server](https://www.npmjs.com/package/json-server). This is a full fake REST API, which allows us to perform API calls that pull from a mock database. You’ll need to install the library if you haven’t already. To do so, run this command in your terminal: `npm install -g json-server`. We then need to run the command `json-server --watch db.json`, which turns on json-server and tells it to watch our `db.json` file, which is our mock database.

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```
