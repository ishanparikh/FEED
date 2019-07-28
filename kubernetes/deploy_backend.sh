#!/bin/bash

cd ../backend
docker build . -t whadiyatalkinabeet/feed:backend
docker push whadiyatalkinabeet/feed:backend
cd ../kubernetes
kubectl --kubeconfig="feed-cluster-kubeconfig.yaml" delete -f backend_deployment.yaml
kubectl --kubeconfig="feed-cluster-kubeconfig.yaml" create -f backend_deployment.yaml