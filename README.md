# GetMedInfo - Medical Information Resource

A comprehensive web application for providing detailed information about medicines, including composition, dosage, uses, side effects, and precautions.

## Features

- Detailed medicine information database
- Categorized browsing
- Search functionality
- Admin panel for content management
- Image uploads via Cloudinary
- Responsive design for all devices

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- MongoDB with Mongoose
- Tailwind CSS
- Authentication with JWT
- Cloudinary for image storage

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- MongoDB database
- Cloudinary account

### Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```
# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/dbname

# Authentication
JWT_SECRET=your-jwt-secret-key-here

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Next.js
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Run the development server:
   ```
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cloudinary Setup

1. Create a free account at [Cloudinary](https://cloudinary.com/)
2. Navigate to Dashboard to get your cloud name, API key, and API secret
3. Add these values to your `.env.local` file
4. The application will automatically use Cloudinary for image uploads in the admin panel

## Admin Access

To access the admin panel:
1. Register a user account
2. Manually update the user role to "admin" in the database
3. Log in with the admin account
4. Access the admin panel at `/admin`

## License

This project is licensed under the MIT License.
