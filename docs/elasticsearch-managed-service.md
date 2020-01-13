---
layout: fandogh
id: elasticsearch-managed-service
title: Elasticsearch
sidebar_label: Elasticsearch 
---


## ![Elasticsearch](/img/docs/elasticsearch-managed-service.png "Elasticsearch")

**Elasticsearch** محبوب‌ترین موتور جست‌و‌جو (Search Engine) در بین کاربران است که بر پایه کتابخانه Lucene و زبان برنامه‌نویسی Java توسعه یافته و از قدرت بالایی برخوردار است. این موتور جست‌و‌جو قابلیت جست‌و‌جو تمام متن را با پشتیبانی از پروتکل HTTP را به صورت توزیع شده در اختیار کاربران قرار می‌دهد.
همچنین بخش‌هایی از این سرویس به صورت متن‌باز تحت لیسانس‌هایی مانند Apache توسعه یافته و بخش‌هایی دیگر تحت عنوان Elastic License توسعه یافته‌اند.<br/>

برای آنکه بتوانید از مزایای Elasticsearch استفاده کنید، باید داده‌ها را به آن بدهید که این کار یا با استفاده از کتابخانه‌های موجود برای زبان‌هایی همچون Java، Python، PHP، Apache Groovy و ...   و یا با استفاده از سرویس‌های واسطی مانند Fluentd یا Bean انجام دهید.<br/>


## مزایای Elasticsearch
سرویس Elasticsearch در میان شرکت‌های بزرگی همچون Github، Udemy، Shopify و ... از محبوبیت‌ بالایی برخوردار است و از دلایل این محبوبیت می‌توان به دو مزیت زیر اشاره کرد:
* **مقیاس‌پذیری**: شما می‌توانید Elasticsearch را بسته به نیاز خود روی لپ‌تاپ شخصی گرفته تا صدها سرور به صورت توزیع شده و به راحتی مستقر کنید.
* **Relevance**: سرویس Elasticsearch این اطمینان را به شما می‌دهد که با سرعت بالا به صورت دقیق به هر داده‌ای که نیاز دارید دسترسی داشته باشید.

حال برای اینکه بتوانید این سرویس محبوب را بر روی فضانام خود دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| elastic-search| نامی که برای سرویس مایلید در نظر گرفته شود|
|min_memory| string| 512 | حداقل رم مصرفی |
|max_memory| string| 1024| حداکثر رم مصرفی |
|elastic_password| string| changeme| رمز عبور سرویس |
|volume_name| string| | نام volumeای که به سرویس وصل می شود |

> توجه داشته باشید که سرویس ‌Elasticsearch برای آنکه بتواند داده‌های خود را ذخیره کند و از سرعت و کارایی مناسبی برخوردار باشد باید حتما به یک [dedicated volumes](https://docs.fandogh.cloud/docs/dedicated-volume.html) متصل شود در غیر این صورت با خطا مواجه شده و سرویس به درستی عمل نمی‌کند.

> حداقل رم قابل سفارش برای سرویس Elasticsearch باید ۲۰۴۸ مگابایت باشد تا سرویس عملکرد ایده‌آلی داشته باشد، در غیر این صورت خطاهای متفاوتی را تجربه خواهید کرد.

برای دیپلوی کردن Elasticsearch می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy elastic-search latest \
       -c service_name=elastic-search \
       -c min_memory=512 \
       -c max_memory=1024 \
       -c elastic_password=changeme \
       -c volume_name=VOLUME_NAME \
       -m 2048
```
این دستور یک سرویس Elasticsearch ایجاد می‌کند که:
* نام آن elastic-search ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام elastic-search و بر روی پورت 9200 می‌توانند به آن متصل شوند) است .
* حداقل رم مصرفی ۵۱۲ مگابایت است.
* حداکثر رم مصرفی ۱۰۲۴ مگابایت است.
* رمز عبور دیتابیس آن changeme است.
* اسم محل ذخیره سازی که به آن متصل است VOLUME_NAME بوده.
* و میزان رم کلی که به سرویس اختصاص یافته است ۲۰۴۸ مگابایت است.

> **هشدار**
برای استفاده از سرویس Elasticsearch باید به نکته زیر توجه داشته باشید:
برای حفط مسائل امنیتی سرویس Elasticsearch به صورت یک [Internal Service](https://docs.fandogh.cloud/docs/services.html#%DB%B2-%D8%B3%D8%B1%D9%88%DB%8C%D8%B3-%D9%87%D8%A7%DB%8C-%D8%AE%D8%A7%D8%B1%D8%AC%DB%8C-%DB%8C%D8%A7-external-service) عمل می‌کند و شما خارج از namespace خود به آن دسترسی نداشته و تنها از طریق داشبورد مدیریتی Kibana می‌توانید به محتوای آن دسترسی داشته باشید و در صورتی که نیاز دارید داده‌ه.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست Elasticsearch بدون داشبورد مدیریتی
```
kind: ManagedService
name: elastic-search
spec:
  service_name: elastic-search
  version: latest
  parameters:
    - name: min_memory
      value: 512
    - name: max_memory
      value: 1024
    - name: elastic_password
      value: changeme
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 2048Mi
```
