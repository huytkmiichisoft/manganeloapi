import { NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigServer } from 'src/shared/services/config.service';
export declare class ValidationRequestServer implements NestMiddleware {
    private configService;
    constructor(configService: ConfigServer);
    private readonly TIME_EXPRIED;
    use(req: Request | any, res: Response, next: Function): Promise<any>;
}
