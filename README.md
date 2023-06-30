# SvelteTV

This is an example cross-platform TV application written in Svelte. Currently, the project aims to support the following platforms:

- AndroidTV / GoogleTV
- FireOS
- Tizen
- WebOS

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) with the following extensions:

- svelte.svelte-vscode
- fivethree.vscode-svelte-snippets
- pivaszbs.svelte-autoimport
- ardenivanov.svelte-intellisense
- esbenp.prettier-vscode
- mathiasfrohlich.Kotlin (For Android)
- ms-dotnettools.csharp (For Tizen)

## Building the app

To build the Svelte application, run `npm run build`.

To run the application in development mode within your browser, run `npm run dev`.

Developer notes:

- Due to most TVs using near-obsolete browsers, we've set our minimum development target to Chrome 38. JavaScript will be polyfilled according to the `targets` option in `vite.config.ts`. As for CSS, we have to be careful not to use unsupported features. A good resource to check css/js feature sets is [Can I Use](https://caniuse.com/).
- Currently, `npm run build` will generate both modern and legacy JavaScript. When packaging the application for WebOS you might get an error when minifying the modern js code. The file must be manually deleted and the reference to it should be removed from `index.html`.

## Setting up the Android Environment

For Android TV (and FireOS, GoogleTV, Android Mobile/Tablet) development, the process of setting up the development environment is the same as setting up the environment to develop Mobile/Tablet Android applications.

### 1. Download Android Studio

We need to install Android Studio as it contains all of the necessary dependencies needed for building Android apps.

Go to https://developer.android.com/studio/ and install Android Studio for your OS.
Once Android Studio is installed, within the Android Studio install SDK API levels 22, 25, 28, 30. These are used by FireOS and you'll need some or all of these depending on your targeted minimum OS version. If you're not targeting FireOS, choose whichever API level provides over 90% device coverage.

### 2. Install adb

This step is optional, but recommended.

Install the Android Debug Bridge, which might be useful when testing on real devices.
On (Ubuntu) Linux, this can be done by running the command `sudo apt install adb`.

On MacOS you can install it via `brew install android-platform-tools`

Alternatively, use the following link https://developer.android.com/tools/releases/platform-tools to manually install `adb` on any platform.

### 3. Enable Virtualization on your OS

While this step seems to be optional, it's recommended as it will provide hardware acceleration to the virtual devices you might use during development. On standard PCs, this would require going into BIOS settings and enabling the Virtualization tech your CPU manufacturer uses. (These are often enabled by default). In BIOS, these settings can usually be found under the following names: VT-x, VT-d, AMD-V, IOMMU, SVM, or similar names.

In addition to that, Linux requires kvm for virtualization. On Ubuntu 18-22 and it's derivatives, you can install kvm by running this command:
`sudo apt-get install qemu-kvm libvirt-daemon-system libvirt-clients bridge-utils`

On MacOS (Intel), this will require hax. There doesn't seem to be a hax-equivalent on AppleSilicon (M1/M2 CPUs), however Android Studio for ARM does seem to install the necessary virtualization dependencies for Android emulation so no further action is needed on the AppleSilicon platform.

After you've enabled virtualization, you'll need to reboot the computer for changes to apply.

### 4. Create an Android Application

You will need a basic Android Application with a WebView component which will display the content of your Svelte website. It will also need `android.permission.INTERNET` enabled unless it's a fully offline website.

Open the Android Studio and create an Android Application with an Empty Activity. The necessary changes you'll need to make are:

- Create an `assets` directory within the `app/src/main/` directory of your project. This will contain all html, css, js, and media files.
- Copy the code from `apps/android/SvelTVe/app/src/main/java/com/example/sveltve/MainActivity.kt` into your `MainActivity.kt` file. (make sure to import dependencies.). If you are using Java instead of Kotlin, check the official documentation's examples [here](https://developer.android.com/develop/ui/views/layout/webapps/webview) and [here](https://developer.android.com/develop/ui/views/layout/webapps/load-local-content)
- Check the Layout in `apps/android/SvelTVe/app/src/main/res/layout/activity_main.xml` and ensure your Main Activity layout is similar.

You can also open the project in the `./apps/android/SvelTVe/` directory and use it as a starting point.

