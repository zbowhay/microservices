# install and setup ingress-nginx, then wait for it to come online
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml
kubectl wait --namespace ingress-nginx --for=condition=ready pod --selector=app.kubernetes.io/component=controller --timeout=120s

# declare secrets
kubectl create secret generic jwt-secret --from-literal=jwt_key=$MICROSERVICES_JWT_KEY -n ingress-nginx
