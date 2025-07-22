# Shopify Reproduction
![image](https://i.imgur.com/VUAj4iU.png)

This project is set up to reproduce the `Missing adapter implementation for 'abstractRuntimeString'` error when using `@shopify/shopify-api` with Nuxt 4.

## Reproduction Steps

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd shopify-example
    ```

2.  **Install dependencies using Bun:**
    ```bash
    bun install
    ```

3.  **Set up environment variables:**
    Copy the example environment file and fill in your Shopify API credentials from your Partners Dashboard.
    ```bash
    cp .env.example .env
    ```
    Edit the `.env` file:
    ```
    SHOPIFY_CLIENT_ID=your_shopify_api_key_here
    SHOPIFY_CLIENT_SECRET=your_shopify_api_secret_here
    SHOPIFY_REDIRECT_URI=localhost:3000
    ```

4.  **Start the development server:**
    ```bash
    bun run dev
    ```

5.  **Access the test page:**
    Open your browser and navigate to `http://localhost:3000/`.

6.  **Trigger the error:**
    On the test page, enter a Shopify store name (e.g., `your-store.myshopify.com`) and click "Test Shopify Auth".

    You should observe the `Missing adapter implementation for 'abstractRuntimeString'` error in your terminal where the Nuxt server is running, confirming the reproduction of the issue.

## Expected vs. Actual Behavior

-   **Expected:** The Shopify API should initialize correctly without adapter errors.
-   **Actual:** The application throws `Missing adapter implementation for 'abstractRuntimeString'` when `shopifyApi()` is called in the server API route.

## Relevant Files

-   <mcfile name="server/api/shopify/auth.post.ts" path="server/api/shopify/auth.post.ts"></mcfile>: The server API route where `shopifyApi()` is initialized.
-   <mcfile name="pages/test-shopify.vue" path="pages/test-shopify.vue"></mcfile>: The frontend page to trigger the API call.
-   <mcfile name="nuxt.config.ts" path="nuxt.config.ts"></mcfile>: Nuxt configuration.
-   <mcfile name="package.json" path="package.json"></mcfile>: Project dependencies.

