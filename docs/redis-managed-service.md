---
layout: fandogh
id: redis-managed-service
title: Redis
sidebar_label: Redis
---
## ![Redis](/img/docs/redis-managed-service.png "Redis")

شاید تا به حال نام پایگاه داده قدرتمند `Redis‍` را شنیده باشید.
طبق توضیحات سایت [Redis.io](https://redis.io) آنطور که بیان شده، `Redis` یک پایگاه داده متن‌باز است که با قابلیت ذخیره داده‌ها به صورت `in-memory‍` باعث بالا رفتن سرعت ذخیره و بازیابی داده‌ها می‌شود.<br>
برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| redis| نامی که برای سرویس مایلید در نظر گرفته شود|
|redis_password| string| None| رمز عبور دیتابیس|
|volume_name| string| None| نام volumeای که به سرویس وصل می شود|
|redis_dashboard_enabled| boolean| False| در صورت نیاز به داشبورد redis مقدار این بخش باید True شود|
|redis_dashboard_username| string| None| نام کاربری داشبورد redis|
|redis_dashboard_password| string| None| گذرواژه داشبورد redis|
|volume_browser_enabled| boolean| false| آیا سرویس مدیریت Dedicated Volume برای این سرویس ساخته شود یا خیر|

> توجه داشته باشید که سرویس ‌`Redis` به صورت پیش فرض داده‌های خود را در `Memory` نگهداری می‌کند و این حالت پایدار نیست، زیرا چنانچه service شما تحت هر شرایطی از بین برود و یا restart شود، داده‌های شما پاک می‌شوند؛ لذا حتما از یک [dedicated volumes](https://docs.fandogh.cloud/docs/dedicated-volume.html)  استفاده نمایید تا backup دیتاهای خود را به صورت مستمر ثبت و حفظ کنید.

> توجه داشته باشید برای استفاده از قابلیت Volume Browser سرویس شما باید به یک Dedicated Volume متصل باشد؛ در غیر این صورت با خطای سرور مواجه خواهید شد.

به عنوان مثال برای دیپلوی کردن یک Redis می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy redis 5.0.3 \
       -c service_name=test-redis \
       -c redis_password=pass123
```
این دستور یک سرویس Redis ایجاد می‌کند که:
* نام سرویس آن test-redis ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-redis و بر روی پورت 6379 می‌توانند به آن متصل شوند) .
* رمز عبور آن pass123 است.

> **هشدار**

برای استفاده از سرویس Redis باید به ۲ نکته زیر توجه داشته باشید:
*  در صورتی که **رمز عبور** یا **redis_password** را وارد نکنید، برای اجرای دستورها دیگر  نیازی به رمز عبور نخواهید داشت ولی با این کار **سرویس را در معرض خطرهای بیرونی زیادی** قرار می‌دهید لذا بهتر است که از رمز عبور معتبری استفاده نمایید.<br>
* برای حفط مسائل امنیتی سرویس Redis به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی ندارید.

## افزودن دامنه دلخواه
اگر قصد داشته باشید دامنه یا دامنه‌های دلخواهتان را به سرویس مدیریت شده مورد نظر متصل نمایید، از طریق این بخش می‌توانید لیست این دامنه‌ها را مشخص کنید.\
برای مثال فرض کنید تمایل دارید سرویس مدیریت شده مورد نظر شما روی  [domain.com](http://domain.com/)  و  [www.domain.com](http://www.domain.com/)  در دسترس باشد:
```
  domains:
     - name: domain.com
     - name: www.domain.com
```
بدین شکل بخش دامنه را به مانیفست سرویس خود اضافه کرده و آن را مستقر نمایید:
```
kind: ManagedService
name: test-redis
spec:
  service_name: redis
  version: 5.0.3
  parameters:
    - name: redis_password
      value: pass123
    - name: volume_name
      value: YOUR_VOLUME_NAME
  domains:
  - name: domain.com
  - name: www.domain.com
  resources:
      memory: 512Mi
```
> توجه داشته باشید، دامنه‌هایی که به سرویس مدیریت شده Redis اضافه می‌شوند، در اصل به داشبورد مدیریتی آن متصل می‌شوند.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Redis بدون داشبورد مدیریتی
```
kind: ManagedService
name: test-redis
spec:
  service_name: redis
  version: 5.0.3
  parameters:
    - name: redis_password
      value: pass123
    - name: volume_name
      value: YOUR_VOLUME_NAME
  resources:
      memory: 512Mi
```
- مانیفست Redis همراه با داشبورد مدیریتی

```
kind: ManagedService
name: test-redis
spec:
  service_name: redis
  version: 5.0.3
  parameters:
    - name: redis_password
      value: pass123
    - name: volume_name
      value: YOUR_VOLUME_NAME
    - name: redis_dashboard_enabled
      value: 'true'
    - name: redis_dashboard_username
      value: _USERNAME_
    - name: redis_dashboard_password
      value: PASSWORD
  resources:
      memory: 512Mi
```
