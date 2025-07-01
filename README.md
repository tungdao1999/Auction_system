### `I. Các bước cần làm:`
1. Tạo database trống, import file dairy.sql
2. Điền thông số cấu hình trong file .env: 
    DB_NAME(tên database)
    DB_HOST(địa chỉ của database server)
    DB_PORT(port của database)
    DB_PASS(có thể để trống nếu không tạo mật khẩu cho database)
    JWT_SECRET(token jwt). Có thể thay đổi thông số JWT_EXPIRATION
3. Chạy câu lệnh: npm i cài thư viện
4. Chạy dự án ở môi trường development: yarn dev
5. Chạy scaffold lấy dữ liệu từ database

** Test project với postman
Chạy các api A và B(bên dưới)
1. Tạo tài khoản đăng nhập
2. Đăng nhập, lấy token trả về và gởi token mỗi khi request thông tin lên server.


&nbsp;

 ### `II.Các endpoint (apis) sử dụng:`
 ```
 http://localhost:3000 là link mặc định, có thể thay đổi port trong file .env

A. Tạo tài khoản buyer:
POST: http://localhost:3000/api/auth/registerBuyer
body truyền lên object:
Ví dụ: 
{
    "email": "testBuyer@gmail.com",
    "phone": "13456789",
    "password": "123456",
    "firstName": "test",
    "lastName": "Buyer"
}

B. Login tài khoản buyer:
POST: http://localhost:3000/api/auth/loginBuyer
body truyền lên object:
trong đó identifier có thể là email hoặc sđt
Ví dụ: 
{
    "identifier" : "testBuyer@gmail.com",
    "password": "123456"
}

A. Tạo tài khoản seller:
POST: http://localhost:3000/api/auth/registerSeller
body truyền lên object:
Ví dụ: 
{
    "email": "testSeller@gmail.com",
    "phone": "0123456789",
    "password": "123456",
    "firstName": "test",
    "lastName": "Seller"
}

B. Login tài khoản buyer:
POST: http://localhost:3000/api/auth/loginSeller
body truyền lên object:
trong đó identifier có thể là email hoặc sđt
Ví dụ: 
{
    "identifier" : "0123456789",
    "password": "123456"
}

