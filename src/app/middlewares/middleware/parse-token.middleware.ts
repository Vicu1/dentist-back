import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import ConfigEnv from '@/config/config.env';

@Injectable()
export class ParseTokenMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = this.extractTokenFromHeader(req);
      const parsedToken = await this.jwtService.verify(token, {
        algorithms: ['RS256'],
        publicKey: ConfigEnv.JWT_PUBLIC,
      });

      req.user = {
        email: parsedToken.email,
      };
      next();
    } catch (e) {
      throw new UnauthorizedException('Неверный токен');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
