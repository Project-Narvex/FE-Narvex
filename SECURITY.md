# Security Guidelines for Strapi API Integration

## 🔒 Token Security Best Practices

### Current Implementation
- ✅ Token stored in `.env.local` (not committed to git)
- ✅ Token used only in server-side API routes
- ✅ Token not exposed to client-side code
- ✅ API routes handle authentication server-side

### Security Recommendations

#### 1. Token Management
```bash
# Generate new token in Strapi Admin
# Go to Settings > API Tokens > Create new token
# Use minimal required permissions (read-only for public content)
```

#### 2. Environment Separation
```bash
# Development
STRAPI_API_TOKEN=dev_token_here

# Production  
STRAPI_API_TOKEN=prod_token_here
```

#### 3. Token Rotation
- Rotate tokens monthly
- Use different tokens for different environments
- Revoke old tokens when creating new ones

#### 4. Permission Scoping
- Use read-only tokens for public content
- Limit token permissions to specific content types
- Avoid admin-level tokens for public APIs

#### 5. Monitoring
- Monitor API usage in Strapi admin
- Set up alerts for unusual activity
- Log API requests (without exposing tokens)

### Current Security Status
- ✅ **Server-side only**: Token never sent to client
- ✅ **Environment protected**: `.env.local` in `.gitignore`
- ✅ **API route isolation**: Authentication handled server-side
- ⚠️ **Token rotation**: Should be implemented
- ⚠️ **Permission scoping**: Should be reviewed

### Implementation Security
```typescript
// ✅ SECURE: Token used only in server-side API routes
export async function GET(request: NextRequest) {
  const strapiService = new StrapiContentService(); // Uses server-side token
  const data = await strapiService.getBlogArticlesList(params);
  return NextResponse.json(data); // Only data sent to client
}

// ❌ INSECURE: Would expose token to client
const token = process.env.STRAPI_API_TOKEN; // Never do this in client components
```

### Next Steps
1. Generate new token with minimal permissions
2. Update `.env.local` with new token
3. Test API functionality
4. Set up token rotation schedule
5. Monitor API usage in Strapi admin
