import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Repository } from 'typeorm'
import { JwtPayload } from './jwt-payload.interface'
import { UnauthorizedException } from '@nestjs/common'

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'test_secret',
    })
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { id } = payload
    const user = await this.userRepository.findOne({ id })

    if (!user) throw new UnauthorizedException('Invalid credentials')

    return user
  }
}
