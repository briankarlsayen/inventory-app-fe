# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about the recommended Project Setup and IDE Support in the [Vue Docs TypeScript Guide](https://vuejs.org/guide/typescript/overview.html#project-setup).

Dashboard
[x] pie chart - sold items
[x] bar chart - sales per week/month
[x] this month sale data
[x] yesterday sale data
[x] stocks

TODOS
[x] navbar
[x] add table form
[x] add action column on table
---[x] delete dialog
[x] logout confirm dialog
[x] UI cleanup
[ ] api integration
--- [x] login
--- [ ] user details
--- [x] stocks
----- [x] display stocks
----- [x] revise table form submission
----- [x] create stocks
----- [x] update stocks
----- [x] delete stocks
--- [x] stock items
----- [x] display items
----- [x] create items
----- [x] update items
----- [x] delete items
--- [x] orders
----- [x] display orders
----- [x] create orders
----- [x] update orders
----- [x] delete orders
--- [x] products
----- [x] display products
----- [x] create products
----- [x] update products
----- [x] delete products
--- [x] dashboard
[x] update ts interfaces

BUG
[x] login failed when with access, refresh token
[x] deleted selected item on order is lost forever
[x] incorrect order date when i update others
[x] submission of order
[x] negative number values on forms
[x] add loading indicator on accessing dashboard

ENCHANCEMENT
[ ] apply adjustment and discount on order page
[x] apply login by url function
--- url should be encrypted
--- /login?account=sdaopjczpxmcnpzx12143
--- access url > decrypt login account > IF success use login api ELSE redirect to 404 page
