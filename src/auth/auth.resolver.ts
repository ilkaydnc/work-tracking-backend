import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UserType } from './user.type'
import { AuthService } from './auth.service'
import { SignUpInput } from './sign-up.input'
import { User } from './user.entity'
import { SignInInput } from './sign-in.input'

@Resolver(of => UserType)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(returns => UserType)
  async signUp(@Args('signUpInput') signUpInput: SignUpInput): Promise<User> {
    return this.authService.signUp(signUpInput)
  }

  @Mutation(returns => UserType)
  async signIn(@Args('signInInput') signInInput: SignInInput): Promise<UserType> {
    return this.authService.signIn(signInInput)
  }
}
