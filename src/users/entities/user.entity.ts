import { Exclude } from 'class-transformer';
import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Exclude()
  @Column()
  password: string;
  @BeforeInsert()
  async HashPassword() {
    this.password = await hash(this.password, 10);
  }
}
