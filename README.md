# diabetes.page

This repository contains code which was written for the now-concluded startup diabetes.page. The code is now licensed under the MIT license.

The following people participated in this startup (in alphabetical order):
- Alexander Remmes
- David Matthaei
- Joe Hewett
- Philipp Page
- Tom Diacono
- Vincent Rolfs

## Introduction

This is the repository for the diabetes.page software. It contains two main parts:

- The `backend`, which offers an API written using `nest.js`.
- The `frontend`, which contains the code for the web version and mobile apps, written using `expo`.

There is also the `jitsi` service, which handles videostreaming and is of course built with `jitsi`. It is hosted in another repository.

## Installation

First, clone the repository using

```bash
git clone git@bitbucket.org:thesoftwarebrothers/diabetes.page.git diabetes-page
```

You will probably need to setup your SSH key first. [Check the bitbucket support page for SSH keys.](https://support.atlassian.com/bitbucket-cloud/docs/set-up-an-ssh-key/)

Check if you have `node` installed by executing `node --version`. If not, [download the newest (LTS) version here.](https://nodejs.org/en/)

Next, enter the new directory with `cd diabetes-page` and install the root-level npm packages with `npm install`.

Now, you will have to install the `backend`, `frontend`and `jitsi` services. For each of these, just `cd` into the directory and then follow the instructions in the `README.md` of that directory.

## Setting up your IDE

We recommend using [WebStorm](https://www.jetbrains.com/webstorm/) for development. The following settings are recommended:

- Under `Settings > Languages & Frameworks > JavaScript > Code Quality Tools > ESLint` select `Automatic ESLint configuration`.
- Under `Settings > Languages & Frameworks > JavaScript > Prettier` select the Prettier package
  at `YOUR_PROJECT_FOLDER/node_modules/prettier` and check the boxes `On code reformat` and `On save`
  - Whenever you save the file, it will be formatted for you automatically!
  - You may want to develop the habit of always hitting `Ctrl+S` to format your code
- Mark the directories `backend/dist` and `frontend/.next` as excluded by right clicking them
  and selecting `Mark Directory as > Excluded`
- Under `Settings > Appearance & Behaviour > Appearance` select the cool `Darcula` theme ;)

## Other recommended software

- We recommend using [Typora](https://typora.io/) to edit markdown files.
- For inspecting the Postgres database, [Beekeper Studio](https://www.beekeeperstudio.io/) is a nice application.
