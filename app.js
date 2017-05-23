const NYTBaseUrl = "https://api.nytimes.com/svc/topstories/v2/";
const ApiKey = "your-api-key";

function buildUrl (url) {
  return NYTBaseUrl + url + ".json?api-key=" + ApiKey;
}

const vm = new Vue({
  el: '#app',
  data: {
    results: []
  },
  mounted() {
    this.getPosts('home');
  },
  methods: {
    getPosts(section) {
      let url = buildUrl(section);
      axios.get(url).then(response => {
        this.results = response.data.results;
      }).catch(error => { console.log(error); });
    }
  },
  computed: {
    processedPosts() {
      let posts = this.results;

      // Add image_url attribute
      posts.map(post => {
        let imgObj = post.multimedia.find(media => media.format === "superJumbo");
        post.image_url = imgObj ? imgObj.url : "http://placehold.it/300x200?text=N/A";
      });

      console.log(posts);

      // Put Array into Chunks
      let i, j, chunkedArray = [], chunk = 4;
      for (i=0, j=0; i < posts.length; i += chunk, j++) {
        chunkedArray[j] = posts.slice(i, i+chunk);
      }
      return chunkedArray;
    }
  }
});

