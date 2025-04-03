# Editor Project

A modern web-based editor application built with Next.js, React, and various powerful libraries for creating rich interactive experiences.

## Features

-   Modern React-based architecture using Next.js 14
-   Rich UI components powered by Ant Design
-   Interactive canvas functionality with Konva
-   Drag and drop capabilities
-   Docker support for containerization

## Tech Stack

-   **Framework**: Next.js 14
-   **Runtime**: Bun
-   **UI Components**: Ant Design
-   **Canvas**: Konva, React-Konva

## Getting Started

### Prerequisites

-   Bun (Recommended) or Node.js (LTS version)

### Installation

1. Clone the repository:

```bash
git clone [repository-url]
cd editor
```

2. Install dependencies:

```bash
bun install
```

3. Create a `.env` file in the root directory with your environment variables.

### Development

Run the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:8000`.

### Building for Production

```bash
bun run build
```

### Starting Production Server

```bash
bun run start
```

## Docker Support

The project includes a Dockerfile for containerized deployment. To build and run the Docker container:

```bash
docker build -t editor .
docker run -p 8000:8000 editor
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── studio/            # Main application area
│   │   └── _components/   # Studio components
├── api/                   # API routes
├── hooks/                 # Custom React hooks
├── layers/               # Canvas layers
├── providers/            # Context providers
├── public/               # Static assets
├── templates/            # Template files
├── utils/                # Utility functions
└── scripts/              # Build and utility scripts
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
