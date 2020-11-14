import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        name: "user_name"
    })
    userName: string;

    @Column({
        name: "email"
    })
    email: string;

    @Column()
    password: string;

    @Column({
        name: "creation_date"
    })
    creationDate: Date;

}

