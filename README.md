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

To bundle the Svelte code into your Android application, you first need to build the Svelte project with `npm run build`, then copy everything from the `dist` directory into the `app/src/main/assets/` directory of your application. You can do this with the `npm run bundle-tv` command within this project, or (if using the provided `SvelTVe` application) you can run `npm run bundle-android`. Then, you need to build your Android application which can be done within Android Studio.

Developer notes:

- WebView doesn't seem to be able to execute JavaScript within Android Emulators in the Android Studio, the only found exceptions are SDK level 34 Emulators. You can still run the application on real devices, using Remote Debugging or `adb`.

## Setting up the Tizen Environment

### 1. Install .NET

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

Or download the installer: https://www.oracle.com/java/technologies/downloads/
and run it with `sudo dpkg -i jdk-20_linux-x64_bin.deb`

### 3. Install Tizen Studio

Install dependencies on (Ubuntu) Linux:

`sudo apt install rpm2cpio ruby libncurses5 gettext expect python2.7 libpython2.7 libsdl1.2debian`

Then download the installer: https://developer.tizen.org/development/tizen-studio/download

Mark it as executable and run the .bin file.

This will install it in the `/home/USERNAME/tizen-studio` and `/home/USERNAME/tizen-studio-data` dirs.
(The installer will ask you for the sudo password ~10 times because it's not well made and runs multiple separate `sudo apt install` commands in separate sessions.)

Make sure to launch the Tizen package manager. Click install on

- Tizen SDK tools
- 7.0/6.5./6.0/5.5/5.0 Mobile and Wearable (Depending on the minimum platform target)
- Extras (In Extension SDK)
