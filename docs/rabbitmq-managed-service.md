---
layout: fandogh
id: rabbitmq-managed-service
title: RabbitMQ
sidebar_label: RabbitMQ
---

## ![RabbitMQ](/img/docs/rabbitmq-managed-service.png "RabbitMQ")

RabbitMQ یک سرویس متن باز [message-broker](https://en.wikipedia.org/wiki/Message_broker) یا **پیام دهنده** است که معماری Advanced Message Queuing Protocol یا به اختصار (AMQP) را ایجاد کرده‌ است.<br/>
همچنین این سرویس در ادامه با معماری plug-in به نحوی گسترش یافت تا بتواند از پروتکول‌هایی مثل Streaming Text Oriented Messaging Protocol یا به اختصار (STOMP)، MQTT و ... هم پشتیبانی کند.<br/>

برای اینکه بتوانید این سرویس را دیپلوی کنید٬ پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| rabbitmq| نامی که برای سرویس مایلید در نظر گرفته شود|
|rabbitmq_username| string|rabbitmq |نام کاربری|
|rabbitmq_password| string|rabbitmq |گذرواژه|
|dashboard_enabled| boolean|false |آیا rabbitmq در محیط وب در دسترس باشد یا خیر|
|volume_name| string| |نام volumeای که به سرویس وصل می شود|

برای دیپلوی کردن یک RabbitMQ می‌توانیم به این شکل یک سرویس بسازیم:
```
  fandogh managed-service deploy rabbitmq latest \
       -c service_name=test-rabbitmq \
       -c rabbitmq_username=rabbitmq
       -c rabbitmq_password=rabbitmq
      -c dashboard_enabled=true
       -c volume_name=VOLUME_NAME
       -m 512
```
این دستور یک سرویس RabbitMQ ایجاد می‌کند که:
* نام آن test-rabbitmq ( یعنی در شبکه داخلی فضانام شما باقی سرویس‌ها از طریق نام test-rabbitmq و بر روی پورت 5672 می‌توانند به آن متصل شوند)
* میزان رم آن 512 مگابایت.
* نا کاربری و گذرواژه rabbitmq.
* و نام volume که داده‌های RabbitMQ بر روی آن ذخیره می‌شود VOLUME_NAME است.

> توجه داشته باشید در صورتی که از volume استفاده نکرده باشید، تنطیمات و اطلاعات این سرویس در جایی ذخیره نمی‌شود و در نتیجه در صورت restart شدن سرویس، سرویس به تنظیمات اولیه بازمی‌گردد.

## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست FileBrowser با Dashboard
```
kind: ManagedService
name: test-rabbitmq
spec:
  service_name: rabbitmq
  version: latest
  parameters:
    - name: rabbitmq_username
      value: rabbitmq
    - name: rabbitmq_password
      value: rabbitmq
    - name: dashboard_enabled
      value: true  
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

- مانیفست FileBrowser بدون Dashboard
```
kind: ManagedService
name: test-rabbitmq
spec:
  service_name: rabbitmq
  version: latest
  parameters:
    - name: rabbitmq_username
      value: rabbitmq
    - name: rabbitmq_password
      value: rabbitmq
    - name: dashboard_enabled
      value: false  
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```
