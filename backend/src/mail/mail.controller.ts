import {Body, Controller, Post} from "@nestjs/common";
import {MailService} from "./mail.service";
import {SendEmailDto} from "./dto/send-email.dto";

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {
  }
  
  @Post()
  async sendMail(@Body() sendEmailDto: SendEmailDto) {
    try {
      await this.mailService.sendMail(
        process.env.MAIL_USER,
        'Contact Form',
        sendEmailDto
      )
      
      await this.mailService.sendMailConfirmation(sendEmailDto);
      
      return {
        message: 'Email sent successfully'
      }
      
    } catch (error) {
      console.error('Error sending email:', error.message, error.stack);
      throw new Error('Error sending email');
    }
  }
}