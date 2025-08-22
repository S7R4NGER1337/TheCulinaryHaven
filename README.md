# The Culinary Haven

## 📌 Overview  
A web application for a restaurant that displays a **menu of dishes** organized by categories.  
The project has two main parts:  
- **User Section** – accessible to all customers.  
- **Admin Section** – a protected area for managing the menu products.  

---

## 👤 User Section  
The main page contains:  
- **Navigation (Navbar):**  
  - The site name/logo on the left.  
  - Navigation links on the right:  
    - `Home` – scrolls to the banner section.  
    - `Menu` – scrolls to the categories and product list.  
    - `About Us` – scrolls to the restaurant information section.  

- **Banner** with a picture of the restaurant with restaurant name, motto and menu button. 

- **Dish Categories** – selecting a category displays the corresponding products.  

- **Products** – each product includes:  
  - image  
  - name  
  - price  
  - description  

- **About Us Section**  
  - Embedded Google Maps location  
  - Text with information about the restaurant  
  - Opening hours  

- **Responsive Design**  
  - Fully optimized for mobile devices.  
  - Layout adapts seamlessly to desktop, tablet, and mobile screens.  

---

## 🔐 Admin Section  
Accessible only with a **valid admin token**.  
If the token is missing or invalid → the user is redirected to the **Admin Login** page.  

### Features:  
- **Product List**  
  - Each product has **Edit** and **Delete** buttons.  
  - **Delete** – removes the product.  
  - **Edit** – redirects to a form where the product information can be updated.  

- **Admin Navigation:**  
  - `Go back to the app` – returns to the user section.  
  - `Create` – opens a form for adding a new product (similar to the Edit form).  

---

## 🚀 Technologies  
- **Frontend:** React
- **Backend:** Node.js + Express  
- **Database:** MongoDB  
- **Authentication:** Token-based (JWT)  
- **UI/UX:** Responsive & Mobile-first Design  

---

## ▶️ Getting Started  

1. Starting the server:  
   ```bash
   cd server
   node server
2. Starting the client
   ```bash
   cd client
   npm start
