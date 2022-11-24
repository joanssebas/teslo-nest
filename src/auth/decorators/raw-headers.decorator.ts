import {
  createParamDecorator,
  ExecutionContext,
  InternalServerErrorException,
} from '@nestjs/common';

export const RawHeader = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    //   console.log({ data });

    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders;
  },
);
