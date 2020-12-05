import fs from 'fs';

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
    fs.readdir(SEARCH_DIR, (_, domains) => domains.map(this.parseDomain));
  }

  parseDomain(domain) {
    fs.readdir(`${SEARCH_DIR}/${domain}`, (_, routes) =>
      routes.map((route) => this.parseRoute(domain, route)),
    );
  }

  parseRoute(domain, route) {}
}

new DocsMaker().run();
