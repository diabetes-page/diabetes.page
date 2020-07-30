---
Created: "2020-07-24"
Author: "Vincent Rolfs"
---

# A general development setup for The Software Brothers

This aims to become a general guideline for software projects developed by The Software Brothers. It will encompass the following modules:

- Backend
- Web frontend
- Mobile frontend
- Desktop frontend

It will provide standards for the following aspects of development:

- Technologies
- Frameworks
- Tools
- Code Style
- Testing
- DevOps
- Documentation
- Culture

## Backend

The following options for backend frameworks are currently in the running

- JavaScript nest.js
- Java Spring
- Rust Rocket
- PHP Laravel

### JavaScript Nest.js

Database migrations: https://medium.com/better-programming/typeorm-migrations-explained-fdb4f27cb1b3
Download omniDB

### Choice of database
The choice was between MySQL and Postgres. I decided to use Postgres, as it generally seems to be more sane with more/better features and conforming to standards. See https://developer.okta.com/blog/2019/07/19/mysql-vs-postgres for a comparison.

Down the line we might have to deal with some problems detailed in https://medium.com/@rbranson/10-things-i-hate-about-postgresql-20dbab8c2791, but this is very advanced use.

See here for installation on Ubuntu (German): https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04-de

Set password for default user `postgres`:
`sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"`
Create test db:
`sudo -u postgres psql -c "CREATE DATABASE testdb;"`
Start/stop service:
`sudo service postgresql start`

Default port is `5432`.

### Java Spring

#### Install Java

Download Open JDK 14, with OpenJ9 at https://adoptopenjdk.net/releases.html?variant=openjdk14&jvmVariant=openj9. My exact Version is jdk-14.0.2+12_openj9-0.21.0 aka [OpenJDK14U-jdk_x64_linux_openj9_14.0.2_12_openj9-0.21.0.tar.gz](https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/14/jdk/x64/linux/OpenJDK14U-jdk_x64_linux_openj9_14.0.2_12_openj9-0.21.0.tar.gz), SHA256 checksum 306f7138cdb65daaf2596ec36cafbde72088144c83b2e964f0193662e6caf3be.

Unzip it and copy it to /usr/lib/jvm/

For example:

```
> ls -l /usr/lib/jvm
total 12
lrwxrwxrwx 1 root root   21 Apr 16 05:12 java-1.11.0-openjdk-amd64 -> java-11-openjdk-amd64/
drwxr-xr-x 9 root root 4096 Jul 24 12:11 java-11-openjdk-amd64/
drwxr-xr-x 9 root root 4096 Jul 24 12:24 jdk-14.0.2+12/
drwxr-xr-x 2 root root 4096 Jul 24 12:11 openjdk-11/
```

Note the `jdk-14.0.2+12/`.

Next, use https://askubuntu.com/questions/1106736/how-fix-mistake-made-with-update-alternatives to update the java alternatives:

`sudo update-alternatives --install /usr/bin/java java /usr/lib/jvm/jdk-14.0.2+12/bin/java 2222`

The last number is the priority, see https://askubuntu.com/questions/533391/what-does-priority-mean-in-update-alternatives.

You may also use apt-get on Ubuntu 20.

Note that if you use `update-alternatives`, it will not set `$JAVA_HOME` for you. You might want to put something like this in `~/.bashrc` ([from here](https://stackoverflow.com/questions/663658/what-is-the-correct-target-for-the-java-home-environment-variable-for-a-linux-op#:~:text=If%20you%20use%20alternatives%20to%20manage%20multiple%20java,this%3A%20export%20JAVA_HOME%3D%24%28readlink%20-f%20%2Fusr%2Fbin%2Fjava%20%7C%20sed%20%22s%3Abin%2Fjava%3A%3A%22%29)):

```
export JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")
```

#### Maven vs Gradle

[See here for a comparison.](https://dzone.com/articles/gradle-vs-maven)

I think we should definitely use Gradle.

#### Mirrors for China
Gradle:
See https://www.jianshu.com/p/32bc688e1b69

Maven:
To use a mirror (for example in China), edit `~/.m2/settings.xml​` (or create if it doesn't exist). [See here for how to set mirrors](http://maven.apache.org/guides/mini/guide-mirror-settings.html). [See here for some chinese mirrors.](https://maven.ityuan.com/article/1334)

#### Hotswapping

It is crucial that we see the changes made in the backend as soon as possible during development.

There is an easy way and a hard way. For the easy way, see

https://stackoverflow.com/questions/23155244/spring-boot-hotswap-with-intellij-ide

But this is slow.

For the hard way, see http://hotswapagent.org/.

Then configure IntelliJ: http://hotswapagent.org/mydoc_setup_intellij_idea.html

But the plugin doesn't work for JDK11: https://github.com/dmitry-zhuravlev/hotswap-agent-intellij-plugin/issues/29

It still works if you follow the instructions in "Other way:" from the IntelliJ configuration post (you need to remove ctrl+s for save). Note that the hotswapping is only activated in debug mode! See http://hotswapagent.org/mydoc_quickstart-jdk11.html. See also there for configuration options.

#### Non-null by default

See https://medium.com/square-corner-blog/non-null-is-the-default-58ffc0bb9111

#### Validation

https://spring.io/guides/gs/validating-form-input/

This doesn't work for me, all fields in the form are set to zero.

#### Java Spring conclusion
It is an absolute pain to work with so far. I will explore other options.

