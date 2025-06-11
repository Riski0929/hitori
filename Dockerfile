FROM node:lts-buster

# Install dependencies
RUN apt-get update && \
  apt-get install -y \
  ffmpeg \
  imagemagick \
  webp && \
  apt-get upgrade -y && \
  rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy files and install Node packages
COPY package.json .

RUN npm install

COPY . .

# Ubah permission direktori agar bisa dibaca dan ditulis oleh Node.js (fs)
RUN chmod -R 777 /app

# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
