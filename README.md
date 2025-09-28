# Dockerized Service

A simple Node.js web application containerized with Docker that demonstrates authentication functionality and automated CI/CD deployment.

## Overview

This project is a Node.js Express application that provides:
- A simple "Hello World" homepage
- An authentication system with username/password protection
- A secret page that displays a hidden message after successful authentication
- Docker containerization for easy deployment
- Automated CI/CD pipeline with GitHub Actions

## Features

- **Authentication System**: Simple form-based login with environment variable credentials
- **Protected Route**: Secret page accessible only after authentication
- **Environment Configuration**: Configurable via environment variables
- **Docker Support**: Fully containerized application
- **CI/CD Pipeline**: Automated build and deployment with GitHub Actions
- **Docker Hub Integration**: Automatic image publishing

## Project Structure

```
dockerized-service/
├── .dockerignore          # Docker ignore patterns
├── .env                   # Environment variables (not in repo)
├── .env.sample           # Environment variables template
├── .gitignore            # Git ignore patterns
├── Dockerfile            # Docker image configuration
├── index.js              # Main application file
├── package.json          # Node.js dependencies and scripts
├── LICENSE               # Project license
├── README.md             # This file
└── .github/
    └── workflows/
        └── cicd.yml       # GitHub Actions CI/CD pipeline
```

## Prerequisites

- **Node.js** (version 20 or higher)
- **Docker** (for containerization)
- **Git** (for version control)

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd dockerized-service
```

### 2. Setup Environment Variables

```bash
cp .env.sample .env
```

Edit the `.env` file with your desired values:
```bash
SECRET_MESSAGE="Your secret message here"
USERNAME="your_username"
PASSWORD="your_password"
```

### 3. Run Locally (Development)

```bash
# Install dependencies
npm install

# Start the application
node index.js
```

The application will be available at `http://localhost:3000`

### 4. Run with Docker

```bash
# Build the Docker image
docker build -t dockerized-service .

# Run the container
docker run -d \
  -p 3000:3000 \
  --name dockerized-service \
  --env-file .env \
  dockerized-service
```

## Usage

### Routes

- **GET /** - Homepage with "Hello World" message
- **GET /secret** - Protected route that shows authentication form or secret message
- **POST /authenticate** - Handles login form submission

### Authentication Flow

1. Visit `http://localhost:3000/secret`
2. Enter the username and password (configured in `.env` file)
3. Upon successful authentication, the secret message will be displayed
4. Invalid credentials will show an error message

### Example Usage

```bash
# Test the homepage
curl http://localhost:3000

# Test the secret endpoint (will show login form)
curl http://localhost:3000/secret

# Test authentication
curl -X POST http://localhost:3000/authenticate \
  -d "username=your_username&password=your_password" \
  -H "Content-Type: application/x-www-form-urlencoded"
```

## Docker Configuration

### Dockerfile Details

- **Base Image**: `node:20-alpine` (lightweight Alpine Linux with Node.js 20)
- **Working Directory**: `/app`
- **Port**: Exposes port 3000
- **Optimization**: Multi-stage build pattern for efficient image size

### Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SECRET_MESSAGE` | Message displayed on successful authentication | `"Welcome to the secret area!"` |
| `USERNAME` | Valid username for authentication | `"admin"` |
| `PASSWORD` | Valid password for authentication | `"secret123"` |

## CI/CD Pipeline

The project includes a GitHub Actions workflow (`.github/workflows/cicd.yml`) that:

### Build Stage
1. **Checkout code** from the repository
2. **Set up Docker Buildx** for advanced Docker features
3. **Login to Docker Hub** using repository secrets
4. **Build and push** the Docker image to Docker Hub with caching

### Deploy Stage
1. **Pull latest image** from Docker Hub
2. **Stop and remove** existing container
3. **Run new container** with the updated image
4. **Clean up** unused Docker images

### Required Secrets

Configure these secrets in your GitHub repository:
- `DOCKER_USERNAME` - Your Docker Hub username
- `DOCKER_PASSWORD` - Your Docker Hub access token

### Self-Hosted Runner

The deployment stage runs on a `self-hosted` runner. Make sure to:
1. Set up a self-hosted GitHub Actions runner
2. Install Docker on the runner machine
3. Configure the runner with appropriate permissions

## Development

### Local Development Setup

```bash
# Install dependencies
npm install

# Start in development mode (with auto-reload)
npm run dev  # If you add nodemon to package.json

# Run tests (when implemented)
npm test
```

### Adding New Features

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Update `index.js` for new routes or functionality
   - Update environment variables if needed
   - Update Dockerfile if new dependencies are added

3. **Test locally**
   ```bash
   npm start
   # Test your changes
   ```

4. **Test with Docker**
   ```bash
   docker build -t test-image .
   docker run -p 3000:3000 --env-file .env test-image
   ```

5. **Commit and push**
   ```bash
   git add .
   git commit -m "Add: your feature description"
   git push origin feature/your-feature-name
   ```

## Security Considerations

⚠️ **Important Security Notes:**

- **Environment Variables**: Never commit `.env` files to version control
- **Credentials**: Use strong passwords and consider implementing proper authentication
- **HTTPS**: Consider adding SSL/TLS for production deployments
- **Container Security**: Regularly update base images for security patches
- **Access Control**: Implement proper access controls for production environments

## Troubleshooting

### Common Issues

1. **Port Already in Use**
   ```bash
   # Find process using port 3000
   lsof -i :3000
   
   # Kill the process
   kill -9 <PID>
   ```

2. **Docker Build Fails**
   ```bash
   # Clean Docker cache
   docker system prune -a
   
   # Rebuild without cache
   docker build --no-cache -t dockerized-service .
   ```

3. **Environment Variables Not Loading**
   - Ensure `.env` file exists and has correct format
   - Check file permissions
   - Verify environment variable names match exactly

4. **Authentication Not Working**
   - Check `.env` file values
   - Verify username/password are correct
   - Check browser network tab for form submission issues

### Logs

```bash
# View container logs
docker logs dockerized-service

# Follow logs in real-time
docker logs -f dockerized-service

# View application logs (if logging is implemented)
npm start
```

## Deployment Options

### Option 1: Docker Hub + Self-Hosted Runner
- Uses the included GitHub Actions workflow
- Requires self-hosted runner setup
- Automatic deployment on push to main branch

### Option 2: Cloud Platforms
- **AWS ECS**: Deploy using Amazon Elastic Container Service
- **Google Cloud Run**: Serverless container deployment
- **Azure Container Instances**: Simple container hosting
- **DigitalOcean App Platform**: Platform-as-a-Service deployment

### Option 3: Docker Compose
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - SECRET_MESSAGE=Your secret message
      - USERNAME=admin
      - PASSWORD=secret123
    restart: unless-stopped
```

## License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## Author

**Rushikesh Ghodke**

## Acknowledgments

- Node.js community for excellent documentation
- Docker for containerization technology
- GitHub Actions for CI/CD automation
- Express.js for the web framework



Project Page URL: https://roadmap.sh/projects/dockerized-service-deployment