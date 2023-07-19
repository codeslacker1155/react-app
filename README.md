# Google Books Search App

This is a single-page application (SPA) built with React that interacts with the Google Books API. It allows users to search for books and view detailed information about them. The app is deployed as a Static Web App using Azure.

## Overview

The Google Books Search App provides the following functionalities:

- Search for books using the Google Books API.
- Display search results in various styles and layouts.
- Browse books by key attributes like author, subject, and publisher.
- Display comprehensive book information, including the book itself, reviews, preview, and other available information.
- Allow users to save books to a list and export the list in predetermined formats.

The app maintains a clean and simple style without complex designs.

## Milestones

1. **Design web pages to display book data in JSON format.**
2. **Search and retrieve book information from the Google Books web API.**
3. **Implement major operations in the AJAX/AJAJ way.**
4. **Improve the page design with better SPA UI designs.**

## Directory Structure

```google-books-search-app/
├── node_modules/
├── public/
│ ├── index.html
│ ├── favicon.ico
│ └── manifest.json
├── src/
│ ├── App.js
│ ├── App.css
│ ├── index.js
│ └── index.css
├── package.json
├── package-lock.json
└── README.md
```

## How to Run the App

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Run `npm install` to install the dependencies.
4. Run `npm start` to start the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment

The app is deployed as a Static Web App using Azure. You can view the live app [here](https://white-mud-07997cb0f.3.azurestaticapps.net/) (replace `#` with the actual URL of your deployed app).

## Contributing

This project is open for contributions. Please fork the repository and create a pull request with your changes.

## License

This project is licensed under the MIT License.
