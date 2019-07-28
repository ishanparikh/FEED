#!/bin/bash

cd ../frontend
docker build . -t whadiyatalkinabeet/feed:frontend
docker push whadiyatalkinabeet/feed:frontend
cd ../kubernetes
kubectl --kubeconfig="feed-cluster-kubeconfig.yaml" delete -f frontend_deployment.yaml
kubectl --kubeconfig="feed-cluster-kubeconfig.yaml" create -f frontend_deployment.yaml