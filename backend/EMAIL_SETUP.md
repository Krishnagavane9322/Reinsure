# Email Configuration Guide

## Gmail Setup (Recommended)

1. **Get Your Gmail App Password:**
   - Go to your Google Account: https://myaccount.google.com/
   - Navigate to Security → 2-Step Verification (enable if not already)
   - Scroll down to "App passwords"
   - Select app: "Mail"
   - Select device: "Other" (enter "Reinsure Website")
   - Click "Generate"
   - Copy the 16-character password

2. **Update .env file:**

   ```
   COMPANY_EMAIL=your-business-email@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-16-char-app-password
   SMTP_FROM=Reinsure <your-email@gmail.com>
   ```

3. **Restart the backend server:**
   ```
   npm run dev
   ```

## Other Email Services

### Outlook/Hotmail

```
SMTP_HOST=smtp-mail.outlook.com
SMTP_PORT=587
SMTP_USER=your-email@outlook.com
SMTP_PASS=your-password
```

### Yahoo

```
SMTP_HOST=smtp.mail.yahoo.com
SMTP_PORT=587
SMTP_USER=your-email@yahoo.com
SMTP_PASS=your-app-password
```

### Custom SMTP

Contact your email provider for SMTP settings.

## Testing

After configuration:

1. Submit a test quote through the website
2. Check your company email inbox
3. Verify the email contains all quote details
