

# 1. Запуск проекта

Проект состоит из двух независимых частей — backend и frontend.  
Каждая запускается отдельно в своём терминале.

---

# 2.1. Запуск BACKEND

Перейдите в папку backend:

```bash
cd backend
```
```bash
pip install -r requirements.txt
```
```bash
python manage.py makemigrations
```
```bash
python manage.py migrate
```
```bash
python manage.py runserver
```
# 2.2. Запуск FRONTEND

Откройте новый терминал и перейдите в frontend:

```bash
cd frontend
```
```bash
npm install
```
```bash
npm start
```

---

# 3. API Endpoints


POST  `/api/auth/register/` - Создание нового пользователя   

POST   `/api/token/`         - Получение access/refresh токенов 

POST   `/api/token/refresh/` - Обновление access токена         


GET      `/api/posts/`      - Получить список всех постов                             

POST     `/api/posts/`      - Создать новый пост (только авторизованный пользователь) 

GET      `/api/posts/{id}/` - Просмотреть пост                                        

PUT      `/api/posts/{id}/` - Обновить **свой** пост                                  

DELETE   `/api/posts/{id}/` - Удалить **свой** пост                                   

GET      `/api/posts/my/`   - Просмотр только своих постов                            

