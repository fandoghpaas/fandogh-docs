---
layout: fandogh
id: rabbitmq-managed-service
title: RabbitMQ
sidebar_label: RabbitMQ
---

## ![RabbitMQ](/img/docs/rabbitmq-managed-service.png "RabbitMQ")

RabbitMQ یک سرویس متن باز [Message Broker](https://en.wikipedia.org/wiki/Message_broker) یا **پیام دهنده** است که معماری `Advanced Message Queuing Protocol` یا به اختصار `AMQP` را ایجاد کرده‌ است.<br/>
همچنین این سرویس در ادامه با معماری plug-in به نحوی گسترش یافت تا بتواند از پروتکول‌هایی مثل `Streaming Text Oriented Messaging Protocol` یا به اختصار (STOMP)، MQTT و ... هم پشتیبانی کند.<br/>

برای اینکه بتوانید این سرویس را دیپلوی کنید، پارامتر‌های زیر را می‌توانید مشخص کنید:
|کانفیگ|نوع|پیش‌فرض|توضیح|
|---	|---	|---	|---	|
|service_name| string| rabbitmq| نامی که برای سرویس مایلید در نظر گرفته شود|
|rabbitmq_username| string|rabbitmq |نام کاربری|
|rabbitmq_password| string|rabbitmq |گذرواژه|
|dashboard_enabled| boolean|false |آیا rabbitmq در محیط وب در دسترس باشد یا خیر|
|rabbitmq_plugins| string| |لیست پلاگین‌های RabbitMQ |
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

## RabbitMQ Plugins
سرویس RabbitMQ تعدادی پلاگین از پیش تعریف شده در اختیار شما قرار می‌دهد که می‌توانید بسته به نوع نیاز خود آن‌ها را انتخاب و فعال کنید. لیست تمام پلاگین‌هایی که می‌توانید از طریق سرویس مدیریت شده سکوی ابری فندق فعال کنید در جدول زیر آمده است.
|نام پلاگین |نام پلاگین |
|---	|---	|
|rabbitmq_amqp1_0	|rabbitmq_auth_backend_cache	|
|rabbitmq_auth_backend_ldap	|rabbitmq_auth_backend_http	|
|rabbitmq_auth_mechanism_ssl	|rabbitmq_auth_backend_oauth2	|
|rabbitmq_event_exchange	|rabbitmq_consistent_hash_exchange	|
|rabbitmq_federation_management	|rabbitmq_federation	|
|rabbitmq_mqtt	|rabbitmq_jms_topic_exchange	|
|rabbitmq_peer_discovery_common	|rabbitmq_peer_discovery_aws	|
|rabbitmq_peer_discovery_etcd	|rabbitmq_peer_discovery_consul	|
|rabbitmq_prometheus	|rabbitmq_peer_discovery_k8s	|
|rabbitmq_recent_history_exchange	|rabbitmq_random_exchange	|
|rabbitmq_shovel	|rabbitmq_sharding	|
|rabbitmq_stomp	|rabbitmq_shovel_management	|
|rabbitmq_tracing	|rabbitmq_top	|
|rabbitmq_web_mqtt	|rabbitmq_trust_store	|
|rabbitmq_web_stomp	|rabbitmq_web_mqtt_examples	|
|rabbitmq_web_stomp_examples	|	|

برای آنکه بتوانید از طریق `fandogh-cli` پلاگین‌ها را فعال کنید، می‌توانید در هنگام deploy به روش زیر عمل کن:
```
  fandogh managed-service deploy rabbitmq latest \
       -c service_name=test-rabbitmq \
       -c rabbitmq_username=rabbitmq
       -c rabbitmq_password=rabbitmq
      -c dashboard_enabled=true
      -c rabbitmq_plugins="rabbitmq_trust_store rabbitmq_web_mqtt_examples rabbitmq_shovel"
       -c volume_name=VOLUME_NAME
       -m 512
```

>به نحوه تعریف پلاگین‌ها دقت کنید. در صورتی که از fandogh-cli استفاده می‌کنید باید نام پلاگین ها را با فاصله از هم و در بین double quotation یا " " قرار دهید تا تمام لیست دریافت شود.


## Deploy With Manifest
  

شما همچنین می توانید برای اجرای راحت تر سرویس های مدیریت شده از [مانیفست](https://docs.fandogh.cloud/docs/service-manifest.html) همانند مثال زیر استفاده کنید.

- مانیفست RabbitMQ با Dashboard
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

- مانیفست RabbitMQ با Dashboard و پلاگین
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
    - name: rabbitmq_plugins
      value: "rabbitmq_trust_store rabbitmq_web_mqtt_examples rabbitmq_shovel"
    - name: volume_name
      value: VOLUME_NAME
  resources:
      memory: 512Mi
```

- مانیفست RabbitMQ بدون Dashboard
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
