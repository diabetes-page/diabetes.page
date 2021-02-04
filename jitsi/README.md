# diabetes.page jitisi

This the videostreaming service of diabetes.page. It is a modified version of `jitsi`.

## Installation

### Step 1: Setting up the environment

```bash
sudo rm -rf ~/.jitsi-meet-cfg
cp env.example .env
./gen-passwords.sh
```

Then, configure the .env correctly. For example, set `ENABLE_AUTH` and so on. Also set ``PUBLIC_URL` to the url of the frontend, for example `PUBLIC_URL=http://localhost:19006/`. This is to ensure that CORS headers are set correctly. The relevant code for CORS can be found in `/web/rootfs/default/meet.conf`.

### Step 2: Setting up the `web` part

You will need to have `node` installed already.

```bash
cd web/rootfs/jitsi-meet
npm install
make
dpkg-buildpackage -d -A -rfakeroot -us -uc -tc
cd ../../..
```

### Step 3: Building the videostreaming service
```bash
sudo make all
sudo make tag-all
```

## Running the videostreaming service

```bash
docker-compose up -d
```

## Rebuilding to incorporate changes

We only need to rebuild the web part.

```bash
cd web/rootfs/jitsi-meet
npm install
make
dpkg-buildpackage -d -A -rfakeroot -us -uc -tc
cd ../../..
sudo make build JITSI_SERVICE=web
sudo make tag JITSI_SERVICE=web
```

It is not a typo that we have `JITSI_SERVICES` with an `s` and `JITSI_SERVICE` without an `s`.

For using `make`, you may also use `FORCE_REBUILD=1` like `sudo make build JITSI_SERVICE=web FORCE_REBUILD=1`.