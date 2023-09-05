import {
  ClassSerializerInterceptor,
  Type,
  UseInterceptors,
  applyDecorators,
} from '@nestjs/common';
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDto } from 'common/dto/response.dto';

export const DefResponse = <TModel extends Type<any>>(model: TModel) => {
  console.log(getSchemaPath(model));
  return applyDecorators(
    ApiExtraModels(ResponseDto),
    ApiExtraModels(model),
    UseInterceptors(ClassSerializerInterceptor),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDto) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
            },
          },
        ],
      },
    }),
  );
};
