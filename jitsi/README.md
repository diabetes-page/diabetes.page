# diabetes.page jitisi

This the videostreaming service of diabetes.page. It is a modified version of `jitsi`.

## Installation

### Step 1: Setting up the environment

```bash
sudo rm -rf ~/.jitsi-meet-cfg
cp env.example .env
./gen-passwords.sh
```

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
sudo make
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
sudo make JITSI_SERVICES=web
```

Sometimes you may need `sudo make JITSI_SERVICES=web FORCE_REBUILD=1`.