To bundle the Svelte code into your Android application, you first need to build the Svelte project with `npm run build`, then copy the contents of the `dist` directory into the `app/src/main/assets/` directory of your application. You can do this with the `npm run bundle-tv` command within this project, or (if using the provided `SvelTVe` application) you can run `npm run bundle-android`. Then, you need to build your Android application which can be done within Android Studio.

## Setting up the Tizen Environment

### 1. Install .NET (optional)

This is an optional step which is only needed if you will also develop native .NET Tizen applications.

On (Ubuntu 22) Linux, this can be done by running the following command:

`sudo apt install dotnet-sdk-7.0`

This should also pull all the other required packages. If it did not, run the following command manually:

`sudo apt install aspnetcore-runtime-7.0 aspnetcore-targeting-pack-7.0 dotnet-apphost-pack-7.0 dotnet-host-7.0 dotnet-hostfxr-7.0 dotnet-runtime-7.0 dotnet-sdk-7.0 dotnet-targeting-pack-7.0 dotnet-templates-7.0 liblttng-ust-common1 liblttng-ust-ctl5 liblttng-ust1 netstandard-targeting-pack-2.1-7.0`

(Note that package versions might change over time, always consult the [official documentation](https://learn.microsoft.com/en-us/dotnet/core/install/linux).)

### 2. Install JDK

Install dependencies on (Ubuntu) Linux:

`sudo apt install libc6-i386 libc6-x32`

Then you can install the JDK with the following command:

`sudo apt install jdk-20`

Download the installer for your OS: https://www.oracle.com/java/technologies/downloads/

### 3. Install Tizen Studio

Install dependencies on (Ubuntu) Linux:

`sudo apt install rpm2cpio ruby libncurses5 gettext expect python2.7 libpython2.7 libsdl1.2debian`

Download and execute the installer for your OS from here: https://developer.tizen.org/development/tizen-studio/download

On Linux, you have to mark the .bin file as executable and run it. (The installer will ask you for the sudo password ~10 times because it's coded by monkeys.)

Alternatively, you can install Tizen studio via the CLI Installer by following [these instructions](https://docs.tizen.org/application/tizen-studio/setup/install-sdk/).

If you're using the GUI to install Tizen Studio, make sure to launch the Tizen package manager and install the following:

- Tizen SDK tools
- 7.0/6.5./6.0/5.5/5.0 Mobile and Wearable (Depending on the minimum platform target)
- Extras (In Extension SDK)

If you're using the CLI:

Within the `~/tizen-studio` directory execute `./package-manager/package-manager-cli.bin show-pkgs` to list all packages available.
For TV apps, we require the following:

| Status | Name                                 | Version | Description                |
| ------ | ------------------------------------ | ------- | -------------------------- |
| i      | MOBILE-7.0-WebAppDevelopment-CLI     | 0.0.13  | Web app. development (CLI) |
| i      | WEARABLE-7.0-WebAppDevelopment-CLI   | 0.0.13  | Web app. development (CLI) |
| i      | MOBILE-6.5-WebAppDevelopment-CLI     | 0.0.9   | Web app. development (CLI) |
| i      | WEARABLE-6.5-WebAppDevelopment-CLI   | 0.0.9   | Web app. development (CLI) |
| i      | MOBILE-5.0-WebAppDevelopment-CLI     | 0.2.3   | Web app. development (CLI) |
| i      | WEARABLE-5.0-WebAppDevelopment-CLI   | 0.2.3   | Web app. development (CLI) |
| i      | MOBILE-4.0-WebAppDevelopment-CLI     | 0.2.2   | Web app. development (CLI) |
| i      | WEARABLE-4.0-WebAppDevelopment-CLI   | 0.2.2   | Web app. development (CLI) |
| i      | MOBILE-3.0-WebAppDevelopment-CLI     | 0.2.0   | Web app. development (CLI) |
| i      | WEARABLE-3.0-WebAppDevelopment-CLI   | 0.2.0   | Web app. development (CLI) |
| i      | MOBILE-2.4-WebAppDevelopment-CLI     | 2.6.0   | Web app. development (CLI) |
| i      | WEARABLE-2.3.2-WebAppDevelopment-CLI | 0.2.0   | Web app. development (CLI) |
| i      | MOBILE-2.3.1-WebAppDevelopment-CLI   | 2.5.0   | Web app. development (CLI) |
| i      | WEARABLE-2.3.1-WebAppDevelopment-CLI | 2.5.0   | Web app. development (CLI) |
| i      | MOBILE-2.3-WebAppDevelopment-CLI     | 2.6.0   | Web app. development (CLI) |
| i      | WEARABLE-2.3-WebAppDevelopment-CLI   | 2.6.0   | Web app. development (CLI) |
| i      | Certificate-Manager                  | 2.8.7   | Certificate Manager        |
| i      | Emulator                             | 2.8.7   | Emulator manager           |
| i      | WebCLI                               | 2.8.7   | Web CLI                    |
| i      | WebIDE                               | 2.8.7   | Web IDE                    |
| i      | TV-SAMSUNG-Public                    | 7.0.0   | TV Extensions-7.0          |
| i      | TV-SAMSUNG-Public-Emulator           | 7.0.0   | Emulator                   |
| i      | TV-SAMSUNG-Public-WebAppDevelopment  | 7.0.0   | Web app. development       |
| i      | TV-SAMSUNG-Extension-Tools           | 7.0.0   | TV Extensions Tools        |
| i      | TV-SAMSUNG-Extension-Resources       | 7.0.0   | Web app. tools             |

> If you are having trouble with the package manager finding a Java installation on your device, make sure you have the JDK (8+) installed and the JAVA_HOME env variable pointing to the proper installation directory. If it's still giving you trouble, delete '~/.package-manager' and it should work.

### 4. Run your tizen application on tizen platform (simulator or emulator)

Open your Tizen Studio and import tizen application which u previously bundled with `npm run bundle-tizen`,

it should be located `~/Svelte-TV/apps/tizen/SvelTVe` then build the application inside the Tizen Studio.

After you builded tizen application run it in whatever mode you want, preferably tizen simulator(TV) since it should work on all CPU architectures.

If you want to use emulator u must check that your CPU support hardware-assisted virtualization, check it [here](https://developer.samsung.com/smarttv/develop/tools/prerequisites.html)

To run your application on real device (Samsung Smart TV) follow [these instructions](https://developer.samsung.com/smarttv/develop/getting-started/using-sdk/tv-device.html)

## Setting up WebOS environment

### 1. Installing the CLI and Simulator

CLI install instructions: https://webostv.developer.lge.com/develop/tools/cli-installation
Simulator install instructions: https://webostv.developer.lge.com/develop/tools/simulator-installation

In short, you have to do the following:

1. download the CLI archive and extract it somewhere (for example `/home/USERNAME/.local/opt/webOS_TV_SDK/CLI/`)
2. add the following into your `.zshrc` or `.bashrc` file:

```bash
# Setting the LG_WEBOS_TV_SDK_HOME variable to the parent directory of CLI
export LG_WEBOS_TV_SDK_HOME="/home/USERNAME/.local/opt/webOS_TV_SDK/"

if [ -d "$LG_WEBOS_TV_SDK_HOME/CLI/bin" ]; then
  # Setting the WEBOS_CLI_TV variable to the bin directory of CLI
  export WEBOS_CLI_TV="$LG_WEBOS_TV_SDK_HOME/CLI/bin"
  # Adding the bin directory of CLI to the PATH variable
  export PATH="$PATH:$WEBOS_CLI_TV"
fi
```

3. open a new terminal and run `ares -V` to check if it's correctly installed (you might have to run `source ~/.zshrc` or `source ~/.bashrc`)
4. Download the Simulator archive and extract it within a `Simulator` directory next to the CLI directory (for example, `/home/USERNAME/.local/opt/webOS_TV_SDK/Simulator/webOS_TV_23_Simulator_1.3.0/`)

### 2. Create a WebOS Application

You can create a new WebOS application by executing the `ares-generate` command. For example, the provided `SvelTVe` application was created by executing `ares-generate -t basic ./apps/webos`.

After creating the application, you can simply build the Svelte with `npm run build`, then copy the contents of the `dist` directory into the root directory of your project. You can do this with the `npm run bundle-tv` command within this project, or (if using the provided `SvelTVe` application) you can run `npm run bundle-webos`. Then, you need to package your application with `ares-package`, for example `ares-package ./apps/webos`.
