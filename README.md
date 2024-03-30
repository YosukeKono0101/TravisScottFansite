# Travis Scott Fan Site

## Purpose

The Travis Scott Fan Site is a dedicated platform to celebrate the artistry of Jacques Berman Webster II, known professionally as Travis Scott. It aims to provide fans with a central hub for all things related to the artist, including his music, videos, albums, and more. The site features a modern, responsive design ensuring a seamless experience across all devices.

## Contributing

Contributions to the development of the Travis Scott Fan Site are welcome. Whether it's adding new features, fixing bugs, or improving documentation, your help is appreciated. To contribute:

1. Fork the repository.
2. Create a new branch for your feature (`git checkout -b feature AmazingFeature`).
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.

## Features

- **Home Page**: A landing page with a hero section showcasing Travis Scott.
- **About Page**: Detailed information about Travis Scott's career and achievements.
- **Resume Page**: An overview of Travis Scott's career highlights and skills.
- **Portfolio Page**: A collection of videos and albums by Travis Scott.
- **Video Detail Page**: Detailed information about specific videos.
- **Album Detail Page**: Detailed information about specific albums.
- **Chart Page**: Interactive charts displaying Travis Scott's top tracks and albums.

## Dependencies

The application relies on several key dependencies:

- **React**
- **React Router**
- **Styled Components**
- **Chart.js and react-chartjs-2**
- **FontAwesome**

To install these dependencies, navigate to your project directory and run:

```
npm install
```

## Architecture

The application is structured into components and pages, with `styled-components` for styling and `react-router-dom` for navigation. It uses a `flex` layout to ensure responsiveness across devices. The application's state is managed locally within components using React's `useState` and `useEffect` hooks.

- **Components**: Reusable UI elements like `Header`, `Footer`, and `LoadingSpinner`.
- **Pages**: Individual pages like `Home`, `About`, `Resume`, and more, contained within the `/pages` directory.
- **Services**: External API calls are abstracted into service functions located in the `/services` directory.

## Reporting Issues

If you encounter any bugs or issues while using the Travis Scott Fan Site, please report them on the repository's issues page. Provide a detailed description of the issue, including steps to reproduce it, and screenshots if possible. Your feedback helps make the site better for everyone.
