# SANITARY ZONE WEB

[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/AplinkosMinisterija/sanitary-zone/badge)](https://securityscorecards.dev/viewer/?platform=github.com&org={AplinkosMinisterija}&repo={sanitary-zone})
[![License](https://img.shields.io/github/license/AplinkosMinisterija/sanitary-zone)](https://github.com/AplinkosMinisterija/sanitary-zone/blob/main/LICENSE)
[![GitHub issues](https://img.shields.io/github/issues/AplinkosMinisterija/sanitary-zone)](https://github.com/AplinkosMinisterija/sanitary-zone/issues)
[![GitHub stars](https://img.shields.io/github/stars/AplinkosMinisterija/sanitary-zone)](https://github.com/AplinkosMinisterija/sanitary-zone/stargazers)

This repository contains the source code and documentation for the  SANITARY ZONE WEB, developed by the Aplinkos
Ministerija.

## Table of Contents

- [About the Project](#about-the-project)
- [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Usage](#usage)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

## About the Project

The SANITARY ZONE WEB is a tool designed to provide companies with quick and easy access to information about their respective sanitary zones. Users can enter their company name and receive detailed information about the sanitary zone applicable to their location.



Key features of the WEB include:

- Search by Company Name: Users can input their company name to retrieve information about the designated sanitary zone.
- Sanitary Zone Details: The web application provides comprehensive details about the specific sanitary zone associated with the entered company name.
- User-Friendly Interface: The user interface is designed to be intuitive and user-friendly, ensuring a seamless experience for users of all levels.

## Getting Started

To get started with the SANITARY ZONE WEB, follow the instructions below.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AplinkosMinisterija/sanitary-zone.git
   ```

2. Install the required dependencies:

   ```bash
   cd sanitary-zone
   yarn install
   ```

### Usage

1. Start the WEB server:

   ```bash
   yarn start
   ```

The WEB will be available at `http://localhost:8080`.

## Deployment

### Production

To deploy the application to the production environment, create a new GitHub release:

1. Go to the repository's main page on GitHub.
2. Click on the "Releases" tab.
3. Click on the "Create a new release" button.
4. Provide a version number, such as `1.2.3`, and other relevant information.
5. Click on the "Publish release" button.

### Staging

The `main` branch of the repository is automatically deployed to the staging environment. Any changes pushed to the main
branch will trigger a new deployment.

### Development

To deploy any branch to the development environment use the `Deploy to Development` GitHub action.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a
pull request. For more information, see the [contribution guidelines](./CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](./LICENSE).
