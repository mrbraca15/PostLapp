import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "nick_name"
    })
    nickName: string;

    @Column()
    password: string;

    @Column({
        name: "creation_date"
    })
    creationDate: Date;

}