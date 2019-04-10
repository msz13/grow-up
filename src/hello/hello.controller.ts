import { Controller, Get } from '@nestjs/common';

@Controller()
export class HelloController {
    
    @Get()
    sayHello () {
        return 'Api of Gu-Dash application 0.0.1'
    }
}
