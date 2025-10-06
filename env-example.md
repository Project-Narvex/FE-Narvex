# Environment Variables Configuration

Create a `.env.local` file in your project root with the following variables:

```bash
# Strapi Configuration
NEXT_PUBLIC_STRAPI_URL=http://localhost:1337
STRAPI_API_TOKEN=your_strapi_token_here

# Page-specific API URLs
STRAPI_HOME_PAGE_URL=https://admin.narvex.id/api/home-page?populate=*
STRAPI_ABOUT_PAGE_URL=https://admin.narvex.id/api/about-page?populate=*
STRAPI_SERVICE_PAGE_URL=https://admin.narvex.id/api/service-page?populate=*
STRAPI_COMPANY_PAGE_URL=https://admin.narvex.id/api/company-page?populate=*
STRAPI_PORTOFOLIO_PAGE_URL=https://admin.narvex.id/api/portofolio-page?populate=*
STRAPI_PORTOFOLIO_URL=https://admin.narvex.id/api/portofolios?populate=*

# Example values for development:
# NEXT_PUBLIC_STRAPI_URL=https://your-strapi-instance.com
# STRAPI_API_TOKEN=your_actual_token_from_strapi_admin
```

## Getting Your Strapi Token

1. Login to your Strapi admin panel
2. Go to Settings > API Tokens  
3. Create new token with necessary permissions
4. Copy the token to your `.env.local` file

## Notes

- Replace `your_strapi_token_here` with your actual Strapi API token
- Make sure `.env.local` is in your `.gitignore` file
- Never commit sensitive tokens to version control
- The `STRAPI_COMPANY_PAGE_URL` should point to your company page API endpoint with proper population parameters
