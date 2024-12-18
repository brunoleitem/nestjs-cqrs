import { type ExecutionContext, Injectable } from '@nestjs/common'
import { JwtService as NestJsJwtService } from '@nestjs/jwt'

@Injectable()
export class JwtService {
  constructor(private readonly nestJsJwtService: NestJsJwtService) {}
  async generateToken(userId) {
    const accessToken = this.nestJsJwtService.sign({ userId })

    return {
      accessToken
    }
  }

  async verify(ctx: ExecutionContext) {
    const request = ctx.switchToHttp().getRequest()
    const token = this.extractFromHeader(request)
    if (!token) return false
    const payload = await this.nestJsJwtService.verify(token)
    request.userId = payload.userId
    return true
  }

  private extractFromHeader(request: Request) {
    const authHeader = request.headers['authorization']
    if (!authHeader) {
      throw new Error('Authorization header not found')
    }
    return authHeader.split(' ')[1]
  }
}
