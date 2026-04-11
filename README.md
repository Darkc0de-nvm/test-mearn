# Тестове завдання по MEARN
## Priority 1 (Must fix before submission)
1. Fix the test user ID inconsistency — create a shared constant
---
Винесено ID тестового користувача у константи для кращої підтримки коду:

```diff
// Jobify/middleware/authMiddleware.js

- const testUser = userId === `69d903ac75901acfac4bdaff`;
+ import { TEST_USER_ID } from "../utils/constants.js";
+ const testUser = userId === TEST_USER_ID;
```

```diff
// Jobify/utils/constants.js:
+ export const TEST_USER_ID = "69d903ac75901acfac4bdaff";
```
2. Fix Error.jsx broken image import
---
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
3. Add a catch-all route for 404 page
---
Додано маршрут із використанням символу підстановки **path: "*"**, щоб явно виявляти та перенаправляти недійсні шляхи:
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
4. Rename jobStatus to status in the Job model to match spec (or document the deviation)
---
До:


<img width="754" height="963" alt="зображення" src="https://github.com/user-attachments/assets/3235e5e6-00bd-4cdf-a5b0-07941801eeb5" />


Після:

<img width="727" height="967" alt="зображення" src="https://github.com/user-attachments/assets/e5b0fea2-c6ea-4e0a-a911-7b1b46a5f8cd" />
<img width="770" height="723" alt="зображення" src="https://github.com/user-attachments/assets/214038f2-1d8e-4e96-9fbc-c33d690ee1f3" />


## Priority 2 (Should fix)


1. Remove duplicate CSS file

---


Дубльовані css файли в проєкті відсутні, адже ми їх видалили протягом курсу, а всі інші використовуються.


2. Fix mockData.json invalid enum values


---

Виправлено в Priority 1 пункт 4.

---
3. Clarify token delivery: pick either cookie or localStorage, not both


---

Під час фінального етапу курсу було ми використали HTTP-Only Cookies як єдиний механізм зберігання та передачі JWT, що забезпечило захист від XSS-атак, посилило безпеку через атрибути secure та sameSite і дозволило повністю відмовитися від менш безпечного LocalStorage.

---
4. Combine Register and Login into a single page with toggle (per spec)

---
```diff
// Jobify/client/pages/Register.jsx
- const Register = () => {
-   return (
-     <Wrapper>
-       <Form method="post" className="form">
-         <Logo />
-         <h4>Register</h4>
-         <FormRow type="text" name="name" labelText="name" />
-         <FormRow type="text" name="lastName" labelText="lastname" />
-         <FormRow type="text" name="location" labelText="location" />
-         <FormRow type="email" name="email" labelText="email" />
-         <FormRow type="password" name="password" labelText="password" />
-         <SubmitBtn formBtn />
-         <p>
-           Вже є акаунт?
-           <Link to="/login" className="member-btn">Увійти</Link>
-         </p>
-       </Form>
-     </Wrapper>
-   );
- };

+ const Register = () => {
+   const [isMember, setIsMember] = useState(false);
+
+   return (
+     <Wrapper>
+       <Form method="post" className="form">
+         <Logo />
+         <h4>{isMember ? 'Login' : 'Register'}</h4>
+         {!isMember && (
+           <>
+             <FormRow type="text" name="name" labelText="name" />
+             <FormRow type="text" name="lastName" labelText="lastname" />
+             <FormRow type="text" name="location" labelText="location" />
+           </>
+         )}
+         <FormRow type="email" name="email" labelText="email" />
+         <FormRow type="password" name="password" labelText="password" />
+         <SubmitBtn formBtn />
+         <p>
+           {isMember ? 'Немає акаунта?' : 'Вже є акаунт?'}
+           <button type="button" onClick={() => setIsMember(!isMember)} className="member-btn">
+             {isMember ? 'Зареєструватися' : 'Увійти'}
+           </button>
+         </p>
+       </Form>
+     </Wrapper>
+   );
+ };
```

```diff
// Jobify/client/App.jsx
- import {...login...} from "./pages";
- {
-   path: "register",
-   element: <Register />,
-   action: registerAction,
- },
- {
-   path: "login",
-   element: <Login />,
-   action: loginAction(queryClient),
- },
+ {
+   path: "register",
+   element: <Register />,
+   action: authAction(queryClient),
+ },
+ {
+   path: "login",
+   element: <Register />,
+   action: authAction(queryClient),
+ },
```
```diff
- client/src/pages/Login.jsx
- [index.js] export { default as Login } from "./Login";
```
