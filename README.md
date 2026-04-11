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


