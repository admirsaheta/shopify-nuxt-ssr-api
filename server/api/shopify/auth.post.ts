import '@shopify/shopify-api/adapters/node'
import { ApiVersion, shopifyApi } from '@shopify/shopify-api'
import { process } from 'std-env'

export default defineEventHandler(async event => {
  try {
    const SHOPIFY_API_KEY = process.env.SHOPIFY_CLIENT_ID
    const SHOPIFY_API_SECRET = process.env.SHOPIFY_CLIENT_SECRET
    const SHOPIFY_REDIRECT_URI = process.env.SHOPIFY_REDIRECT_URI

    if (!SHOPIFY_API_KEY || !SHOPIFY_API_SECRET || !SHOPIFY_REDIRECT_URI) {
      throw new Error(
        'Invalid Shopify credentials. Please set SHOPIFY_CLIENT_ID and SHOPIFY_CLIENT_SECRET in your environment variables.',
      )
    }

    const SCOPES = ['read_products', 'write_products', 'read_orders', 'write_orders']

    const body = await readBody(event)
    const { storeName } = body

    if (!storeName) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Missing shop URL',
      })
    }

    // Initialize Shopify API
    // https://github.com/Shopify/shopify-app-js/blob/main/packages/apps/shopify-api/docs/reference/shopifyApi.md
    const shopify = shopifyApi({
      apiKey: SHOPIFY_API_KEY,
      apiSecretKey: SHOPIFY_API_SECRET,
      scopes: SCOPES,
      hostName: SHOPIFY_REDIRECT_URI,
      apiVersion: ApiVersion.January25,
      isEmbeddedApp: false,
    })

    // Clean up the shop URL to ensure it's just the domain
    const shop = shopify.utils.sanitizeShop(storeName, true)
    if (!shop) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid shop URL',
      })
    }

    // Create a new auth session
    const callbackPath = '/api/shopify/callback'

    // Generate the authorization URL
    const authSession = await shopify.auth.begin({
      shop,
      callbackPath,
      isOnline: false,
      rawRequest: event.node.req,
    })

    return {
      success: true,
      redirectUrl: authSession,
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to start Shopify installation'

    throw createError({
      statusCode: 500,
      statusMessage: errorMessage,
      data: error,
    })
  }
})