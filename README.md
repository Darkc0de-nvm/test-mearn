# 🧪 Тестове завдання — MERN Stack (Jobify)

#### 🛠 Technical Stack

[![Node Version](https://img.shields.io/badge/node-v24.13.1-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![NPM Version](https://img.shields.io/badge/npm-11.8.0-CB3837?style=for-the-badge&logo=npm&logoColor=white)](https://www.npmjs.com/)

---

## 🔴 Priority 1 — Must fix before submission

### 1. Fix the test user ID inconsistency — create a shared constant

Винесено ID тестового користувача у константи для кращої підтримки коду:

```diff
// Jobify/middleware/authMiddleware.js

- const testUser = userId === `69d903ac75901acfac4bdaff`;
+ import { TEST_USER_ID } from "../utils/constants.js";
+ const testUser = userId === TEST_USER_ID;
```

```diff
// Jobify/utils/constants.js

+ export const TEST_USER_ID = "69d903ac75901acfac4bdaff";
```

---

### 2. Fix Error.jsx broken image import

Додано додаткову ілюстрацію для помилок, що не є 404, та перероблено логіку для обробки як винятків маршрутизатора, так і ручної навігації:

```diff
// Jobify/client/src/pages/Error.jsx

  import { Link, useRouteError } from "react-router-dom";
  import Wrapper from "../assets/wrappers/ErrorPage";
  import img from "../assets/images/not-found.svg";
+ import errorImg from "../assets/images/something-went-wrong.svg";

  const Error = () => {
    const error = useRouteError();
-   if (error.status === 404) {
+   if (!error || error.status === 404) {
      return (
        <Wrapper>
          <div>
            <img src={img} alt="not found" />
            <h3>Сторінку не знайдено</h3>
            ...
          </div>
        </Wrapper>
      );
    }
    return (
      <Wrapper>
+       <img src={errorImg} alt="something went wrong" />
+       <h3>Щось пішло не так</h3>
+       <p>Сталася непередбачувана помилка. Спробуйте пізніше або поверніться на головну.</p>
        <Link to="/">На головну</Link>
      </Wrapper>
    );
  };
```

---

### 3. Add a catch-all route for 404 page

Додано маршрут із використанням символу підстановки **`path: "*"`**, щоб явно виявляти та перенаправляти недійсні шляхи:

```diff
// Jobify/client/src/App.jsx

      {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [ ... ]
      },
+     {
+       path: "*",
+       element: <Error />,
+     },
    ],
  },
]);
```

---

### 4. Rename `jobStatus` to `status` in the Job model to match spec

До:

![До](https://github.com/user-attachments/assets/3235e5e6-00bd-4cdf-a5b0-07941801eeb5)

Після:

![Після 1](https://github.com/user-attachments/assets/e5b0fea2-c6ea-4e0a-a911-7b1b46a5f8cd)
![Після 2](https://github.com/user-attachments/assets/214038f2-1d8e-4e96-9fbc-c33d690ee1f3)

---

## 🟡 Priority 2 — Should fix

### 1. Remove duplicate CSS file

Дубльовані css файли в проєкті відсутні, адже ми їх видалили протягом курсу, а всі інші використовуються.

---

### 2. Fix `mockData.json` invalid enum values

Виправлено в Priority 1, пункт 4.

---

### 3. Clarify token delivery: pick either cookie or localStorage, not both

Обрано **localStorage + Authorization header** як єдиний механізм зберігання та передачі JWT:

- токен повертається в тілі відповіді (`response.data.token`)
- зберігається в `localStorage`
- додається до кожного запиту через axios request interceptor (`Bearer <token>`)
- при отриманні 401 — автоматично видаляється і користувач перенаправляється на `/login`

---

### 4. Combine Register and Login into a single page with toggle (per spec)

Реєстрація і логін об'єднані в один компонент `Register.jsx`, який визначає режим за `pathname` — `/register` показує повну форму реєстрації, `/login` — форму входу. Жодного перемикача в UI немає.

```diff
// Jobify/client/src/pages/Register.jsx

- const Register = () => {
-   const [isMember, setIsMember] = useState(false);
-   return (
-     <Wrapper>
-       <Form method="post" className="form">
-         <Logo />
-         <h4>{isMember ? 'Login' : 'Register'}</h4>
-         {!isMember && ( ... )}
-         <FormRow type="email" name="email" labelText="email" />
-         <FormRow type="password" name="password" labelText="password" />
-         <SubmitBtn formBtn />
-         <p>
-           {isMember ? 'Немає акаунта?' : 'Вже є акаунт?'}
-           <button type="button" onClick={() => setIsMember(!isMember)} className="member-btn">
-             {isMember ? 'Зареєструватися' : 'Увійти'}
-           </button>
-         </p>
-       </Form>
-     </Wrapper>
-   );
- };

+ const Register = () => {
+   const { pathname } = useLocation();
+   const isLogin = pathname === "/login";
+
+   return (
+     <Wrapper>
+       <Form method="post" className="form">
+         <Logo />
+         <h4>{isLogin ? "Вхід" : "Реєстрація"}</h4>
+         <input type="hidden" name="isRegister" value={String(!isLogin)} />
+         {!isLogin && (
+           <>
+             <FormRow type="text" name="name" labelText="Ім'я" placeholder="Andriy" />
+             <FormRow type="text" name="lastName" labelText="Прізвище" placeholder="Kovalenko" />
+             <FormRow type="text" name="location" labelText="Місто" placeholder="Kyiv" />
+           </>
+         )}
+         <FormRow type="email" name="email" labelText="Email" placeholder="autolover@example.com" />
+         <FormRow type="password" name="password" labelText="Пароль" placeholder="Мінімум 8 символів" />
+         <SubmitBtn formBtn />
+         {isLogin && (
+           <button type="button" className="btn btn-block" onClick={loginDemoUser}>
+             <FaUser /> Увійти як гість
+           </button>
+         )}
+         <p>
+           {isLogin ? "Немає акаунта?" : "Вже є акаунт?"}
+           <Link to={isLogin ? "/register" : "/login"} className="member-btn">
+             {isLogin ? "Зареєструватися" : "Увійти"}
+           </Link>
+         </p>
+       </Form>
+     </Wrapper>
+   );
+ };
```

```diff
// Jobify/client/src/App.jsx

  {
    path: "register",
    element: <Register />,
-   action: registerAction(queryClient),
+   action: authAction(queryClient),
  },
  {
    path: "login",
-   element: <Login />,
-   action: loginAction(queryClient),
+   element: <Register />,
+   action: authAction(queryClient),
  },
```

```diff
- client/src/pages/Login.jsx
- [index.js] export { default as Login } from "./Login";
```

---

### 5. Move `concurrently` and `nodemon` to devDependencies

```diff
// Jobify/package.json

  "dependencies": {
-   "concurrently": "^8.0.1",
-   "nodemon": "^2.0.22",
    "express": "^4.18.2",
    ...
  },
+ "devDependencies": {
+   "concurrently": "^8.0.1",
+   "nodemon": "^2.0.22"
+ }
```

---

## 🟢 Priority 3 — Nice to have

### 1. Remove unused dependencies (`cloudinary`, `multer`, `datauri`) if not using avatar upload

Я використовую зображення, тому видаляти не буду.

---

### 2. Centralize demo user configuration

```diff
// Jobify/utils/constants.js

+ export const DEMO_USER = {
+   email: "test@test.com",
+   password: "secret123",
+ };
```

```diff
// Jobify/client/src/pages/Register.jsx

+ import { DEMO_USER } from "../../../utils/constants";

  const loginDemoUser = async () => {
    try {
-     await customFetch.post("/auth/login", { email: "test@test.com", password: "secret123" });
+     const response = await customFetch.post("/auth/login", DEMO_USER);
+     const { token, user } = response.data;
+     localStorage.setItem("token", token);
+     localStorage.setItem("user", JSON.stringify(user));
+     queryClient.invalidateQueries();
      toast.success("Ласкаво просимо, Гість!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };
```

---

### 4. Change port to 5000 to match spec (or document why 5100)

- **PORT**: `5100` — обрано замість стандартного `5000` для гарантованої роботи на **macOS**, де порт 5000 часто зарезервований службою AirPlay.

---

## 🔧 Рефакторинг та технічні виправлення

### JWT та Аутентифікація

Змінено спосіб передачі JWT з cookie на JSON response для кращої сумісності з frontend:

```diff
// controllers/authController.js

export const register = async (req, res) => {
  const user = await User.create(req.body);
+ const token = createJWT({ userId: user._id, role: user.role });

  res
    .status(StatusCodes.CREATED)
-   .json({ msg: `Користувач ${user.name} успішно зареєстрований` });
+   .json({
+     msg: `Користувач ${user.name} успішно зареєстрований`,
+     token,
+     user: {
+       name: user.name,
+       email: user.email,
+       lastName: user.lastName,
+       location: user.location,
+       role: user.role
+     }
+   });
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  const isValidUser = user && (await comparePasswords(req.body.password, user.password));
  if (!isValidUser) throw new UnauthenticatedError(`Невірний email або пароль`);
  const token = createJWT({ userId: user._id, role: user.role });

- const oneDay = 24 * 60 * 60 * 1000;
- res.cookie(`token`, token, {
-   httpOnly: true,
-   expires: new Date(Date.now() + oneDay),
-   secure: process.env.NODE_ENV === "production",
- });
  res
    .status(StatusCodes.OK)
-   .json({ msg: `Користувач ${user.name} успішно увійшов` });
+   .json({
+     msg: `Користувач ${user.name} успішно увійшов`,
+     token,
+     user: {
+       name: user.name,
+       email: user.email,
+       lastName: user.lastName,
+       location: user.location,
+       role: user.role
+     }
+   });
};

export const logout = (req, res) => {
- res.cookie(`token`, `logout`, {
-   httpOnly: true,
-   expires: new Date(Date.now()),
- });
  res.status(StatusCodes.OK).json({ msg: `Користувач успішно вийшов` });
};
```

---

### Зміна методу logout

Змінено GET на POST для кращої відповідності REST принципам:

```diff
// routes/authRouter.js

- router.get("/logout", logout);
+ router.post("/logout", logout);
```

---

### Оновлення моделі користувача

Додано timestamps, встановлено email як унікальний/обов'язковий, видалено hardcoded defaults:

```diff
// models/UserModel.js

const UserSchema = new mongoose.Schema({
- name: String,
+ name: {
+   type: String,
+   required: [true, 'Ім\'я є обов\'язковим']
+ },
- email: String,
+ email: {
+   type: String,
+   required: [true, 'Email є обов\'язковим'],
+   unique: true
+ },
- password: String,
+ password: {
+   type: String,
+   required: [true, 'Пароль є обов\'язковим']
+ },
  lastName: {
    type: String,
-   default: `lastName`,
+   default: '',
  },
  location: {
    type: String,
-   default: `florida`,
+   default: '',
  },
  role: {
    type: String,
    enum: [`user`, `admin`],
    default: `user`,
  },
  avatar: String,
  avatarPublicId: String,
- });
+ }, { timestamps: true });
```

---

### Виправлення memory leak в DashboardLayout

Interceptor винесено за межі компонента щоб уникнути його повторної реєстрації при кожному ре-рендері:

```diff
// client/src/pages/DashboardLayout.jsx


- customFetch.interceptors.response.use(
-   (response) => {
-     return response;
-   },
-   (error) => {
-     if (error?.response?.status === 401) {
-       setIsAuthError(true);
-     }
-     return Promise.reject(error);
-   },
- );

- useEffect(() => {
-   if (!isAuthError) return;
-   logoutUser();
- }, [isAuthError]);

+ // Винесено за межі компонента — реєструється один раз
+ useEffect(() => {
+   const handleAuthError = () => {
+     logoutUser();
+   };
+
+   const interceptor = customFetch.interceptors.response.use(
+     (response) => response,
+     (error) => {
+       if (error?.response?.status === 401) {
+         window.dispatchEvent(new Event("auth-error"));
+       }
+       return Promise.reject(error);
+     }
+   );
+
+   window.addEventListener("auth-error", handleAuthError);
+
+   return () => {
+     window.removeEventListener("auth-error", handleAuthError);
+     customFetch.interceptors.response.eject(interceptor);
+   };
+ }, []);
```

---

### Виправлення порядку middleware та мертвого коду в server.js

```diff
// server.js

  app.use("/api/v1/jobs", authenticateUser, jobRouter);
  app.use("/api/v1/users", authenticateUser, userRouter);
  app.use("/api/v1/auth", authRouter);

+ app.use(errorHandlerMiddleware);

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html"));
  });

- app.use("*", (req, res) => {
-   res.status(404).json({ msg: "Сторінка не знайдена" });
- });

- app.use(errorHandlerMiddleware);
```

---

### Налаштування CORS

```diff
// server.js

+ app.use(cors({
+   origin: process.env.NODE_ENV === 'production'
+     ? ['https://your-production-domain.com']
+     : ['http://localhost:5173', 'http://localhost:3000'],
+   credentials: true
+ }));
```

---

### Refactor customFetch.js

Додано axios interceptors для автоматичного додавання JWT та обробки 401:

```diff
// client/src/utils/customFetch.js

import axios from "axios";

const customFetch = axios.create({
  baseURL: "/api/v1",
});

+ customFetch.interceptors.request.use(
+   (config) => {
+     const token = localStorage.getItem('token');
+     if (token) {
+       config.headers.Authorization = `Bearer ${token}`;
+     }
+     return config;
+   },
+   (error) => Promise.reject(error)
+ );
+
+ customFetch.interceptors.response.use(
+   (response) => response,
+   (error) => {
+     if (error.response?.status === 401) {
+       localStorage.removeItem('token');
+       localStorage.removeItem('user');
+       window.location.href = '/login';
+     }
+     return Promise.reject(error);
+   }
+ );

export default customFetch;
```

---

### Оновлення action реєстрації/логіну

Endpoint визначається за прихованим полем `isRegister`, токен зберігається в localStorage:

```diff
// client/src/pages/Register.jsx

- export const action = (queryClient) => async ({ request }) => {
-   const formData = await request.formData();
-   const data = Object.fromEntries(formData);
-   const isLogin = !data.name;
-   const endpoint = isLogin ? "/auth/login" : "/auth/register";
-   try {
-     await customFetch.post(endpoint, data);
-     queryClient.invalidateQueries();
-     toast.success(isLogin ? "Логін успішний!" : "Реєстрація успішна!");
-     return redirect(isLogin ? "/dashboard" : "/login");
-   } catch (error) {
-     toast.error(error?.response?.data?.msg);
-     return error;
-   }
- };

+ export const action = (queryClient) => async ({ request }) => {
+   const formData = await request.formData();
+   const data = Object.fromEntries(formData);
+   const isLogin = data.isRegister !== "true";
+   const endpoint = isLogin ? "/auth/login" : "/auth/register";
+   delete data.isRegister;
+   try {
+     const response = await customFetch.post(endpoint, data);
+     const { token, user } = response.data;
+     localStorage.setItem('token', token);
+     localStorage.setItem('user', JSON.stringify(user));
+     queryClient.invalidateQueries();
+     toast.success(isLogin ? "Логін успішний!" : "Реєстрація успішна!");
+     return redirect("/dashboard");
+   } catch (error) {
+     toast.error(error?.response?.data?.msg);
+     return error;
+   }
+ };
```

---

### Виправлення авторизації для вакансій

Додано перевірку власника вакансії:

```diff
// controllers/jobController.js

export const getJobById = async (req, res) => {
  const job = await Job.findById(req.params.id);
+
+ if (!job) {
+   return res.status(StatusCodes.NOT_FOUND).json({ msg: "Вакансію не знайдено" });
+ }
+
+ if (req.user.userId !== job.createdBy.toString()) {
+   return res.status(StatusCodes.FORBIDDEN).json({ msg: "Доступ заборонено" });
+ }
+
  res.status(StatusCodes.OK).json({ job });
};
```

---

### Оновлення типів вакансій

Замінено internship на remote:

```diff
// utils/constants.js

export const JOB_TYPE = {
  FULL_TIME: "full-time",
  PART_TIME: "part-time",
- INTERNSHIP: "internship",
+ REMOTE: "remote",
};
```

---

### Видалення console.log та заміна != на !==

Видалено всі console.log () (окрім ) та замінено != на !== у всьому проєкті для кращої якості коду.

---

### Виправлення формату помилок валідації

Приведено формат відповідей у відповідність до ТЗ: помилки тепер повертаються як рядок, а не масив. Це виправляє некоректне відображення сповіщень (toast) на фронтенді.
Diff

```diff
// Jobify/middleware/validationMiddleware.js

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((err) => err.msg);
+       const firstMessage = errorMessages[0];

-       if (errorMessages[0].startsWith("Вакансія")) {
-         throw new NotFoundError(errorMessages);
-       }
+       if (firstMessage.startsWith("Вакансія")) {
+         throw new NotFoundError(firstMessage);
+       }

-       if (errorMessages[0].startsWith("Ви не маєте прав")) {
+       if (firstMessage.startsWith("Ви не маєте прав")) {
          throw new UnauthorizedError(
            "Ви не маєте прав для доступу до цієї вакансії",
          );
        }

-       throw new BadRequestError(errorMessages);
+       // З'єднуємо всі повідомлення в один рядок, як вимагає ТЗ
+       throw new BadRequestError(errorMessages.join(', '));
      }
      next();
    },
  ];
};
```

---

## 🚀 Інсталяція

### Вимоги

- **Node.js**: v24.13.1 або новіша
- **npm**: v11.8.0 або новіша

### Кроки для налаштування проєкту

1. **Клонуйте репозиторій**

   ```bash
   git clone <repository-url>
   cd Jobify
   ```

2. **Встановіть залежності**

   ```bash
   npm run setup-project
   ```

3. **Налаштуйте змінні середовища**

   Створіть файл `.env` на основі `.env.example`:

   ```bash
   cp .env.example .env
   ```

   Відредагуйте `.env` файл з вашими налаштуваннями:

   ```env
   # MongoDB
   MONGO_URI=mongodb://localhost:27017/jobify

   # JWT
   JWT_SECRET=your-super-secret-jwt-key-here
   JWT_EXPIRES_IN=1d

   # Cloudinary
   CLOUD_NAME=your-cloudinary-cloud-name
   CLOUD_API_KEY=your-cloudinary-api-key
   CLOUD_API_SECRET=your-cloudinary-api-secret

   # Server
   PORT=5100
   NODE_ENV=development
   ```

4. **Запустіть проєкт**

Запустити у вигляді development:

```bash
npm run dev
```

Проєкт буде доступний за адресою `http://localhost:5173`

Запустити у вигляді production:

```bash
node server
```

## Проєкт буде доступний за адресою `http://localhost:5100`
