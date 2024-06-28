# LostTracker
LostTracker is a Missing Persons application built using Vite, React, and TypeScript with Appwrite serving as the backend and database. This app helps users search for and view profiles of missing persons with infinite scrolling and location-based features using Leaflet. Users can also bookmark profiles and post new missing person profiles.

## Table of Contents
- Features
- Demo
- Installation
- Usage
- Configuration
- Contributing

## Features
- Search and view profiles of missing persons
- Infinite scrolling for continuous data loading
- Location-based features using Leaflet
- Data management with Appwrite
- Bookmark missing person profiles
- Post new missing person profiles

## Demo

## Installation
Follow these steps to install and set up the project:

1. Clone the repository
   
```git clone https://github.com/joujou144/react-losttracker.git```

2. Navigate into the directory

```cd react-losttracker```

3. Install dependencies

```npm install```

4. Start the application

```npm run dev```

## Usage
Here's an example of how to use the app:

1. Search for a missing person

Enter the name of the person in the search bar and press Enter.

2. View profiles

Scroll through the list of missing persons. The app supports infinite scrolling, so more profiles will load as you scroll down.

3. View location on the map

Click on a profile to view the location on the map.

4. Bookmark profiles

Click the bookmark icon on a profile to save it for later viewing.

5. Post a new profile

Fill out the form to post a new missing person profile with relevant details and a photo.

## Configuration

1. Create an Appwrite project

If you haven't already, sign up for an Appwrite account and create a new project. Note down your project ID.

2. Create a Database and Collection

Within your Appwrite project, create a database and a collection for storing the missing persons' profiles. Note down your database ID and collection ID.

3. Configure environment variables to connect to the Appwrite backend.
  
Create a `.env` file in the root of your project and add the following variables:

```
VITE_API_ENDPOINT = 'https://cloud.appwrite.io/v1'
VITE_RPOJECT_ID = <YOUR_PROJECT_ID>
VITE_STORAGE_ID ='6661d4a0002a114b5be4'
VITE_DATABASE_ID = "6661d4f8000fd86b59ca"
VITE_SAVES_COLLECTION_ID = "6668360d00196b61135e"
VITE_USERS_COLLECTION_ID = "6662278f002906cf0b66"
VITE_MISSING_PERSONS_COLLECTION_ID = "666227380039aa754aee"
```
Replace `<YOUR_PROJECT_ID>`, `<YOUR_DATABASE_ID>`, and `<YOUR_COLLECTION_ID>` with your actual Appwrite project details.

## Contributing
Contributions to improve LostTracker are welcome. To contribute, follow these steps:

1. Fork the project
2. Create your feature branch
   
```git checkout -b feature/AmazingFeature```

3. Commit your changes

```git commit -m 'Add some AmazingFeature' ```

4. Push to branch

```git push origin feature/AmazingFeature```


### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
