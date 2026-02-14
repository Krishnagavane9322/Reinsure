import nodemailer from 'nodemailer';

interface QuoteEmailData {
  name: string;
  email: string;
  phone: string;
  service?: string;
  insuranceType?: string;
  subType?: string;
  vehicleType?: string;
  coverageType?: string;
  planDuration?: string;
  numberOfMembers?: number;
  emiRequested: boolean;
  message?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter | null = null;

  constructor() {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM,
    } = process.env;

    // Only initialize if all required env vars are present
    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.warn('⚠️  Email service not configured. Set SMTP credentials in .env file.');
      return;
    }

    try {
      this.transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT),
        secure: parseInt(SMTP_PORT) === 465, // true for 465, false for other ports
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      });

      console.log('✅ Email service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
    }
  }

  async sendQuoteNotification(quoteData: QuoteEmailData): Promise<boolean> {
    if (!this.transporter) {
      console.warn('⚠️  Email service not available. Quote saved but email not sent.');
      return false;
    }

    const companyEmail = process.env.COMPANY_EMAIL;
    if (!companyEmail) {
      console.warn('⚠️  COMPANY_EMAIL not set in .env file.');
      return false;
    }

    try {
      const emailHtml = this.generateQuoteEmailHTML(quoteData);
      const emailText = this.generateQuoteEmailText(quoteData);

      await this.transporter.sendMail({
        from: process.env.SMTP_FROM || process.env.SMTP_USER,
        to: companyEmail,
        subject: `New Quote Request - ${quoteData.service || 'Insurance'} from ${quoteData.name}`,
        text: emailText,
        html: emailHtml,
      });

      console.log(`✅ Quote notification email sent to ${companyEmail}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to send quote notification email:', error);
      return false;
    }
  }

  private generateQuoteEmailHTML(data: QuoteEmailData): string {
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .section { margin-bottom: 25px; }
    .section-title { font-size: 16px; font-weight: bold; color: #667eea; margin-bottom: 10px; border-bottom: 2px solid #667eea; padding-bottom: 5px; }
    .info-row { display: flex; margin-bottom: 8px; }
    .info-label { font-weight: bold; min-width: 180px; color: #4b5563; }
    .info-value { color: #1f2937; }
    .highlight { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 15px 0; border-radius: 4px; }
    .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1 style="margin: 0; font-size: 24px;">🎯 New Quote Request</h1>
      <p style="margin: 10px 0 0 0; opacity: 0.9;">A customer has requested a quote</p>
    </div>
    
    <div class="content">
      <div class="section">
        <div class="section-title">👤 Customer Information</div>
        <div class="info-row">
          <span class="info-label">Name:</span>
          <span class="info-value">${data.name}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Email:</span>
          <span class="info-value"><a href="mailto:${data.email}">${data.email}</a></span>
        </div>
        <div class="info-row">
          <span class="info-label">Phone:</span>
          <span class="info-value"><a href="tel:${data.phone}">${data.phone}</a></span>
        </div>
      </div>

      <div class="section">
        <div class="section-title">📋 Service Details</div>
        <div class="info-row">
          <span class="info-label">Service:</span>
          <span class="info-value">${data.service || 'N/A'}</span>
        </div>
        <div class="info-row">
          <span class="info-label">Insurance Type:</span>
          <span class="info-value">${data.insuranceType || 'N/A'}</span>
        </div>
        ${data.subType ? `
        <div class="info-row">
          <span class="info-label">Sub Type:</span>
          <span class="info-value">${data.subType}</span>
        </div>
        ` : ''}
        ${data.coverageType ? `
        <div class="info-row">
          <span class="info-label">Coverage Type:</span>
          <span class="info-value">${data.coverageType}</span>
        </div>
        ` : ''}
        ${data.planDuration ? `
        <div class="info-row">
          <span class="info-label">Plan Duration:</span>
          <span class="info-value">${data.planDuration}</span>
        </div>
        ` : ''}
        ${data.numberOfMembers ? `
        <div class="info-row">
          <span class="info-label">Number of Members:</span>
          <span class="info-value">${data.numberOfMembers}</span>
        </div>
        ` : ''}
      </div>

      ${data.emiRequested ? `
      <div class="highlight">
        <strong>💳 EMI Requested:</strong> Customer wants EMI/installment options
      </div>
      ` : ''}

      ${data.message ? `
      <div class="section">
        <div class="section-title">💬 Additional Message</div>
        <p style="margin: 10px 0; padding: 15px; background: white; border-radius: 4px; border: 1px solid #e5e7eb;">${data.message}</p>
      </div>
      ` : ''}

      <div style="margin-top: 30px; padding: 20px; background: white; border-radius: 8px; border: 2px dashed #667eea; text-align: center;">
        <p style="margin: 0; color: #667eea; font-weight: bold;">⏰ Follow up with this customer as soon as possible!</p>
      </div>
    </div>

    <div class="footer">
      <p style="margin: 0;">This is an automated notification from your Reinsure website</p>
      <p style="margin: 5px 0 0 0;">Quote submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
    </div>
  </div>
</body>
</html>
    `;
  }

  private generateQuoteEmailText(data: QuoteEmailData): string {
    let text = `NEW QUOTE REQUEST\n\n`;
    text += `CUSTOMER INFORMATION\n`;
    text += `Name: ${data.name}\n`;
    text += `Email: ${data.email}\n`;
    text += `Phone: ${data.phone}\n\n`;
    
    text += `SERVICE DETAILS\n`;
    text += `Service: ${data.service || 'N/A'}\n`;
    text += `Insurance Type: ${data.insuranceType || 'N/A'}\n`;
    if (data.subType) text += `Sub Type: ${data.subType}\n`;
    if (data.coverageType) text += `Coverage Type: ${data.coverageType}\n`;
    if (data.planDuration) text += `Plan Duration: ${data.planDuration}\n`;
    if (data.numberOfMembers) text += `Number of Members: ${data.numberOfMembers}\n`;
    
    if (data.emiRequested) {
      text += `\nEMI REQUESTED: Yes - Customer wants EMI/installment options\n`;
    }
    
    if (data.message) {
      text += `\nADDITIONAL MESSAGE\n${data.message}\n`;
    }
    
    text += `\n---\n`;
    text += `Quote submitted on ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}\n`;
    
    return text;
  }
}

export default new EmailService();
