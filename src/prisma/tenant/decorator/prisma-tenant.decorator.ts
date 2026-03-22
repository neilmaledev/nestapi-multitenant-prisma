import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const PrismaTenant = createParamDecorator(
    (data: undefined, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();

        return request.prismaTenant;
    },
);