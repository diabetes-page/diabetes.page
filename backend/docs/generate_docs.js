import walk from 'file-walker';

const SEARCH_DIR = './src/domains';

class Documentation {
  constructor() {
    this.domains = {};
  }
}

class DocsMaker {
  constructor() {
    this.docs = new Documentation();
  }

  run() {
    walk(SEARCH_DIR, function (dir, files, level) {
      console.log(dir, files, level);
      // 1st iteration, level = 0, dir = './test', files = ['a.js', 'b']
      // 2nd iteration, level = 1, dir = './test/b', files = ['c.js', 'd.js']
      // your logic
    });
  }
}
