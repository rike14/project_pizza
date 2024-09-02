# [Sujeito Pizza](https://projectpizzaweb-rike14s-projects.vercel.app/)  - 🚧 Currently in construction, please wait...
<a id="readme-top"></a>

<br />
<div align="center">

  ![image](/mobile/assets/logo.png)

  <p align="center">
    An incredible project to create orders with backend using NodeJS, frontend web using NextJs and mobile using React Native! Every project with typing Typescript
    <br />
  </p>
</div>


## 📃 About The Project

- SignIn/Signout (web/mobile);
- Create and Delete Users/Categories/Products (web);
- Open orders (mobile);
- Edit/Delete items list from order before finish (mobile);
- Finish order (web).

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💎 Built With

 [![Postgres][Postgres]][Postgres-url]
 [![Prisma][Prisma]][Prisma-url]
 [![Node][Node]][Node-url] 
 [![Express][Express]][Express-url] 

 [![Typescript][Typescript]][Typescript-url]
 [![React][React]][React-url]
 [![ReactNative][ReactNative]][ReactNative-url]
 [![NextJS][NextJS]][NextJS-url]
 [![Sass][Sass]][Sass-url]

 [![Yarn][Yarn]][Yarn-url]
 [![Expo][Expo]][Expo-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⏱️ Getting Started

This is an example of how you can run your project locally.

To get a local copy up and running follow these simple example steps.

## 🛠️ Prerequisites

* Postgres <br>
    [Download Postgres](https://www.postgresql.org/download/)

    [Documentation Postgres](https://www.postgresql.org/docs/)

        
    Open Pgadmin (or whatever do you prefer) and create a database with the name of your choice, in the image below I created a database with the name "pizzaria", then you create a ".env" file like ".env.example".
  

    ![.env](/public/images/database.png)

* Prisma <br>
    I use postgres, see the documentation if do you prefer another database connection

    [Documentation Prisma Databases](https://www.prisma.io/docs/orm/overview/databases)
   
<br>

* Node <br>
    [Documentation to install Node](https://nodejs.org/en)


* npm
  ```sh
  npm install npm@latest -g
  ```
  after if you want use yarn:
  ```sh
  npm install --global yarn
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🪄 Installation

1. Clone the repo
   ```sh
   git clone git@github.com:rike14/project_pizza.git
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## ⚙️ Backend

2. Run backend
   
   ```sh
   ## At the root of the project
    cd backend/
   ```

    ```sh
    prisma db pull
    ```

  * npm
    ```sh
    npm install 
    ```

  * run
     ```sh
    npm run dev
     ```

    *Or with yarn*

  * yarn
     ```sh
    yarn
     ```

  * run
     ```sh
    yarn dev
     ```
  
  <br>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🌐 Web

3. Run web
   
   *Do you need create a ".env" file like ".env.example" like image below.*

   ![env.example](/public/images/env-example-web.png)

    ```sh
    ## At the root of the project
    cd web/
    ```

   * npm
   *use -f because some packages are in beta*
   ```sh
   npm install -f 
   ```
   
    *Or with yarn*

   * yarn
   ```sh
   yarn
   ```

  * NextJS
      ```sh
      npm run dev

      # or with yarn

      yarn dev

       # in the terminal see running on the url http://localhost:3000/
      ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 📱 Mobile (Android/IOS)

* Expo <br>
    [Documentation to install Expo and run project](https://docs.expo.dev/)

* Android <br>
    [Documentation to install Android Studio Emulator](https://developer.android.com/)

* IOS <br>
    [Documentation to run with Expo](https://docs.expo.dev/workflow/ios-simulator/)
    

1. Run mobile

    *Do you need create a ".env" file like ".env.example" like image below.*

   ![env.example](/public/images/env-example-mobile.png)


    ```sh
    ## At the root of the project
    cd mobile/
    ```

   * npm
   *use -f because some packages are in beta*
   ```sh
   npm install -f 
   ```
   
    *Or with yarn*

   * yarn
   ```sh
   yarn
   ```

  * React Native
    
    [Documentation with commands Expo](https://docs.expo.dev/more/expo-cli/)

    ```sh
    ## this project I use Expo, if do you prefer Metro you can see documentation
    npx expo start
    ```

* Android: 
    * Press "a" to open the emulator (remember to install and create the emulator via Android Studio).
    * Press "r" to reload the emulator.
  
* IOS: 
    * Press "i" to open the emulator (remember to install Xcode to create emulator).
    * Press "r" to reload the emulator.


<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 🚀 Project (WEB)

- [x] SignIn:
  
  ![SignIn](/public/images/signin.png)

- [x] Signup:
  
  ![Signup](/public/images/signup.png)

- [x] Loading:
  
  <div>

    ![Loading](/public/gifs/loading.gif)
    
  </div>

- [x] Orders page:
  
  ![Orders](/public/images/orders.png)

- [x] Users list page:
  
  ![UserList](/public/images/users.png)

- [x] Create user page:
  
  ![CreateUser](/public/images/createuser.png)

- [x] Categories list page:
  
  ![CategoriesList](/public/images/categories.png)

- [x] Create category page:
  
  ![CreateCategory](/public/images/createcategory.png)

- [x] Products list page:
  
  ![ProductsList](/public/images/products.png)

- [x] Create product page:
  
  ![CreateProduct](/public/images/createproduct.png)

- [x] Open order:
  
  <div>

    ![OpenOrder](/public/gifs/open-order.gif)
    
  </div>


  - [x] Finish order:
  
  <div>

    ![FinishOrder](/public/gifs/finish-order.gif)
    
  </div>



<hr>

## 📱 Project (MOBILE)

- [x] App:
  
  <div>

    ![App](/public/gifs/app.gif)
    
  </div>

## 🧑🏼‍💻 Author

 <img style="border-radius: 50%;" src="https://media-exp1.licdn.com/dms/image/C4E03AQHEAO7lZFv_DQ/profile-displayphoto-shrink_100_100/0/1628044108879?e=2147483647&v=beta&t=THXLaSYL1EF43H1OCCCJVn2m-Cz2HY535lqkyam17B8" width="100px;" alt=""/>
 <br />
 <sub><b>Henrique M. Kronhardt</b></sub></a>
 <br />

[![Linkedin Badge](https://img.shields.io/badge/-Henrique_Kronhardt-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/henriquekronhardt/)](https://www.linkedin.com/in/henriquekronhardt/)

---

Made with ❤️ by Henrique M. Kronhardt 👋🏽 [Get in touch!](https://www.linkedin.com/in/henriquekronhardt/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
[Node]: https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white
[Node-url]: https://nodejs.org
[Prisma]: https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Express]: https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB
[Express-url]: https://expressjs.com/
[React]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[ReactNative]: https://img.shields.io/badge/react_native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[ReactNative-url]: https://reactnative.dev/
[Typescript]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Sass]: https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white
[Sass-url]: https://sass-lang.com/
[NextJS]: https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white
[NextJS-url]: https://nextjs.org/
[Postgres]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[Postgres-url]: https://www.postgresql.org/
[Yarn]: https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white
[Yarn-url]: https://classic.yarnpkg.com/
[Expo]: https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=#D04A37
[Expo-url]: https://expo.dev/
