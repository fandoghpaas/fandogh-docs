---
layout: fandogh
id: file-browser-managed-service
title: File Browser
sidebar_label: File Browser
---

## ![Filebrowser](/img/docs/file-browser-managed-service.png "Filebrowseer")

یکی از مشکلات کاربران بر روی سکو‌های ابری، دسترسی به داده‌های ذخیره‌شده بر روی Storage است، برای آنکه بتوانید به صورت گرافیکی با محل ذخیره‌سازی داده‌ها کار کنید و داده‌های خود را دانلود و آپلود و یا حتی Edit کنید، می‌توانید از سرویس مدیریت شده File Browser فندق استفاده کنید.

برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| filebrowser| نامی که برای سرویس مایلید در نظر گرفته شود|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید نام کاربری و رمزعبور سرویس FileBrowser به صورت پیش فرض Admin/Admin است و بهتر است بعد از اولین ورود، از طریق داشبورد رمز عبور خود را تغییر دهید.

برای دیپلوی کردن یک File Browser می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy filebrowser latest \
       -c service_name=test-file-browser \
       -c volume_name=VOLUME_NAME
       -m 512
```
این دستور یک سرویس FileBrowser ایجاد می‌کند که:
* نام آن test-file-browser
* میزان رم آن 512 مگابایت.
* و نام volume که داده‌های File Browser بر روی آن ذخیره می‌شود VOLUME_NAME است.

> در صورتی که volume_name را مشخص نکنید، این سرویس به Shared Storage متصل می‌شود اما به خاطر داشته باشید که Shared Storage برای هر کاربر ۲.۵ گیگابایت است و در صورتی که مازاد آن داده‌ای را ذخیره کنید، احتمال پاک شدن آن وجود دارد و سکوی ابری فندق مسئولیتی در قبال آن ندارد.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست File Browser با Dedicated Volume
```
kind: ManagedService
name: test-file-browser
spec:
  service_name: filebrowser
  version: latest
  parameters:
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

- مانیفست File Browser بدون Dedicated Volume
```
kind: ManagedService
name: test-file-browser
spec:
  service_name: filebrowser
  version: latest
  resources:
      memory: 512Mi
```
