# Ticketing


### Requirements
Docker Desktop 4.0.0+

### Environment Variable
You will need to set a MICROSERVICES_JWT_KEY environment variable on your machine so that kubernetes can gather it and share it as a secret amongst pods for signing/verifying JWT tokens.


### Get Started
 - Run Docker Desktop
 - Enable kubernetes in Docker Desktop
 - execute `bash setup.sh`
    - This script will install and configure [ingress-nginx](https://kubernetes.github.io/ingress-nginx/deploy/).  At the time of writing this will deploy it in the `ingress-nginx` namespace.  All of the pods we deploy in this project will also be deployed in the `ingress-nginx` namespace so any `kubectl` commands you run should also specify `-n ingress-nginx` so that they operate on the namespace we're working in.
 - run `skaffold dev`
 - OPTIONAL
   - if you don't want to have to type `-n ingress-nginx` everytime you execute a `kubectl` so that you can see the resources in that non-default namespace you can update the kubectl to use `ingress-nginx` as the default namespace like so:
     - `kubectl config set-context --current --namespace=ingress-nginx`


