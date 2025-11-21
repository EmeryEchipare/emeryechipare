# Admin System - Comment Moderation

## Overview
A simple admin authentication system has been added to allow you to delete comments from your artwork pages.

## Admin Login

### Access the Admin Page
Visit: **https://emeryechipare.com/admin**

### Login Credentials
- **Password**: `EmeryAdmin2025!`

The password is stored securely as an encrypted secret in your Cloudflare Worker (not in the code).

## How to Delete Comments

1. **Log in to the admin panel**
   - Go to https://emeryechipare.com/admin
   - Enter the password
   - Click "Log In"

2. **Navigate to artwork pages**
   - Once logged in, you'll see a "Go to Gallery" button
   - Browse to any artwork page

3. **Delete comments**
   - When logged in as admin, you'll see a red **×** button next to each comment
   - Click the **×** button to delete a comment
   - Confirm the deletion when prompted

4. **Log out**
   - Return to https://emeryechipare.com/admin
   - Click "Log Out" to end your session

## Security Features

- **Password stored securely**: The admin password is stored as a Cloudflare Worker secret (encrypted)
- **Token-based authentication**: After login, a token is stored in your browser's localStorage
- **Authorization required**: All delete requests require a valid admin token
- **Confirmation prompts**: You'll be asked to confirm before deleting any comment

## Changing the Admin Password

To change your admin password, run this command in the project directory:

```bash
cd worker-api
echo "YourNewPassword" | npx wrangler secret put ADMIN_PASSWORD
```

Replace `YourNewPassword` with your desired password.

## Technical Details

### API Endpoints

**Login**
- `POST /admin/login`
- Body: `{ "password": "your-password" }`
- Returns: `{ "success": true, "token": "..." }`

**Delete Comment**
- `DELETE /admin/comment/:id`
- Headers: `Authorization: Bearer <token>`
- Returns: `{ "success": true }`

### Storage
- Admin status is stored in `localStorage` as `adminToken`
- Token format: Base64-encoded string containing `admin:timestamp:password`
- Token is validated on every delete request

### Files
- Admin page: `app/admin/page.tsx`
- Worker auth logic: `worker-api/src/index.js` (adminLogin, deleteComment functions)
- Comment component: `components/Comments.tsx` (delete button and handler)

## Limitations

This is a simple authentication system suitable for a single admin (you). It's not designed for:
- Multiple admin users
- Role-based permissions
- Session expiration
- Password reset functionality

For these features, you would need a more robust authentication system (e.g., NextAuth.js, Clerk, or Auth0).

## Troubleshooting

**"Invalid password" error**
- Make sure you're using the correct password: `EmeryAdmin2025!`
- Password is case-sensitive

**Delete button not showing**
- Make sure you're logged in at /admin first
- Check that localStorage has `adminToken` (open browser DevTools > Application > Local Storage)

**"Unauthorized" error when deleting**
- Your token may have been lost - log in again at /admin
- Clear your browser cache and try again

**Changes not reflected on Worker**
- The Worker caches responses - changes may take a few seconds to propagate
- If issues persist, redeploy the Worker with `cd worker-api && npx wrangler deploy`

## Best Practices

1. **Keep the password secure** - Don't share it with anyone
2. **Log out when done** - Especially on shared computers
3. **Review comments regularly** - Check for spam or inappropriate content
4. **Be thoughtful about deletions** - Remember that users can't see deleted comments

## Future Enhancements

Possible additions for the admin system:
- Comment approval workflow (moderate before publishing)
- Ban users by IP
- Comment edit functionality
- Bulk delete operations
- Admin dashboard with statistics
- Email notifications for new comments
- Spam detection and filtering
