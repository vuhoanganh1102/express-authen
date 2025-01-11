# Sử dụng Node.js v18.20.5 làm base image
FROM node:18.20.5-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /usr/src/app

# Sao chép file package.json và package-lock.json (nếu có)
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép toàn bộ mã nguồn vào container
COPY . .

# Expose cổng mà ứng dụng sẽ chạy
# EXPOSE 3005

# Lệnh để chạy ứng dụng
CMD ["npm", "start"]
