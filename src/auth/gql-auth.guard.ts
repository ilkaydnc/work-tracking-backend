import { GqlExecutionContext } from '@nestjs/graphql'
import { AuthGuard } from '@nestjs/passport'
import { Injectable, ExecutionContext } from '@nestjs/common'

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): GqlExecutionContext {
    const ctx = GqlExecutionContext.create(context)
    return ctx.getContext().req
  }
}
