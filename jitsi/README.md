# diabetes.page jitisi

This the videostreaming service of diabetes.page. It is a modified version of `jitsi`.

## Installation

### Step 1: Setting up the environment

```bash
sudo rm -rf ~/.jitsi-meet-cfg
cp env.example .env
./gen-passwords.sh
```

Then, configure the .env correctly. For example, set `ENABLE_AUTH` and so on. Also set `PUBLIC_URL` to the url of the frontend, for example `PUBLIC_URL=http://localhost:19006/`. This is to ensure that CORS headers are set correctly. The relevant code for CORS can be found in `/web/rootfs/default/meet.conf`.

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

This actually builds all the parts that constitute Jitsi. But we only made changes to the web part so far, so this is probably overkill. Most likely, you can instead follow the instructions in "Rebuilding to incorporate changes" to only build the web part. THe other parts will then just use the public docker image.

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

For using `make`, you may also use `FORCE_REBUILD=1` like `sudo make build JITSI_SERVICE=web FORCE_REBUILD=1`.