import { createParamDecorator, ExecutionContext, Injectable } from "@nestjs/common";
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from "@nestjs/passport";

Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }


@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req.user;
  },
);
