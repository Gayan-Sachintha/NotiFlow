![image](https://github.com/Gayan-Sachintha/NotiFlow/assets/118958174/ac5d3044-f470-4ae9-ab98-ff4ebfeb6f2d)# NotiFlow

NotiFlow is a comprehensive notification management system designed to streamline and enhance communication flows. This guide covers the steps necessary to set up and run NotiFlow on your local machine.

## Prerequisites

Before you start, make sure you have the following installed:
- Visual Studio Code
- Node.js and npm
- WAMP or XAMPP server
- Firebase account

## Installation

Follow these steps to set up your environment:

### Step 1: Clone the Project

Clone the repository from GitHub or download from Google Drive:

- GitHub: [NotiFlow Repository](https://github.com/Gayan-Sachintha/NotiFlow)
- Google Drive: [Download ZIP](https://drive.google.com/file/d/1hYwGNHiOsOsh9aFxDTeZ7TwM3PiuPIWT/view?usp=sharing)

### Step 2: Unzip and Open

If downloaded as a ZIP file, unzip the folder and open it using Visual Studio Code.

### Step 3: Open Terminals

Open two terminals in Visual Studio Code:
- In the first terminal, run `cd frontend` to navigate to the frontend directory.
- In the second terminal, run `cd backend` to navigate to the backend directory.

### Step 4: Install Dependencies

Run `npm i` in both the frontend and backend terminals to install the required Node.js packages.

### Step 5: Message Backend Setup

1. Open a new terminal and navigate to the message backend with `cd message_backend`.
2. Install dependencies with `npm i`.

### Step 6: Database Setup

1. Start your WAMP/XAMPP server and access phpMyAdmin.
2. Create a new database named `notiflow`.
3. Import the provided database file by selecting the import tab and clicking the "Go" button.

### Step 7: Firebase Setup

Set up a Firebase project to manage authentication and other services required by NotiFlow.

### Step 8: Start the Application

Run `npm start` in both the frontend and backend terminals to start the servers.

## Usage

Access the system through your local setup or via the hosted version at [http://notiflow.site](http://notiflow.site).

### Special Note

When registering, please include the country code with the contact number.

## Admin Access

To access the admin panel:
- URL: `/admin/login`
- Username: `admin`
- Password: `admin`

## Contributing

Contributions to NotiFlow are welcome. Please feel free to fork the repository, make changes, and submit a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

Thanks to everyone who has contributed to the development of NotiFlow!
