# FROM node:22-alpine
# WORKDIR /app

# # 의존성 설치를 위해서
# COPY package.json ./

# RUN yarn install --pure-lockfile

# # 어플리케이션 복사
# COPY .  .

# RUN yarn build

# EXPOSE 3000

# CMD ["yarn","start"]

FROM node:22-alpine

WORKDIR /app

# 의존성 설치를 위해 package.json 복사
COPY package.json package-lock.json ./

# --omit=dev 
RUN npm install --omit=dev --no-fund --no-audit

# 애플리케이션 파일 복사
COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "serve"]