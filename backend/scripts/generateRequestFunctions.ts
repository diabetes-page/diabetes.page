import * as fs from 'fs';

const DOMAINS_DIR = 'src/domains';
const ROUTES_DIR = '/routes';
const BACKEND_PREPEND = '../../../../backend';
const OUTPUT_FILE = '../frontend/src/utilities/requests/requests.ts';

class RequestFinder {
  private imports =
    '/**\n' +
    ' * This file was autogenerated using the route definitions from the backend.\n' +
    ' */\n' +
    'import { AxiosResponse } from "axios";\n' +
    'import {Get, Post, Put, Patch, Delete, withAuth} from "./axios";';
  private types: string[] = [];
  private requests: string[] = [];

  public run(): RequestFinder {
    fs.readdirSync(DOMAINS_DIR).forEach((domain) => {
      this.buildResourceImportsForDomain(domain);
      this.parseDomain(domain);
    });

    return this;
  }

  public write(): void {
    const output =
      this.imports +
      '\n\n' +
      this.types.join('\n') +
      '\n\nexport const requests = {\n' +
      this.requests.join(',\n\n') +
      '\n};';

    fs.writeFileSync(OUTPUT_FILE, output);
    console.log('Wrote to ' + OUTPUT_FILE);
  }

  private buildResourceImportsForDomain(domain: string): void {
    const baseDir = `${DOMAINS_DIR}/${domain}/resources`;
    if (!fs.existsSync(baseDir)) {
      return;
    }
    fs.readdirSync(baseDir).forEach((resourceFile) => {
      const resourceName = resourceFile.substring(0, resourceFile.length - 3);
      const resourcePath = `${BACKEND_PREPEND}/${baseDir}/${resourceName}`;
      this.imports += `\nimport { ${resourceName} as Backend${resourceName} } from '${resourcePath}';`;
      this.types.push(`export type ${resourceName} = Backend${resourceName};`);
    });
  }

  private parseDomain(domain: string): void {
    const baseDir = `${DOMAINS_DIR}/${domain}${ROUTES_DIR}`;
    if (!fs.existsSync(baseDir)) {
      return;
    }
    fs.readdirSync(baseDir).forEach((route) => {
      this.buildResourceImportForRoute(route, baseDir);
      this.parseRoute(route, baseDir);
    });
  }

  private buildResourceImportForRoute(route: string, baseDir: string): void {
    const file = `${baseDir}/${route}/Resource`;
    if (!fs.existsSync(file + '.ts')) {
      return;
    }
    const resourceName = capitalize(route) + 'Resource';
    const resourcePath = `${BACKEND_PREPEND}/${file}`;
    this.imports += `\nimport { Resource as Backend${resourceName} } from '${resourcePath}';`;
    this.types.push(`export type ${resourceName} = Backend${resourceName};`);
  }

  private parseRoute(route: string, baseDir: string): void {
    const dir = `${baseDir}/${route}`;
    const [requestType, routeUrl, urlParams] = this.parseRouteDefinition(
      route,
      dir,
    );
    const requestDataParameters = this.parseParameterDefinition(dir);
    const resource = this.parseResourceDefinition(route, dir);

    this.buildRequestCode(
      route,
      requestType,
      routeUrl,
      urlParams,
      requestDataParameters,
      resource,
    );
  }

  private parseRouteDefinition(
    route: string,
    dir: string,
  ): [string, string, string[]] {
    const path = `${dir}/${capitalize(route)}.ts`;
    const contents = fs.readFileSync(path, 'utf8');

    const routeUrlRegex = /@(Get|Post|Put|Patch|Delete)\('([^']*)'\)/;
    const routeUrlRegexMatch = contents.match(routeUrlRegex);
    if (!routeUrlRegexMatch) {
      throw new Error('Could not find route url in path: ' + path);
    }
    const requestType = routeUrlRegexMatch[1];
    const routeUrlWithParams = routeUrlRegexMatch[2];

    const urlParams: string[] = [];
    const urlParamsRegex = /:([^/]+)/g;
    const routeUrl =
      '`' +
      routeUrlWithParams.replace(urlParamsRegex, (_: any, match: string) => {
        urlParams.push(match);
        return '${' + match + '}';
      }) +
      '`';

    return [requestType, routeUrl, urlParams];
  }

  private parseResourceDefinition(route: string, dir: string): string {
    const path = `${dir}/${capitalize(route)}.ts`;
    const contents = fs.readFileSync(path, 'utf8');
    const resourceRegex = /public\s+static\s+Resource\s+=\s+(\w+);/;
    const resourceRegexMatch = contents.match(resourceRegex);
    if (!resourceRegexMatch) {
      throw new Error('Could not find resource definition in path: ' + path);
    }
    const resource = resourceRegexMatch[1];

    if (resource === 'Resource') {
      return `${capitalize(route)}Resource`;
    }

    return resource;
  }

  private parseParameterDefinition(dir: string): string | undefined {
    const path = `${dir}/Parameters.ts`;
    if (!fs.existsSync(path)) {
      return;
    }
    const contents = fs.readFileSync(path, 'utf8');
    const regex = /class\s+Parameters[^{]+{([\s\S]+)}/;
    const regexMatch = contents.match(regex);
    if (!regexMatch) {
      throw new Error('Could not find parameters in path: ' + path);
    }
    const paramsWithDecorators = regexMatch[1];
    return paramsWithDecorators.replace(/\s*(?:@|\/\/).+/g, '');
  }

  private buildRequestCode(
    route: string,
    requestType: string,
    routeUrl: string,
    urlParams: string[],
    requestDataParameters: string | undefined,
    resource: string,
  ): void {
    const requestArguments = urlParams.map((p) => `${p}: string`);

    if (requestDataParameters) {
      this.types.push(
        `export type ${capitalize(
          route,
        )}Parameters = {${requestDataParameters}};`,
      );

      requestArguments.push(`data: ${capitalize(route)}Parameters `);
    }

    let callArguments;

    if (requestDataParameters) {
      if (requestType === 'Get') {
        callArguments = 'await withAuth({ params: data })';
      } else {
        callArguments = 'data, await withAuth()';
      }
    } else {
      if (requestType === 'Get') {
        callArguments = 'await withAuth()';
      } else {
        callArguments = '{}, await withAuth()';
      }
    }

    this.requests.push(
      `  ${route}: async (${requestArguments.join(
        ', ',
      )}): Promise<AxiosResponse<${resource}>> => ${requestType}(${routeUrl}, ${callArguments})`,
    );
  }
}

function capitalize(input: string): string {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

new RequestFinder().run().write();
