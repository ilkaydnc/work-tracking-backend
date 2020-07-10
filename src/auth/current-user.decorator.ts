import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context)
  const token = ctx.getContext().req.headers.authorization.split(' ')[1]
  return { ...ctx.getContext().req.user, token }
})
