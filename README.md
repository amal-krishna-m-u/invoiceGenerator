# Invoice Generator

This is a basic invoice generator built with React.js and Supabase, featuring the ability to add new product categories with GST%, add new products, and generate bills by selecting products.

## Live Link
You can find the live link for this project [Invoice-gst-generator](https://invoice-gst-generator.netlify.app).

## Local Setup

To run this project in your local environment, follow the steps below:

### Prerequisites

1. **Supabase Account:**
   - Create an account on [Supabase](https://supabase.io/) if you don't have one.

2. **Node.js and npm:**
   - Install Node.js and npm from [here](https://nodejs.org/).

### Installation

1. **Clone the Repository:**
   ```bash
   git clone <https://github.com/amal-krishna-m-u/invoiceGenerator.git>
   cd invoiceGenerator
   ```

2. **Install Dependencies:**
   ```bash
   npm install i
   ```

### Configuration

1. **Supabase Configuration:**
   - Set up a new project in Supabase.
   - Create the required tables (categories, products, sales) based on the schema mentioned in  React application.

2. **Environment Variables:**
   - Create a `.env` file in the root directory of the project.
   - Add your Supabase URL and API Key to the `.env` file.
     ```env
     REACT_APP_SUPABASE_URL=your_supabase_url
     REACT_APP_SUPABASE_KEY=your_supabase_api_key
     ```

### Running the Application

Once you have completed the installation and configuration, you can run the application locally:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser to view the application.

## Feedback and Issues

Feel free to provide feedback or report any issues you encounter. Contributions are also welcome!