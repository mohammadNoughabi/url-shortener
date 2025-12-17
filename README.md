# URL Shortener

A modern, efficient URL shortening service that converts long URLs into short, shareable links with analytics tracking and custom alias support.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

- **URL Shortening**: Convert long URLs into concise, easy-to-share short links
- **Custom Aliases**: Create personalized short URLs with custom identifiers
- **Analytics Tracking**: Monitor click counts, referrer information, and access timestamps
- **QR Code Generation**: Automatic QR code generation for shortened URLs
- **Expiration Management**: Set expiration dates for temporary short links
- **Link Management**: View, edit, and delete shortened links
- **Redirect Tracking**: Track redirect statistics and user information
- **REST API**: Full-featured API for programmatic access
- **Responsive Design**: Mobile-friendly interface (if UI included)
- **Performance Optimized**: Fast URL resolution and caching

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js / Python / [Specify your runtime]
- **Framework**: Express.js / FastAPI / [Specify framework]
- **Database**: MongoDB / PostgreSQL / [Specify database]
- **Caching**: Redis (optional for performance)
- **Authentication**: JWT / OAuth2 (if applicable)

### Frontend (if applicable)
- **Framework**: React / Vue.js / [Specify framework]
- **Styling**: Tailwind CSS / Bootstrap / [Specify styling]
- **HTTP Client**: Axios / Fetch API

### Development Tools
- **Version Control**: Git
- **Testing**: Jest / Pytest / [Specify testing framework]
- **Linting**: ESLint / Pylint / [Specify linter]
- **Container**: Docker / Docker Compose

## 📦 Installation

### Prerequisites
- Node.js v14+ or Python 3.8+ (specify based on your project)
- npm or pip (package manager)
- [Database requirement] installed and running
- Git

### Clone the Repository

```bash
git clone https://github.com/mohammadNoughabi/url-shortener.git
cd url-shortener
```

### Backend Setup

```bash
# Navigate to backend directory (if applicable)
cd backend

# Install dependencies
npm install
# or
pip install -r requirements.txt

# Create environment configuration
cp .env.example .env

# Configure environment variables
# Edit .env with your settings:
# - DATABASE_URL
# - API_PORT
# - REDIS_URL (if using Redis)
# - JWT_SECRET (if using authentication)

# Run database migrations (if applicable)
npm run migrate
# or
python manage.py migrate

# Start the server
npm start
# or
python manage.py runserver
```

### Frontend Setup (if applicable)

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Create environment configuration
cp .env.example .env

# Configure API endpoint in .env
# REACT_APP_API_URL=http://localhost:5000

# Start development server
npm start
```

## 🚀 Usage

### Running the Application

**Development Mode:**
```bash
npm run dev
# or
python manage.py runserver
```

**Production Mode:**
```bash
npm run build
npm start
# or
python manage.py collectstatic
gunicorn wsgi:app
```

### Using Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### API Examples

#### Create a Short URL
```bash
curl -X POST http://localhost:5000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{
    "originalUrl": "https://example.com/very/long/url/path",
    "customAlias": "mylink",
    "expiresIn": 7776000
  }'
```

#### Redirect to Original URL
```bash
curl -L http://localhost:5000/mylink
```

#### Get Link Analytics
```bash
curl http://localhost:5000/api/analytics/mylink
```

#### Delete a Short URL
```bash
curl -X DELETE http://localhost:5000/api/shorten/mylink \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 📁 Project Structure

```
url-shortener/
├── src/
│   ├── config/
│   │   ├── database.js       # Database configuration
│   │   ├── cache.js          # Cache/Redis configuration
│   │   └── environment.js    # Environment variables
│   ├── controllers/
│   │   ├── urlController.js  # URL shortening logic
│   │   └── analyticsController.js
│   ├── routes/
│   │   ├── urlRoutes.js      # URL endpoints
│   │   └── analyticsRoutes.js
│   ├── models/
│   │   ├── URL.js            # URL schema/model
│   │   └── Analytics.js      # Analytics model
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware
│   │   ├── errorHandler.js   # Error handling
│   │   └── validation.js     # Request validation
│   ├── utils/
│   │   ├── shortIdGenerator.js
│   │   ├── qrCodeGenerator.js
│   │   └── validators.js
│   └── app.js                # Express app initialization
├── tests/
│   ├── unit/
│   │   └── shortIdGenerator.test.js
│   ├── integration/
│   │   └── api.test.js
│   └── setup.js
├── docs/
│   ├── API.md                # API documentation
│   └── DEPLOYMENT.md         # Deployment guide
├── .env.example              # Environment variables template
├── .gitignore
├── docker-compose.yml        # Docker services configuration
├── Dockerfile                # Container configuration
├── package.json
├── eslintrc.json             # Linting configuration
└── README.md                 # This file
```

## 🔌 API Documentation

### Endpoints Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/shorten` | Create a new shortened URL |
| GET | `/api/shorten/:id` | Get shortened URL details |
| GET | `/:id` | Redirect to original URL |
| PUT | `/api/shorten/:id` | Update a shortened URL |
| DELETE | `/api/shorten/:id` | Delete a shortened URL |
| GET | `/api/analytics/:id` | Get link analytics |
| GET | `/api/user/links` | Get user's shortened URLs |

For detailed API documentation, see [API.md](./docs/API.md)

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- urlController.test.js

# Watch mode
npm test -- --watch
```

## 🔒 Security Considerations

- **Input Validation**: All inputs are validated to prevent injection attacks
- **Rate Limiting**: API endpoints are protected with rate limiting
- **HTTPS**: Always use HTTPS in production
- **Environment Variables**: Never commit sensitive data; use `.env` files
- **SQL Injection Prevention**: Use parameterized queries/ORM
- **CORS**: Configure CORS appropriately for your domain

## 📊 Performance Optimization

- Caching frequently accessed URLs
- Database indexing on short IDs
- CDN integration for static assets
- Lazy loading for analytics

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows the project's linting rules and includes appropriate tests.

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Author

**Mohammad Noughabi**
- GitHub: [@mohammadNoughabi](https://github.com/mohammadNoughabi)

## 📞 Support

For support, please open an issue on the GitHub repository or contact the maintainer.

## 🗺️ Roadmap

- [ ] User authentication and authorization
- [ ] Advanced analytics dashboard
- [ ] Bulk URL shortening
- [ ] Custom domain support
- [ ] API key management
- [ ] Mobile app (iOS/Android)
- [ ] Browser extensions
- [ ] Webhooks support

---

**Last Updated**: December 17, 2025
