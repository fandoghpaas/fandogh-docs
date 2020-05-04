---
layout: fandogh
id: minio-managed-service
title: Minio
sidebar_label: Minio
---


## ![Minio](/img/docs/minio-managed-service.png "Minio")

اگر شما به دنبال راه حلی برای ذخیره‌سازی داده‌های متفاوت هستید بهتر است از Object Storageها استفاده کنید.
یکی از این Object Storageها MinIO است. </br>
MinIO یک  [cloud storage](https://en.wikipedia.org/wiki/Cloud_storage "Cloud storage") سازگار با [Amazon S3](https://en.wikipedia.org/wiki/Amazon_S3 "Amazon S3") است که به شما این امکان را می دهد تا فایل‌های خود را بر روی آن ذخیره کنید و سرویس‌ها از طریق ارتباط API به آن‌ها دسترسی داشته باشند.<br/>

> توجه داشته باشید maximum اندازه یک فایل برای یک Object نمیتواند بیشتر از ۵ ترابایت باشد.

برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| minio| نامی که برای سرویس مایلید در نظر گرفته شود|
|minio_access_key| string| | مقدار access key|
|minio_secret_key| string| |مقدار secret key|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|

> توجه داشته باشید طول minio_access_key و minio_secret_key باید بیشتر از ۱۲ کاراکتر باشد، در غیر این صورت با خطای سرور مواجه خواهید شد.

برای دیپلوی کردن یک سرویس MinIO می‌توانیم به شکل زیر عمل کنیم:
```
  fandogh managed-service deploy minio latest \
       -c service_name=test-minio \
       -c minio_access_key=12charchters
       -c minio_secret_key=12charchters
       -c volume_name=VOLUME_NAME
       -m 512
```
این دستور یک سرویس MinIO ایجاد می‌کند که:
* نام آن test-minio ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-minio و بر روی پورت 9000 می‌توانند به آن متصل شوند)  است.
* میزان رم آن 512 مگابایت.
* minio_access_key آن 12charchters
* minio_secret_key آن 12charchters 
* و نام volume که داده‌های minio بر روی آن ذخیره می‌شود VOLUME_NAME است.

بعد از آن که سرویس MinIO ساخته شد، از طریق لینکی که در اختیار شما قرار می‌گیرد می‌توانید وارد داشبورد مدیریتی MinIO شده و access_key و secret_key را وارد نمایید و از سرویس استفاده کنید.

## Deploy With Manifest

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست MinIO
```
kind: ManagedService
name: test-minio
spec:
  service_name: minio
  version: latest
  parameters:
    - name: minio_access_key
      value: 12charachters
    - name: minio_secret_key
      value: 12charachters
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```


## کار با MC
برای بررسی و استفاده از MinIO خارج از محیط سکوی ابری فندق شما می‌توانید از ابزار [mc](https://docs.min.io/docs/minio-client-complete-guide.html) که یک Client رسمی از MinIO است استفاده کنید.

برای نصب این ابزار به روش‌های زیر می‌توانید عمل کنید:

### Homebrew (macOS)
```
brew install minio/stable/mc
mc --help
```

### Binary Download (GNU/Linux)

|پلتفرم|معماری|لینک|
|---	|---	|---	|
|GNU/Linux|64-bit Intel|https://dl.min.io/client/mc/release/linux-amd64/mc|
||64-bit PPC|https://dl.min.io/client/mc/release/linux-ppc64le/mc|

```
chmod +x mc
./mc --help
```

### Binary Download (Microsoft Windows)

|پلتفرم|معماری|لینک|
|---	|---	|---	|
|Microsoft Windows|64-bit Intel|https://dl.min.io/client/mc/release/windows-amd64/mc.exe|
```
mc.exe --help
```


بعد از اینکه MinIO Client را نصب کردید باید تنظیمات امنیتی آن را تکمیل کنید تا mc بتواند به Object Storage شما متصل شود؛ برای این کار به ترتیب زیر عمل کنید:

```
mc config minio MINIO_SERVICE_DOMAIN
```
در این دستور MINIO_SERVICE_DOMAIN همان دامنه‌ای است که فندق در انتهای ساخت، به سرویس شما تخصیص می‌دهد.

بعد از آنکه این دستور رو اجرا کردید، CLI از شما مقادیر `SECRET_KEY` و `ACCESS_KEY` را درخواست ‌می‌کند که به شکل زیر باید آن‌ها را ارائه دهید:

```
Enter Access Key: MINIO_ACCESS_KEY_FROM_MANIFEST
Enter Secret Key: MINIO_SECRET_KEY_FROM_MANIFEST
```
در انتها زمانی که همه چیز به درستی انجام شود باید پیغام زیر برای شما نمایش داده شود:

```
Added `minio` successfully.
```

حال برای آنکه متوجه شوید mc به درستی کار می‌کند ابتدا وارد داشبورد Minio شوید و از طریق گزینه پایین سمت راست یک Bucket با نام دلخواه ایجاد نمایید.

بعد از آنکه Bucket را ایجاد کردید، داخل CLI دستور زیر را وارد کنید:

```
mc minio ls
```
خروجی این دستور حاوی لیستی از Bucketهای موجود در Object Storage شما خواهد بود.

MinIO Client حاوی دستورات دیگری ‌است که می‌توانید از طریق [مستندات](https://docs.min.io/docs/minio-client-complete-guide.html)، آن را مطالعه نموده و استفاده نمایید.

