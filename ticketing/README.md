# Ticketing

### Get Started
 - Run Docker Desktop
 - Enable kubernetes in Docker Desktop
 - Open terminal and install nginx-ingress
   - `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v1.0.0/deploy/static/provider/cloud/deploy.yaml`
   - wait for it to come online
     - `kubectl get pods -n ingress-nginx`
 - run `skaffold dev`
 - OPTIONAL
   - if you don't want to have to type `-n ingress-nginx` everytime you execute a `kubectl` so that you can see the resources in that non-default namespace you can update the kubectl to use `ingress-nginx` as the default namespace like so:
     - `kubectl config set-context --current --namespace=ingress-nginx`