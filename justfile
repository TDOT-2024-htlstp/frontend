build version:
    docker build -t tdot-frontend:{{version}} .

publish version: (build version)
    docker tag tdot-frontend:{{version}} tobinio/tdot-frontend:{{version}}
    docker push tobinio/tdot-frontend:{{version}}
