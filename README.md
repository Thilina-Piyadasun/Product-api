# Product-api
Sample NodeJs backend application

## Instructions to run the application

1. Checkout the source from `master branch`
2. Run npm install
3. Build docker image by navigating to checked out folder 
    `docker build . -t product-api:v1`
5. Run the application by 
    `docker run -it -p 8999:8999 product-api:v1`
