import {createParamDecorator} from '@nestjs/common'

export interface CreatedBy {
    createdBy: string
}


export const UserId = createParamDecorator(
    (data, [root, args, ctx, info]) => ctx.user.id,
  );

export const ArgsUserId = createParamDecorator(
    (data, [root, args, ctx, info]) => {
     const argsUserId  = args[data]
     argsUserId.createdBy = ctx.user.id
     return argsUserId
    } 
  );