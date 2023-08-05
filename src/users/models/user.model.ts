import { ApiHideProperty, ApiProperty } from "@nestjs/swagger";
import { IsEmail } from "class-validator";
import { BaseModel } from "src/common/models/base.model";

export class User extends BaseModel {
  @ApiProperty({ description: "User email" })
  @IsEmail()
  email: string;

  @ApiProperty({ description: "User FIO" })
  fio: string

  @ApiProperty({ description: "User Avatar Link" })
  avatar_link: string;

  @ApiHideProperty()
  @ApiProperty({ description: "Password" })
  password: string;
}
