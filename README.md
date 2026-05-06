# 🚀 Simple CRUD App on Kubernetes (EKS)

A full-stack backend application deployed on Kubernetes using **Amazon EKS**, featuring MongoDB Replica Set, auto-scaling, and public API exposure via Ingress.

---

## 📌 Tech Stack

* Node.js (Express)
* MongoDB (Replica Set)
* Docker
* Kubernetes
* Amazon EKS
* NGINX Ingress Controller
* Horizontal Pod Autoscaler (HPA)

---

## ⚙️ Setup Steps

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/simple-crud.git
cd simple-crud
```

---

### 2️⃣ Build & Push Docker Image

```bash
docker build -t YOUR_DOCKER_USERNAME/simple-crud:latest .
docker push YOUR_DOCKER_USERNAME/simple-crud:latest
```

---

### 3️⃣ Create EKS Cluster

```bash
eksctl create cluster \
--name simple-crud \
--region us-east-1 \
--node-type t3.micro \
--nodes 2
```

---

### 4️⃣ Configure kubectl

```bash
aws eks update-kubeconfig --region us-east-1 --name simple-crud
```

---

### 5️⃣ Create Namespace

```bash
kubectl apply -f k8s/namespace.yaml
```

---

### 6️⃣ Deploy MongoDB Replica Set

```bash
kubectl apply -f k8s/mongodb-service.yaml
kubectl apply -f k8s/mongodb-statefulset.yaml
```

Initialize replica set:

```bash
kubectl exec -it mongodb-0 -n backend -- mongosh --eval "rs.initiate({_id:'rs0',members:[{_id:0,host:'mongodb-0.mongodb.backend.svc.cluster.local:27017'},{_id:1,host:'mongodb-1.mongodb.backend.svc.cluster.local:27017'},{_id:2,host:'mongodb-2.mongodb.backend.svc.cluster.local:27017'}]})"
```

---

### 7️⃣ Deploy Backend

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

---

### 8️⃣ Install Ingress Controller

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/cloud/deploy.yaml
```

---

### 9️⃣ Deploy Ingress

```bash
kubectl apply -f k8s/ingress.yaml
```

Get public URL:

```bash
kubectl get svc -n ingress-nginx
```

---

### 🔟 Enable Auto Scaling

Install metrics server:

```bash
kubectl apply -f https://github.com/kubernetes-sigs/metrics-server/releases/latest/download/components.yaml
```

Apply HPA:

```bash
kubectl apply -f k8s/hpa.yaml
```

Monitor:

```bash
kubectl get hpa -n backend --watch
```

---

## 🌐 API Endpoints

Base URL:

```text
http://<INGRESS-URL>
```

---

### 📥 Get All Products

```http
GET /products
```

---

### 📥 Get Single Product

```http
GET /products/:id
```

---

### ➕ Create Product

```http
POST /products
```

**Body:**

```json
{
  "name": "Product Name",
  "price": 100
}
```

---

### ✏️ Update Product

```http
PUT /products/:id
```

---

### ❌ Delete Product

```http
DELETE /products/:id
```

---

## 🧪 Testing Locally (Port Forward)

```bash
kubectl port-forward svc/simple-crud-service 8000:80 -n backend
```

```bash
curl http://localhost:8000/products
```

---

## 📊 Features

* MongoDB Replica Set (High Availability)
* Kubernetes Deployment + Service
* NGINX Ingress (Public Access)
* Horizontal Pod Autoscaler (CPU-based)
* Persistent Storage with EBS

---

## 📌 Notes

* Ensure your Docker image is publicly accessible
* Make sure metrics-server is running before HPA
* Use correct region (`us-east-1`) for EKS

---

## 💥 Author

**Bassam Eldawy**

---

## ⭐ Bonus (Future Improvements)

* CI/CD with GitHub Actions
* HTTPS with SSL
* Prometheus & Grafana monitoring
* Helm charts

---
