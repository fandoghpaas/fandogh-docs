---
layout: fandogh
id: volume-browser
title: Volume Browser
sidebar_label: Volume Browser 
---
یکی از نیازمندی‌های کاربران در استفاده از فضاهای ذخیره سازی اختصاصی یا همان **Dedicated Volumes** دسترسی راحت به این فضاها برای مدیریت و آپلود و یا دانلود فایل‌ها است؛\
یکی از روش‌های مدیریت فضاهای ذخیره‌سازی ایجاد [سرویس مدیریت فایل](https://docs.fandogh.cloud/docs/file-browser-managed-service.html) است که می‌توانید این سرویس را به فضای ذخیره‌سازی اختصاصی متصل کرده و داده‌های موجود بر روی فضا را مدیریت کنید.\
<br>
مشکل اصلی زمانی است که شما فضای ذخیره‌سازی که در حال حاضر به سرویس دیگری متصل شده است را مدیریت کنید!\
همانطور که در بخش [فضای ذخیره‌سازی اختصاصی](https://docs.fandogh.cloud/docs/dedicated-volume.html#%DB%B2-%D9%81%D8%B6%D8%A7%DB%8C-%D8%B0%D8%AE%DB%8C%D8%B1%D9%87-%D8%B3%D8%A7%D8%B2%DB%8C-%D8%A7%D8%AE%D8%AA%D8%B5%D8%A7%D8%B5%DB%8C-dedicated-volume) توضیح داده شده است، هر فضای ذخیره‌سازی اختصاصی تنها می‌تواند به یک سرویس متصل شود و در صورت تلاش برای اتصال دو سرویس به یک فضا با خطا سرور مواجه خواهید شد!

![Volume Attachment Limit](/img/docs/volume-attachment-limit.png "Volume Attachment Limit")

حال راه حل چیست؟\
برای این مشکل سکوی ابری فندق قابلیت جدیدی را با نام **Volume Browser**  به سرویس‌های خود اضافه کرده است.


## نحوه کارکرد Volume Browser
با این قابلیت هر سرویس که به **هر تعداد Dedicated Volume** متصل شده باشد در کنار خود یک سرویس مدیریت فایل هم خواهد داشت که با استفاده از آن می‌توانید تمامی مسیر‌های موجود در آن فضاها را مشاهده کرده و مدیریت کنید.\
برای درک بهتر به شکل زیر دقت نمایید.

![Volume Browser Containers](/img/docs/volume-browser-containers.png "Volume Browser Containers ")

همانطور که در شکل بالا مشاهده می‌کنید هر سرویس یک کانتینر اصلی خواهد داشت که از توسط شما توسطی ایمیجی که آدرس آن را داده‌اید ساخته شده و مستقر می‌شود. در کنار کانتینر اصلی یک کانتینر دیگر در همان سرویس ساخته خواهد شد به Dedicated Volume متصل است و می‌تواند محتوای داخل فضای ذخیره‌سازی را مشاهده کرده و آن را مدیریت کند.

## نحوه فعالسازی Volume Browser
برای آنکه بتوانید قابلیت **File Browser** را برای سرویس خود فعال کنید، کافی است مقدار `volume_browser_enabled` را داخل [مانیفست سرویس](https://docs.fandogh.cloud/docs/service-manifest.html) فعال کنید.\
به صورت پیشفرض مقدار `volume_browser_enabled` در تمام سرویس‌ها **false** است و در صورتی که این مقدار را برابر با **true** قرار دهید، این کانتینر برای شما فعال شده و از طریق مرورگر با لینکی به ساختار زیر در دسترس خواهد بود:
```
SERVICE_NAME-volume-browser-NAMESPACE_NAME.fandogh.cloud
```
در آدرس فوق، منظور از **SERVICE_NAME** همان نامی است که در ابتدا برای سرویس خود انتخاب می‌کنید؛ فندق از همین اسم برای ساخت لینک کانتینر File Browser استفاده می‌کند.

> توجه داشته باشید برای آنکه بتوانید از این قابلیت استفاده کنید، سرویس باید حداقل به یک Dedicated Volume متصل شده باشد، در غیر این صورت با خطای سرور مواجه خواهید شد.

## مانیفست آزمایش Volume Browser
برای آنکه با این ویژگی بهتر آشنا شوید می‌توانید از مانیفست زیر استفاده کنید.\
این مانیفست یک سرویس سبک از ایمیج nginx نسخه alpine ایجاد کرده و بعد از استقرار آن را به یک Dedicated Volume متصل می‌کند که باید از قبل آن را داخل فضانام خود ساخته و نام آن را جای ENTER_VOLUME_NAME قرار داده باشید.
```
kind: ExternalService
name: nginx
spec:
  image: _/nginx:alpine
  image_pull_policy: IfNotPresent
  volume_browser_enabled: true
  volume_mounts:
  - mount_path: /test_dir
    volume_name: ENTER_VOLUME_NAME
  resources:
      memory: 200Mi
```
بعد از اینکه سرویس به درستی مستقر شد یک لینک برای شما نمایش داده خواهد شد که از طریق آن می‌توانید با استفاده از مرورگر به کانتینر **File Browser** دسترسی داشته باشید.
```
nginx-volume-browser-NAMESPACE_NAME.fandogh.cloud
```
در لینک بالا همانطور که مشاهده می‌کنید جای **SERVICE_NAME** که پیشتر توضیح داده شد، نام **nginx** قرار داده شده است و جای **NAMESPACE_NAME** هم نام فضانام شما قرار خواهد گرفت.
