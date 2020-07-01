import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common'
import { getMongoRepository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'

import { User } from './user.entity'
import { SignUpInput } from './sign-up.input'
import { SignInInput } from './sign-in.input'
import { JwtService } from '@nestjs/jwt'
import { UserType } from './user.type'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository = getMongoRepository(User),
    private jwtService: JwtService
  ) {}

  async signUp(signUpInput: SignUpInput): Promise<User> {
    const { name, email, password } = signUpInput
    const salt = await bcrypt.genSalt()

    const user = await this.userRepository.create({
      id: uuid(),
      name,
      email,
      salt,
      password: await this.hashPassword(password, salt),
    })
    try {
      await this.userRepository.save(user)
      return user
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async signIn(signInInput: SignInInput): Promise<UserType> {
    const { id, name, email } = await this.validatePassword(signInInput)
    const payload = { id, email }
    const token = await this.jwtService.sign(payload)

    return { id, name, email, token }
  }

  async validatePassword(signInInput: SignInInput): Promise<User> {
    const { email, password } = signInInput
    const user = await this.userRepository.findOne({ email })

    if (user && (await user.validatePassword(password))) {
      return user
    } else {
      throw new UnauthorizedException('Invalid credentials')
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt)
  }
}
