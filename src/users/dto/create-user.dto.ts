import { IsString } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsString()
  readonly email: string;

  @IsString()
  readonly password: string;
}
