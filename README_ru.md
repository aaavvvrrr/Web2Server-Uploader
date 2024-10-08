# Код и readme.md написаны полностью LLM [DeepSeek Coder-V2.5](https://chat.deepseek.com/coder) за 10-15 уточняющих промптов.

# Web2Server Uploader

## Описание

File Uploader — это веб-приложение, которое позволяет пользователям загружать папки с файлами на сервер. Приложение поддерживает загрузку файлов пакетами, ограниченными по количеству (не более 100 файлов) и по размеру (не более 1 ГБ). После загрузки всех файлов пользователь получает сообщение с указанием общего количества скопированных и пропущенных файлов.

## Основные функции

### 1. Загрузка папок с файлами
- Пользователь может выбрать папку с файлами для загрузки. Приложение поддерживает загрузку всех файлов, включая подпапки.

### 2. Ограничение размера пакета
- Файлы загружаются на сервер пакетами, ограниченными по количеству (не более 100 файлов) и по размеру (не более 1 ГБ).

### 3. Проверка существования файлов
- Перед загрузкой файла на сервер проверяется, существует ли файл с таким же именем и размером. Если файл существует и его размер совпадает с размером загружаемого файла, файл пропускается.

### 4. Указание папки назначения
- Пользователь может указать папку на сервере, куда будут скопированы файлы.

### 5. Финальное сообщение
- После загрузки всех файлов пользователь получает сообщение с указанием общего количества скопированных и пропущенных файлов.

## Технологии

### Клиентская часть
- **HTML**: Структура веб-страницы.
- **CSS**: Стилизация веб-страницы.
- **JavaScript**: Логика загрузки файлов и взаимодействие с сервером.

### Серверная часть
- **Python**: Серверная логика, включая обработку запросов и сохранение файлов.
- **http.server**: Простой HTTP-сервер для обработки запросов.

## Установка и запуск

### Клиентская часть
1. Откройте файл `index.html` в браузере.

### Серверная часть
1. Установите Python, если он еще не установлен.
2. Сохраните код сервера в файл `server.py`.
3. Запустите сервер, выполнив команду:
   ```bash
   python server.py
   ```

## Использование

1. Откройте веб-страницу в браузере.
2. Выберите папку с файлами для загрузки.
3. Укажите папку назначения на сервере.
4. Нажмите кнопку "Upload".
5. После загрузки всех файлов вы получите сообщение с указанием общего количества скопированных и пропущенных файлов.

## Лицензия

Этот проект лицензирован под MIT License. 

## Автор

([DeepSeek](https://chat.deepseek.com/coder))

