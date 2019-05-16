import { Controller, Get, Req, Res, Post, Body } from '@nestjs/common';
import {OAuth2Client} from 'google-auth-library'



@Controller()
export class HelloController {
    
    @Get()
    sayHello () {
        return 'Api of Gu-Dash application 0.0.1'
    }

    @Get('redirect')
    redirect(@Req() req, @Res() res) {
          res.redirect('http://localhost:4200/')
    }

    @Post('gettoken')
    async getToken(@Body('token') token) {
        console.log('route called')

        const client_id = '1043878714606-ddolr4qost64h72tjh9tg8ma98ub1eav.apps.googleusercontent.com'

        const client = new OAuth2Client(client_id)
        const ticket =  await client.verifyIdToken({
            idToken: token,
            audience: client_id
        })
        console.log(ticket.getPayload())


           
    }

    
}
