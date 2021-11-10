import { Role } from "./role.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsString, MaxLength, MinLength } from "class-validator";

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column()
  role : Role
}
