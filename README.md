# Editor Studio

A modern, feature-rich web-based editor built with Next.js, React, and Konva. This application provides a powerful canvas-based editing environment with support for multiple layer types, drag-and-drop functionality, and real-time editing capabilities.

## Features

-   🎨 **Canvas Editor**: Interactive canvas with support for multiple layer types
-   📝 **Layer Management**: Support for text, image, shape, and background layers
-   🖱️ **Drag & Drop**: Intuitive drag-and-drop interface for layer manipulation
-   🎯 **Real-time Editing**: Instant updates and modifications
-   🌓 **Theme Support**: Light and dark mode support
-   📱 **Responsive Design**: Works across different screen sizes

## Tech Stack

-   **Frontend Framework**: Next.js 14
-   **UI Library**: React 18
-   **Canvas Library**: Konva & React-Konva
-   **State Management**: React Context
-   **Styling**: Tailwind CSS
-   **UI Components**: Ant Design
-   **Form Handling**: Formik & Yup
-   **API Client**: Axios
-   **Development**: Bun Runtime

## Project Structure

```
├── app/                    # Next.js app directory
│   └── studio/            # Main editor application
│       └── _components/   # Editor components
├── layers/                # Layer type implementations
│   ├── text/             # Text layer components
│   ├── image/            # Image layer components
│   ├── shape/            # Shape layer components
│   └── background/       # Background layer components
├── providers/            # React Context providers
├── utils/               # Utility functions
└── public/              # Static assets
```

## Getting Started

1. **Prerequisites**

    - Bun (recommended) or Node.js (v18 or later)

2. **Installation**

    ```bash
    # Clone the repository
    git clone [repository-url]

    # Install dependencies
    bun install
    # or
    npm install
    ```

3. **Development**

    ```bash
    # Start development server
    bun run dev
    # or
    npm run dev
    ```

4. **Building for Production**

    ```bash
    # Build the application
    bun run build
    # or
    npm run build

    # Start production server
    bun run start
    # or
    npm run start
    ```

## Version Management

The project includes version management scripts:

-   `bun run version:patch` - Increment patch version
-   `bun run version:minor` - Increment minor version
-   `bun run version:major` - Increment major version

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
